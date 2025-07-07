import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Home from "@/pages/home";
import PeriodicTable from "@/pages/periodic-table";
import MixLab from "@/pages/mix-lab";
import KnowledgeCenter from "@/pages/knowledge-center";
import AiAssistant from "@/pages/ai-assistant";
import JoinUs from "@/pages/join-us";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/periodic-table" component={PeriodicTable} />
          <Route path="/mix-lab" component={MixLab} />
          <Route path="/knowledge-center" component={KnowledgeCenter} />
          <Route path="/ai-assistant" component={AiAssistant} />
          <Route path="/join-us" component={JoinUs} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
