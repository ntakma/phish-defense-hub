
import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { ScenarioManagement } from "@/components/ScenarioManagement";
import { TargetManagement } from "@/components/TargetManagement";
import { CampaignExecution } from "@/components/CampaignExecution";
import { ReportsAnalytics } from "@/components/ReportsAnalytics";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/scenarios" element={<ScenarioManagement />} />
              <Route path="/targets" element={<TargetManagement />} />
              <Route path="/campaigns" element={<CampaignExecution />} />
              <Route path="/reports" element={<ReportsAnalytics />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
