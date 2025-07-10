
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Play, Pause, Stop, Eye, Calendar, Users, Mail, MessageSquare, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const mockCampaigns = [
  {
    id: 1,
    name: "Chiến dịch Phishing Email Q2",
    scenario: "Phishing Ngân hàng VCB giả mạo",
    type: "email",
    status: "running",
    progress: 65,
    targets: 150,
    sent: 150,
    opened: 98,
    clicked: 45,
    compromised: 23,
    startDate: "2024-06-15",
    endDate: "2024-06-30"
  },
  {
    id: 2,
    name: "SMS Lừa đảo trúng thưởng",
    scenario: "SMS lừa đảo trúng thưởng",
    type: "sms",
    status: "completed",
    progress: 100,
    targets: 200,
    sent: 200,
    opened: 180,
    clicked: 67,
    compromised: 34,
    startDate: "2024-06-01",
    endDate: "2024-06-10"
  },
  {
    id: 3,
    name: "Call Bot Test",
    scenario: "Call bot hỗ trợ khách hàng giả",
    type: "call",
    status: "scheduled",
    progress: 0,
    targets: 100,
    sent: 0,
    opened: 0,
    clicked: 0,
    compromised: 0,
    startDate: "2024-07-01",
    endDate: "2024-07-15"
  }
];

export function CampaignExecution() {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    scenario: "",
    targets: "",
    startDate: "",
    endDate: ""
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "running": return "bg-blue-500";
      case "completed": return "bg-green-500";
      case "scheduled": return "bg-yellow-500";
      case "paused": return "bg-orange-500";
      case "stopped": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "running": return "Đang chạy";
      case "completed": return "Hoàn thành";
      case "scheduled": return "Đã lên lịch";
      case "paused": return "Tạm dừng";
      case "stopped": return "Đã dừng";
      default: return "Không xác định";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "email": return <Mail className="h-4 w-4" />;
      case "sms": return <MessageSquare className="h-4 w-4" />;
      case "call": return <Phone className="h-4 w-4" />;
      default: return null;
    }
  };

  const handleCreateCampaign = () => {
    if (!formData.name || !formData.scenario) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive"
      });
      return;
    }

    const newCampaign = {
      id: campaigns.length + 1,
      name: formData.name,
      scenario: formData.scenario,
      type: "email",
      status: "scheduled",
      progress: 0,
      targets: parseInt(formData.targets) || 0,
      sent: 0,
      opened: 0,
      clicked: 0,
      compromised: 0,
      startDate: formData.startDate,
      endDate: formData.endDate
    };

    setCampaigns([...campaigns, newCampaign]);
    setIsCreateDialogOpen(false);
    setFormData({
      name: "",
      scenario: "",
      targets: "",
      startDate: "",
      endDate: ""
    });

    toast({
      title: "Thành công",
      description: "Chiến dịch mới đã được tạo thành công"
    });
  };

  const handleCampaignAction = (id, action) => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === id) {
        switch (action) {
          case "start":
            return { ...campaign, status: "running" };
          case "pause":
            return { ...campaign, status: "paused" };
          case "stop":
            return { ...campaign, status: "stopped" };
          default:
            return campaign;
        }
      }
      return campaign;
    }));

    const actionLabel = {
      start: "bắt đầu",
      pause: "tạm dừng",
      stop: "dừng"
    };

    toast({
      title: "Thành công",
      description: `Chiến dịch đã được ${actionLabel[action]}`
    });
  };

  const calculateSuccessRate = (campaign) => {
    if (campaign.sent === 0) return 0;
    return Math.round((campaign.compromised / campaign.sent) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Thực hiện chiến dịch</h1>
          <p className="text-gray-600 mt-2">Khởi chạy và theo dõi các chiến dịch phishing giả lập</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Tạo chiến dịch mới
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Tạo chiến dịch mới</DialogTitle>
              <DialogDescription>
                Thiết lập chiến dịch phishing giả lập mới
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Tên chiến dịch *</Label>
                <Input 
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="VD: Chiến dịch Email Phishing T7"
                />
              </div>
              
              <div>
                <Label htmlFor="scenario">Kịch bản *</Label>
                <Select value={formData.scenario} onValueChange={(value) => setFormData({...formData, scenario: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn kịch bản phishing" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Phishing Ngân hàng VCB giả mạo">Phishing Ngân hàng VCB giả mạo</SelectItem>
                    <SelectItem value="SMS lừa đảo trúng thưởng">SMS lừa đảo trúng thưởng</SelectItem>
                    <SelectItem value="Call bot hỗ trợ khách hàng giả">Call bot hỗ trợ khách hàng giả</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="targets">Số lượng đối tượng</Label>
                <Input 
                  id="targets"
                  type="number"
                  value={formData.targets}
                  onChange={(e) => setFormData({...formData, targets: e.target.value})}
                  placeholder="VD: 100"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Ngày bắt đầu</Label>
                  <Input 
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">Ngày kết thúc</Label>
                  <Input 
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={handleCreateCampaign} className="bg-blue-600 hover:bg-blue-700">
                  Tạo chiến dịch
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Play className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Đang chạy</p>
                <p className="text-2xl font-bold text-blue-600">
                  {campaigns.filter(c => c.status === 'running').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Đã lên lịch</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {campaigns.filter(c => c.status === 'scheduled').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hoàn thành</p>
                <p className="text-2xl font-bold text-green-600">
                  {campaigns.filter(c => c.status === 'completed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tổng mục tiêu</p>
                <p className="text-2xl font-bold text-purple-600">
                  {campaigns.reduce((sum, c) => sum + c.targets, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {getTypeIcon(campaign.type)}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{campaign.name}</CardTitle>
                    <CardDescription className="mt-1">
                      Kịch bản: {campaign.scenario}
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={`${getStatusColor(campaign.status)} text-white`}>
                    {getStatusLabel(campaign.status)}
                  </Badge>
                  
                  <div className="flex space-x-1">
                    {campaign.status === 'scheduled' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleCampaignAction(campaign.id, 'start')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    
                    {campaign.status === 'running' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleCampaignAction(campaign.id, 'pause')}
                        >
                          <Pause className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleCampaignAction(campaign.id, 'stop')}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Stop className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tiến độ chiến dịch</span>
                      <span className="text-sm font-medium">{campaign.progress}%</span>
                    </div>
                    <Progress value={campaign.progress} className="h-2" />
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Thời gian:</span>
                      <span>{campaign.startDate} - {campaign.endDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tỷ lệ thành công:</span>
                      <span className="font-medium text-red-600">{calculateSuccessRate(campaign)}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{campaign.targets}</p>
                    <p className="text-xs text-gray-600">Đối tượng</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{campaign.sent}</p>
                    <p className="text-xs text-gray-600">Đã gửi</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{campaign.opened}</p>
                    <p className="text-xs text-gray-600">Đã mở</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">{campaign.compromised}</p>
                    <p className="text-xs text-gray-600">Bị khai thác</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
