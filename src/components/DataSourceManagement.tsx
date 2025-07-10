
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Upload, 
  Database, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Globe, 
  Shield, 
  Users, 
  FileText,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const mockDataSources = [
  {
    id: 1,
    name: "VirusTotal API",
    type: "threat-intelligence",
    status: "active",
    description: "Thu thập thông tin về domain và IP độc hại",
    apiKey: "vt_***************",
    lastSync: "2024-07-10 09:30:00",
    recordsCollected: 1250,
    config: {
      endpoint: "https://www.virustotal.com/vtapi/v2/",
      rateLimit: 1000
    }
  },
  {
    id: 2,
    name: "Facebook Graph API",
    type: "social-media",
    status: "active",
    description: "Thu thập thông tin profile từ Facebook",
    apiKey: "fb_***************",
    lastSync: "2024-07-10 08:15:00",
    recordsCollected: 850,
    config: {
      endpoint: "https://graph.facebook.com/",
      permissions: ["public_profile", "email"]
    }
  },
  {
    id: 3,
    name: "LinkedIn API",
    type: "social-media", 
    status: "inactive",
    description: "Thu thập thông tin nghề nghiệp từ LinkedIn",
    apiKey: "li_***************",
    lastSync: "2024-07-09 16:45:00",
    recordsCollected: 420,
    config: {
      endpoint: "https://api.linkedin.com/v2/",
      scope: ["r_liteprofile", "r_emailaddress"]
    }
  },
  {
    id: 4,
    name: "Shodan API",
    type: "threat-intelligence",
    status: "active",
    description: "Quét thông tin thiết bị và dịch vụ mạng",
    apiKey: "sh_***************",
    lastSync: "2024-07-10 10:00:00",
    recordsCollected: 320,
    config: {
      endpoint: "https://api.shodan.io/",
      credits: 95
    }
  },
  {
    id: 5,
    name: "Nhân viên IT 2024",
    type: "file-import",
    status: "completed",
    description: "Danh sách nhân viên từ file Excel",
    apiKey: "N/A",
    lastSync: "2024-07-08 14:20:00",
    recordsCollected: 180,
    config: {
      fileName: "nhanvien_it_2024.xlsx",
      columns: ["name", "email", "department", "phone"]
    }
  }
];

