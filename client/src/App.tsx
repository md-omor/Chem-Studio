import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import JoinUs from "@/pages/join-us";
import KnowledgeCenter from "@/pages/knowledge-center";
import MixLab from "@/pages/mix-lab";
import NotFound from "@/pages/not-found";
import PeriodicTable from "@/pages/periodic-table";
import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import Footer1 from "./components/Footer1";
import { Navigation1 } from "./components/Navigation1";
import { ScrollToTop } from "./components/ScrollToTop";
import { queryClient } from "./lib/queryClient";
import AiAssistant from "./pages/ai-assistant-new";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navigation1 />
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
      <Footer1 />
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
