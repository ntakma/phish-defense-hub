
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Mail, MessageSquare, Phone, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const mockScenarios = [
  {
    id: 1,
    name: "Phishing Ngân hàng VCB giả mạo",
    description: "Mô phỏng email lừa đảo giả mạo ngân hàng VCB yêu cầu cập nhật thông tin tài khoản",
    type: "email",
    status: "active",
    targets: ["username", "password", "otp"],
    created: "2024-06-15",
    lastUsed: "2024-06-20"
  },
  {
    id: 2,
    name: "SMS lừa đảo trúng thưởng",
    description: "Tin nhắn SMS thông báo trúng thưởng và yêu cầu cung cấp thông tin ngân hàng",
    type: "sms",
    status: "active",
    targets: ["phone", "card_number", "cvv"],
    created: "2024-06-10",
    lastUsed: "2024-06-18"
  },
  {
    id: 3,
    name: "Call bot hỗ trợ khách hàng giả",
    description: "Cuộc gọi tự động giả mạo bộ phận hỗ trợ ngân hàng yêu cầu xác thực OTP",
    type: "call",
    status: "draft",
    targets: ["otp", "username", "birth_date"],
    created: "2024-06-12",
    lastUsed: null
  }
];

export function ScenarioManagement() {
  const [scenarios, setScenarios] = useState(mockScenarios);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    emailContent: "",
    emailSubject: "",
    smsContent: "",
    callScript: "",
    targets: []
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case "email": return <Mail className="h-4 w-4" />;
      case "sms": return <MessageSquare className="h-4 w-4" />;
      case "call": return <Phone className="h-4 w-4" />;
      default: return null;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "email": return "bg-blue-500";
      case "sms": return "bg-green-500";
      case "call": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const handleCreateScenario = () => {
    if (!formData.name || !formData.type) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive"
      });
      return;
    }

    const newScenario = {
      id: scenarios.length + 1,
      name: formData.name,
      description: formData.description,
      type: formData.type,
      status: "draft",
      targets: formData.targets,
      created: new Date().toISOString().split('T')[0],
      lastUsed: null
    };

    setScenarios([...scenarios, newScenario]);
    setIsCreateDialogOpen(false);
    setFormData({
      name: "",
      description: "",
      type: "",
      emailContent: "",
      emailSubject: "",
      smsContent: "",
      callScript: "",
      targets: []
    });

    toast({
      title: "Thành công",
      description: "Kịch bản mới đã được tạo thành công"
    });
  };

  const handleDeleteScenario = (id) => {
    setScenarios(scenarios.filter(s => s.id !== id));
    toast({
      title: "Đã xóa",
      description: "Kịch bản đã được xóa thành công"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý kịch bản Phishing</h1>
          <p className="text-gray-600 mt-2">Tạo và quản lý các kịch bản tấn công giả lập</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Tạo kịch bản mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle>Tạo kịch bản Phishing mới</DialogTitle>
              <DialogDescription>
                Tạo kịch bản mô phỏng tấn công để giáo dục người dùng
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Tên kịch bản *</Label>
                  <Input 
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="VD: Phishing ngân hàng ABC"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Loại tấn công *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại tấn công" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="email">Email Phishing</SelectItem>
                      <SelectItem value="sms">SMS Smishing</SelectItem>
                      <SelectItem value="call">Call Bot Vishing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Mô tả</Label>
                <Textarea 
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Mô tả chi tiết về kịch bản và mục đích"
                  rows={3}
                />
              </div>

              {formData.type === "email" && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="emailSubject">Tiêu đề Email</Label>
                    <Input 
                      id="emailSubject"
                      value={formData.emailSubject}
                      onChange={(e) => setFormData({...formData, emailSubject: e.target.value})}
                      placeholder="VD: [Ngân hàng ABC] Cần xác thực tài khoản ngay"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emailContent">Nội dung Email</Label>
                    <Textarea 
                      id="emailContent"
                      value={formData.emailContent}
                      onChange={(e) => setFormData({...formData, emailContent: e.target.value})}
                      placeholder="Nội dung email phishing..."
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {formData.type === "sms" && (
                <div>
                  <Label htmlFor="smsContent">Nội dung SMS</Label>
                  <Textarea 
                    id="smsContent"
                    value={formData.smsContent}
                    onChange={(e) => setFormData({...formData, smsContent: e.target.value})}
                    placeholder="VD: Chúc mừng! Bạn đã trúng 100 triệu đồng. Nhấn link để nhận: http://fake-link.com"
                    rows={3}
                  />
                </div>
              )}

              {formData.type === "call" && (
                <div>
                  <Label htmlFor="callScript">Kịch bản cuộc gọi</Label>
                  <Textarea 
                    id="callScript"
                    value={formData.callScript}
                    onChange={(e) => setFormData({...formData, callScript: e.target.value})}
                    placeholder="Kịch bản thoại cho call bot..."
                    rows={4}
                  />
                </div>
              )}
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={handleCreateScenario} className="bg-blue-600 hover:bg-blue-700">
                  Tạo kịch bản
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios.map((scenario) => (
          <Card key={scenario.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${getTypeColor(scenario.type)} text-white`}>
                    {getTypeIcon(scenario.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{scenario.name}</CardTitle>
                    <Badge variant={scenario.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                      {scenario.status === 'active' ? 'Đang hoạt động' : 'Bản nháp'}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteScenario(scenario.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {scenario.description}
              </CardDescription>
              
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">Mục tiêu thu thập:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {scenario.targets.map((target, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {target === 'username' ? 'Tên đăng nhập' :
                         target === 'password' ? 'Mật khẩu' :
                         target === 'otp' ? 'Mã OTP' :
                         target === 'phone' ? 'Số điện thoại' :
                         target === 'card_number' ? 'Số thẻ' :
                         target === 'cvv' ? 'Mã CVV' :
                         target === 'birth_date' ? 'Ngày sinh' : target}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 pt-2 border-t">
                  <p>Tạo: {scenario.created}</p>
                  <p>Sử dụng lần cuối: {scenario.lastUsed || 'Chưa sử dụng'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