export function DataSourceManagement() {
  const [dataSources, setDataSources] = useState(mockDataSources);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    apiKey: "",
    endpoint: "",
    config: ""
  });

  const getTypeColor = (type) => {
    switch (type) {
      case "threat-intelligence": return "bg-red-100 text-red-800";
      case "social-media": return "bg-blue-100 text-blue-800";
      case "file-import": return "bg-green-100 text-green-800";
      case "custom-api": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "threat-intelligence": return "Threat Intelligence";
      case "social-media": return "Mạng xã hội";
      case "file-import": return "Nhập file";
      case "custom-api": return "API tùy chỉnh";
      default: return "Khác";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "text-green-600";
      case "inactive": return "text-gray-600";
      case "error": return "text-red-600";
      case "completed": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4" />;
      case "inactive": return <Clock className="h-4 w-4" />;
      case "error": return <AlertTriangle className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredDataSources = dataSources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || source.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleCreateDataSource = () => {
    if (!formData.name || !formData.type) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive"
      });
      return;
    }

    const newDataSource = {
      id: dataSources.length + 1,
      name: formData.name,
      type: formData.type,
      status: "inactive",
      description: formData.description,
      apiKey: formData.apiKey,
      lastSync: null,
      recordsCollected: 0,
      config: formData.config ? JSON.parse(formData.config) : {}
    };

    setDataSources([...dataSources, newDataSource]);
    setIsCreateDialogOpen(false);
    setFormData({
      name: "",
      type: "",
      description: "",
      apiKey: "",
      endpoint: "",
      config: ""
    });

    toast({
      title: "Thành công",
      description: "Nguồn dữ liệu mới đã được thêm thành công"
    });
  };

  const handleDeleteDataSource = (id) => {
    setDataSources(dataSources.filter(s => s.id !== id));
    toast({
      title: "Đã xóa",
      description: "Nguồn dữ liệu đã được xóa thành công"
    });
  };

  const handleSyncDataSource = (id) => {
    setDataSources(dataSources.map(source => 
      source.id === id 
        ? { ...source, status: "active", lastSync: new Date().toLocaleString('vi-VN') }
        : source
    ));
    toast({
      title: "Đồng bộ thành công",
      description: "Nguồn dữ liệu đã được đồng bộ"
    });
  };

  const totalRecords = dataSources.reduce((sum, source) => sum + source.recordsCollected, 0);
  const activeSourcesCount = dataSources.filter(s => s.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý nguồn dữ liệu</h1>
          <p className="text-gray-600 mt-2">Thu thập và quản lý dữ liệu từ các nguồn khác nhau</p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Nhập từ file
          </Button>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Thêm nguồn dữ liệu
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Thêm nguồn dữ liệu mới</DialogTitle>
                <DialogDescription>
                  Cấu hình nguồn dữ liệu để thu thập thông tin mục tiêu
                </DialogDescription>
              </DialogHeader>
            
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Tên nguồn dữ liệu *</Label>
                    <Input 
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="VD: VirusTotal API"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Loại nguồn *</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại nguồn" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="threat-intelligence">Threat Intelligence</SelectItem>
                        <SelectItem value="social-media">Mạng xã hội</SelectItem>
                        <SelectItem value="file-import">Nhập file</SelectItem>
                        <SelectItem value="custom-api">API tùy chỉnh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Mô tả</Label>
                  <Input 
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Mô tả nguồn dữ liệu này"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input 
                      id="apiKey"
                      type="password"
                      value={formData.apiKey}
                      onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
                      placeholder="API Key hoặc Token"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endpoint">Endpoint</Label>
                    <Input 
                      id="endpoint"
                      value={formData.endpoint}
                      onChange={(e) => setFormData({...formData, endpoint: e.target.value})}
                      placeholder="https://api.example.com/"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="config">Cấu hình JSON (tùy chọn)</Label>
                  <Textarea 
                    id="config"
                    value={formData.config}
                    onChange={(e) => setFormData({...formData, config: e.target.value})}
                    placeholder='{"rateLimit": 1000, "timeout": 30}'
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleCreateDataSource} className="bg-blue-600 hover:bg-blue-700">
                    Thêm nguồn dữ liệu
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
              <Database className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tổng nguồn dữ liệu</p>
                <p className="text-2xl font-bold text-gray-900">{dataSources.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Đang hoạt động</p>
                <p className="text-2xl font-bold text-green-600">{activeSourcesCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tổng bản ghi</p>
                <p className="text-2xl font-bold text-purple-600">{totalRecords.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Threat Intel</p>
                <p className="text-2xl font-bold text-orange-600">
                  {dataSources.filter(s => s.type === 'threat-intelligence').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Danh sách nguồn dữ liệu</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm nguồn dữ liệu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Lọc theo loại" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="threat-intelligence">Threat Intelligence</SelectItem>
                  <SelectItem value="social-media">Mạng xã hội</SelectItem>
                  <SelectItem value="file-import">Nhập file</SelectItem>
                  <SelectItem value="custom-api">API tùy chỉnh</SelectItem>
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
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Tên nguồn</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Loại</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Trạng thái</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Đồng bộ cuối</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Bản ghi</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredDataSources.map((source) => (
                  <tr key={source.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{source.name}</p>
                        <p className="text-sm text-gray-500">{source.description}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getTypeColor(source.type)}>
                        {getTypeLabel(source.type)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className={`flex items-center ${getStatusColor(source.status)}`}>
                        {getStatusIcon(source.status)}
                        <span className="ml-2 capitalize">{source.status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {source.lastSync ? source.lastSync : "Chưa đồng bộ"}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {source.recordsCollected.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleSyncDataSource(source.id)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Activity className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteDataSource(source.id)}
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
