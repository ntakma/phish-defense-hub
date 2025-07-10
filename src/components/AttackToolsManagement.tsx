
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Mail, Phone, Globe, Bug, Eye, Settings, Shield } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const mockTools = [
  {
    id: 1,
    name: "Email Phishing Template Generator",
    type: "email",
    status: "active",
    description: "Tạo email phishing với template ngân hàng phổ biến",
    features: ["Anti-spam bypass", "HTML responsive", "Link tracking"],
    lastUsed: "2024-06-20",
    usageCount: 45
  },
  {
    id: 2,
    name: "Voice Call Bot VCB",
    type: "call",
    status: "active", 
    description: "Bot cuộc gọi tự động giả mạo ngân hàng VCB",
    features: ["Text-to-speech", "Number spoofing", "Call recording"],
    lastUsed: "2024-06-18",
    usageCount: 23
  },
  {
    id: 3,
    name: "Fake Banking Website",
    type: "website",
    status: "draft",
    description: "Website ngân hàng giả mạo để thu thập thông tin đăng nhập",
    features: ["SSL certificate", "Mobile responsive", "Data collection"],
    lastUsed: null,
    usageCount: 0
  },
  {
    id: 4,
    name: "USB Malware Dropper",
    type: "malware",
    status: "inactive",
    description: "Mã độc tự động chạy khi cắm USB vào máy tính",
    features: ["Auto-run", "Stealth mode", "Data exfiltration"],
    lastUsed: "2024-06-10",
    usageCount: 8
  }
];

export function AttackToolsManagement() {
  const [tools, setTools] = useState(mockTools);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    configuration: "",
    features: []
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case "email": return <Mail className="h-4 w-4" />;
      case "call": return <Phone className="h-4 w-4" />;
      case "website": return <Globe className="h-4 w-4" />;
      case "malware": return <Bug className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "email": return "bg-blue-600";
      case "call": return "bg-green-600";
      case "website": return "bg-purple-600";
      case "malware": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "draft": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "inactive": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const handleCreateTool = () => {
    if (!formData.name || !formData.type) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive"
      });
      return;
    }

    const newTool = {
      id: tools.length + 1,
      name: formData.name,
      type: formData.type,
      description: formData.description,
      status: "draft",
      features: formData.features,
      lastUsed: null,
      usageCount: 0
    };

    setTools([...tools, newTool]);
    setIsCreateDialogOpen(false);
    setFormData({
      name: "",
      type: "",
      description: "",
      configuration: "",
      features: []
    });

    toast({
      title: "Thành công",
      description: "Công cụ tấn công mới đã được tạo thành công"
    });
  };

  const handleDeleteTool = (id) => {
    setTools(tools.filter(t => t.id !== id));
    toast({
      title: "Đã xóa",
      description: "Công cụ tấn công đã được xóa thành công"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý công cụ tấn công</h1>
          <p className="text-muted-foreground mt-2">Tạo và quản lý các công cụ tấn công cho chiến dịch phishing</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Tạo công cụ mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tạo công cụ tấn công mới</DialogTitle>
              <DialogDescription>
                Tạo công cụ tấn công để sử dụng trong các chiến dịch phishing
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Tên công cụ *</Label>
                  <Input 
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="VD: Email Phishing Generator"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Loại công cụ *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại công cụ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email Tool</SelectItem>
                      <SelectItem value="call">Call Bot</SelectItem>
                      <SelectItem value="website">Website giả mạo</SelectItem>
                      <SelectItem value="malware">Malware</SelectItem>
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
                  placeholder="Mô tả chi tiết về công cụ và chức năng"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="configuration">Cấu hình</Label>
                <Textarea 
                  id="configuration"
                  value={formData.configuration}
                  onChange={(e) => setFormData({...formData, configuration: e.target.value})}
                  placeholder="Cấu hình JSON hoặc script cho công cụ"
                  rows={4}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={handleCreateTool} className="bg-red-600 hover:bg-red-700">
                  Tạo công cụ
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Card key={tool.id} className="hover:shadow-lg transition-shadow border-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(tool.type)} text-white`}>
                    {getTypeIcon(tool.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <Badge className={`mt-1 ${getStatusColor(tool.status)}`}>
                      {tool.status === 'active' ? 'Hoạt động' : 
                       tool.status === 'draft' ? 'Bản nháp' : 'Không hoạt động'}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteTool(tool.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {tool.description}
              </CardDescription>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">Tính năng:</p>
                  <div className="flex flex-wrap gap-1">
                    {tool.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                  <div className="flex justify-between">
                    <span>Sử dụng: {tool.usageCount} lần</span>
                    <span>Cập nhật: {tool.lastUsed || 'Chưa sử dụng'}</span>
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
