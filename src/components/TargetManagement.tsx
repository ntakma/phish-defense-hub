
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Upload, Download, Search, Filter, Edit, Trash2, Users } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const mockTargets = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "nguyen.van.an@email.com",
    phone: "0901234567",
    department: "Kế toán",
    riskLevel: "low",
    lastCampaign: "2024-06-20",
    interactions: 3,
    compromised: 0
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    email: "tran.thi.binh@email.com",
    phone: "0912345678",
    department: "Nhân sự",
    riskLevel: "high",
    lastCampaign: "2024-06-18",
    interactions: 8,
    compromised: 3
  },
  {
    id: 3,
    name: "Lê Minh Cường",
    email: "le.minh.cuong@email.com",
    phone: "0923456789",
    department: "Công nghệ",
    riskLevel: "medium",
    lastCampaign: "2024-06-15",
    interactions: 5,
    compromised: 1
  },
  {
    id: 4,
    name: "Phạm Thu Dung",
    email: "pham.thu.dung@email.com",
    phone: "0934567890",
    department: "Kinh doanh",
    riskLevel: "low",
    lastCampaign: "2024-06-22",
    interactions: 2,
    compromised: 0
  }
];

export function TargetManagement() {
  const [targets, setTargets] = useState(mockTargets);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRisk, setFilterRisk] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: ""
  });

  const getRiskColor = (risk) => {
    switch (risk) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getRiskLabel = (risk) => {
    switch (risk) {
      case "high": return "Cao";
      case "medium": return "Trung bình";
      case "low": return "Thấp";
      default: return "Không xác định";
    }
  };

  const filteredTargets = targets.filter(target => {
    const matchesSearch = target.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         target.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         target.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === "all" || target.riskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  const handleCreateTarget = () => {
    if (!formData.name || !formData.email) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive"
      });
      return;
    }

    const newTarget = {
      id: targets.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      riskLevel: "low",
      lastCampaign: null,
      interactions: 0,
      compromised: 0
    };

    setTargets([...targets, newTarget]);
    setIsCreateDialogOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: ""
    });

    toast({
      title: "Thành công",
      description: "Đối tượng mới đã được thêm thành công"
    });
  };

  const handleDeleteTarget = (id) => {
    setTargets(targets.filter(t => t.id !== id));
    toast({
      title: "Đã xóa",
      description: "Đối tượng đã được xóa thành công"
    });
  };

  const handleBulkImport = () => {
    toast({
      title: "Tính năng đang phát triển",
      description: "Tính năng nhập hàng loạt từ CSV/Excel sẽ sớm được cập nhật"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý đối tượng mục tiêu</h1>
          <p className="text-gray-600 mt-2">Quản lý danh sách người dùng tham gia chiến dịch</p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleBulkImport}>
            <Upload className="h-4 w-4 mr-2" />
            Nhập từ file
          </Button>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Thêm đối tượng
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Thêm đối tượng mục tiêu mới</DialogTitle>
                <DialogDescription>
                  Thêm người dùng mới vào danh sách tham gia chiến dịch
                </DialogDescription>
              </DialogHeader>
            
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Họ và tên *</Label>
                    <Input 
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="VD: Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Phòng ban</Label>
                    <Input 
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      placeholder="VD: Kế toán"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="example@company.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input 
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="0901234567"
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleCreateTarget} className="bg-blue-600 hover:bg-blue-700">
                    Thêm đối tượng
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tổng số người</p>
                <p className="text-2xl font-bold text-gray-900">{targets.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">!</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rủi ro cao</p>
                <p className="text-2xl font-bold text-red-600">
                  {targets.filter(t => t.riskLevel === 'high').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">~</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rủi ro trung bình</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {targets.filter(t => t.riskLevel === 'medium').length}
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
                <p className="text-sm font-medium text-gray-600">Rủi ro thấp</p>
                <p className="text-2xl font-bold text-green-600">
                  {targets.filter(t => t.riskLevel === 'low').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách đối tượng</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm theo tên, email, phòng ban..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Select value={filterRisk} onValueChange={setFilterRisk}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Lọc theo rủi ro" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="high">Rủi ro cao</SelectItem>
                  <SelectItem value="medium">Rủi ro trung bình</SelectItem>
                  <SelectItem value="low">Rủi ro thấp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Họ tên</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Phòng ban</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Mức độ rủi ro</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Tương tác</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Bị khai thác</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredTargets.map((target) => (
                  <tr key={target.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{target.name}</p>
                        <p className="text-sm text-gray-500">{target.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{target.email}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{target.department}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getRiskColor(target.riskLevel)} text-white`}>
                        {getRiskLabel(target.riskLevel)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{target.interactions}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{target.compromised}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteTarget(target.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
