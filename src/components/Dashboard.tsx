
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Target, AlertTriangle, TrendingUp, Eye } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

const campaignData = [
  { month: "T1", campaigns: 4, success: 65 },
  { month: "T2", campaigns: 6, success: 78 },
  { month: "T3", campaigns: 8, success: 45 },
  { month: "T4", campaigns: 5, success: 89 },
  { month: "T5", campaigns: 7, success: 67 },
  { month: "T6", campaigns: 9, success: 72 }
];

const vulnerabilityData = [
  { name: "Nhóm cảnh giác cao", value: 45, color: "#10B981" },
  { name: "Nhóm cảnh giác trung bình", value: 35, color: "#F59E0B" },
  { name: "Nhóm dễ bị khai thác", value: 20, color: "#EF4444" }
];

const attackTypeData = [
  { type: "Email Phishing", count: 156, success: 34 },
  { type: "SMS Smishing", count: 89, success: 28 },
  { type: "Call Bot Vishing", count: 67, success: 45 },
  { type: "Kết hợp", count: 23, success: 67 }
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng chiến dịch</CardTitle>
            <Target className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">39</div>
            <p className="text-xs opacity-80">+12% từ tháng trước</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Người dùng tham gia</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs opacity-80">+18% từ tháng trước</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ tương tác</CardTitle>
            <Eye className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs opacity-80">+5% từ tháng trước</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Người dùng dễ bị khai thác</CardTitle>
            <AlertTriangle className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">569</div>
            <p className="text-xs opacity-80">-8% từ tháng trước</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Xu hướng hiệu quả chiến dịch</CardTitle>
            <CardDescription>Tỷ lệ thành công theo thời gian</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="success" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phân loại độ cảnh giác</CardTitle>
            <CardDescription>Phân bố người dùng theo mức độ rủi ro</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={vulnerabilityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {vulnerabilityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hiệu quả theo loại tấn công</CardTitle>
          <CardDescription>So sánh tỷ lệ thành công giữa các phương thức tấn công</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attackTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" name="Số lượng chiến dịch" />
              <Bar dataKey="success" fill="#82ca9d" name="Tỷ lệ thành công (%)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Tạo kịch bản mới", detail: "Email phishing ngân hàng ABC", time: "2 phút trước" },
                { action: "Hoàn thành chiến dịch", detail: "Chiến dịch SMS lừa đảo", time: "15 phút trước" },
                { action: "Cập nhật danh sách mục tiêu", detail: "Thêm 45 người dùng mới", time: "1 giờ trước" },
                { action: "Xuất báo cáo", detail: "Báo cáo tháng 6/2024", time: "3 giờ trước" }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.detail}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cảnh báo và thông báo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "success", message: "Chiến dịch 'Phishing Email ABC' đã hoàn thành thành công với tỷ lệ 78%", time: "10 phút trước" },
                { type: "warning", message: "Có 12 người dùng mới được phát hiện có nguy cơ cao", time: "30 phút trước" },
                { type: "info", message: "Báo cáo tháng đã sẵn sàng để xuất", time: "2 giờ trước" },
                { type: "error", message: "Gặp lỗi khi gửi SMS cho 3 người dùng", time: "4 giờ trước" }
              ].map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'success' ? 'border-green-500 bg-green-50' :
                  alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                  alert.type === 'info' ? 'border-blue-500 bg-blue-50' :
                  'border-red-500 bg-red-50'
                }`}>
                  <p className="text-sm text-gray-800">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
