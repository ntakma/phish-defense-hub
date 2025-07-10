
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, TrendingUp, TrendingDown, AlertTriangle, Shield, Users, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { toast } from "@/hooks/use-toast";

const monthlyData = [
  { month: "T1", campaigns: 4, targets: 420, compromised: 156, success: 37 },
  { month: "T2", campaigns: 6, targets: 580, compromised: 198, success: 34 },
  { month: "T3", campaigns: 8, targets: 720, compromised: 165, success: 23 },
  { month: "T4", campaigns: 5, targets: 450, compromised: 189, success: 42 },
  { month: "T5", campaigns: 7, targets: 690, compromised: 145, success: 21 },
  { month: "T6", campaigns: 9, targets: 820, compromised: 267, success: 33 }
];

const departmentData = [
  { department: "Kế toán", total: 45, compromised: 18, rate: 40 },
  { department: "Nhân sự", total: 32, compromised: 8, rate: 25 },
  { department: "Kinh doanh", total: 67, compromised: 23, rate: 34 },
  { department: "Công nghệ", total: 28, compromised: 4, rate: 14 },
  { department: "Vận hành", total: 39, compromised: 15, rate: 38 }
];

const attackTypeData = [
  { type: "Email Phishing", campaigns: 24, success: 156, color: "#3B82F6" },
  { type: "SMS Smishing", campaigns: 18, success: 89, color: "#10B981" },
  { type: "Call Bot", campaigns: 12, success: 67, color: "#8B5CF6" },
  { type: "Kết hợp", campaigns: 8, success: 45, color: "#F59E0B" }
];

const riskDistribution = [
  { name: "Rủi ro cao", value: 23, color: "#EF4444" },
  { name: "Rủi ro trung bình", value: 35, color: "#F59E0B" },
  { name: "Rủi ro thấp", value: 42, color: "#10B981" }
];

const topVulnerableUsers = [
  { name: "Nguyễn Văn A", department: "Kế toán", compromised: 8, lastIncident: "2024-06-22" },
  { name: "Trần Thị B", department: "Nhân sự", compromised: 7, lastIncident: "2024-06-20" },
  { name: "Lê Minh C", department: "Kinh doanh", compromised: 6, lastIncident: "2024-06-19" },
  { name: "Phạm Thu D", department: "Vận hành", compromised: 5, lastIncident: "2024-06-18" },
  { name: "Hoàng Văn E", department: "Kế toán", compromised: 5, lastIncident: "2024-06-17" }
];

export function ReportsAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [selectedMetric, setSelectedMetric] = useState("success_rate");

  const handleExportReport = (format) => {
    toast({
      title: "Đang xuất báo cáo",
      description: `Báo cáo định dạng ${format.toUpperCase()} sẽ được tải xuống trong giây lát`
    });
  };

  const calculateTotalTargets = () => {
    return monthlyData.reduce((sum, month) => sum + month.targets, 0);
  };

  const calculateTotalCompromised = () => {
    return monthlyData.reduce((sum, month) => sum + month.compromised, 0);
  };

  const calculateAverageSuccessRate = () => {
    const avg = monthlyData.reduce((sum, month) => sum + month.success, 0) / monthlyData.length;
    return Math.round(avg);
  };

  const calculateTrend = () => {
    const recent = monthlyData.slice(-3);
    const earlier = monthlyData.slice(-6, -3);
    const recentAvg = recent.reduce((sum, month) => sum + month.success, 0) / recent.length;
    const earlierAvg = earlier.reduce((sum, month) => sum + month.success, 0) / earlier.length;
    return recentAvg < earlierAvg ? "improving" : "declining";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Báo cáo & Phân tích</h1>
          <p className="text-gray-600 mt-2">Phân tích hiệu quả chiến dịch và đánh giá mức độ rủi ro</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="1month">1 tháng</SelectItem>
              <SelectItem value="3months">3 tháng</SelectItem>
              <SelectItem value="6months">6 tháng</SelectItem>
              <SelectItem value="1year">1 năm</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={() => handleExportReport('pdf')}>
            <Download className="h-4 w-4 mr-2" />
            Xuất PDF
          </Button>
          
          <Button variant="outline" onClick={() => handleExportReport('excel')}>
            <Download className="h-4 w-4 mr-2" />
            Xuất Excel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng mục tiêu</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateTotalTargets().toLocaleString()}</div>
            <p className="text-xs opacity-80">6 tháng qua</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bị khai thác</CardTitle>
            <AlertTriangle className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateTotalCompromised().toLocaleString()}</div>
            <p className="text-xs opacity-80">
              {Math.round((calculateTotalCompromised() / calculateTotalTargets()) * 100)}% tỷ lệ khai thác
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ thành công TB</CardTitle>
            <Target className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateAverageSuccessRate()}%</div>
            <div className="flex items-center text-xs opacity-80">
              {calculateTrend() === "improving" ? (
                <>
                  <TrendingDown className="h-3 w-3 mr-1" />
                  Đang cải thiện
                </>
              ) : (
                <>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Cần cải thiện
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Độ bảo mật</CardTitle>
            <Shield className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{100 - calculateAverageSuccessRate()}%</div>
            <p className="text-xs opacity-80">Mức độ cảnh giác trung bình</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Xu hướng tỷ lệ thành công theo thời gian</CardTitle>
            <CardDescription>Phần trăm người dùng bị khai thác qua các tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="success" 
                  stroke="#EF4444" 
                  fill="#EF4444" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phân bố mức độ rủi ro</CardTitle>
            <CardDescription>Phân loại người dùng theo khả năng bị khai thác</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hiệu quả theo phòng ban</CardTitle>
            <CardDescription>Tỷ lệ bị khai thác theo từng phòng ban</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rate" fill="#8884d8" name="Tỷ lệ bị khai thác (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hiệu quả theo loại tấn công</CardTitle>
            <CardDescription>So sánh số lượng thành công theo phương thức</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attackTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="success" fill="#82ca9d" name="Số lượng thành công" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top người dùng dễ bị khai thác</CardTitle>
            <CardDescription>Danh sách những người cần tăng cường đào tạo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topVulnerableUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.department}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-red-500 text-white">
                      {user.compromised} lần
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{user.lastIncident}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Khuyến nghị cải thiện</CardTitle>
            <CardDescription>Những điểm cần chú ý để nâng cao hiệu quả</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-medium text-yellow-800 mb-2">Phòng ban Kế toán</h4>
                <p className="text-sm text-yellow-700">
                  Tỷ lệ bị khai thác cao (40%). Cần tăng cường đào tạo về nhận diện email lừa đảo.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-medium text-blue-800 mb-2">Kịch bản Call Bot</h4>
                <p className="text-sm text-blue-700">
                  Hiệu quả cao nhất. Nên tăng tần suất sử dụng loại kịch bản này.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h4 className="font-medium text-green-800 mb-2">Xu hướng tích cực</h4>
                <p className="text-sm text-green-700">
                  Tỷ lệ bị khai thác giảm 8% so với tháng trước. Tiếp tục duy trì các chiến dịch.
                </p>
              </div>
              
              <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <h4 className="font-medium text-red-800 mb-2">Cảnh báo</h4>
                <p className="text-sm text-red-700">
                  23% người dùng thuộc nhóm rủi ro cao. Cần có kế hoạch đào tạo riêng biệt.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
