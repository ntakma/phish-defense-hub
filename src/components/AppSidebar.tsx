
import { Shield, BarChart3, Users, Mail, Target, Home } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Tổng quan", url: "/", icon: Home },
  { title: "Kịch bản Phishing", url: "/scenarios", icon: Shield },
  { title: "Đối tượng mục tiêu", url: "/targets", icon: Users },
  { title: "Chiến dịch", url: "/campaigns", icon: Target },
  { title: "Báo cáo & Phân tích", url: "/reports", icon: BarChart3 },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-64 border-r bg-white">
      <SidebarContent>
        <div className="p-6 border-b">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">Phishing Hub</h1>
              <p className="text-sm text-gray-500">Awareness Platform</p>
            </div>
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Quản lý chiến dịch
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.title}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
