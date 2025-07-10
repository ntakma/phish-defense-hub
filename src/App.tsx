
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { ScenarioManagement } from "@/components/ScenarioManagement";
import { TargetManagement } from "@/components/TargetManagement";
import { CampaignExecution } from "@/components/CampaignExecution";
import { ReportsAnalytics } from "@/components/ReportsAnalytics";
import { AttackToolsManagement } from "@/components/AttackToolsManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/scenarios" element={<ScenarioManagement />} />
                  <Route path="/targets" element={<TargetManagement />} />
                  <Route path="/campaigns" element={<CampaignExecution />} />
                  <Route path="/tools" element={<AttackToolsManagement />} />
                  <Route path="/reports" element={<ReportsAnalytics />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
