import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Plans from "./pages/Plans";
import Dashboard from "./pages/Dashboard";
import Transacoes from "./pages/Transacoes";
import Contas from "./pages/Contas";
import Investimentos from "./pages/Investimentos";
import Goals from "./pages/Goals";
import Relatorios from "./pages/Relatorios";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="finance-tracker-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/transacoes" element={
                <ProtectedRoute requireSubscription>
                  <Transacoes />
                </ProtectedRoute>
              } />
              <Route path="/contas" element={
                <ProtectedRoute requireSubscription>
                  <Contas />
                </ProtectedRoute>
              } />
              <Route path="/investimentos" element={
                <ProtectedRoute requireSubscription>
                  <Investimentos />
                </ProtectedRoute>
              } />
              <Route path="/metas" element={
                <ProtectedRoute requireSubscription>
                  <Goals />
                </ProtectedRoute>
              } />
              <Route path="/relatorios" element={
                <ProtectedRoute requireSubscription>
                  <Relatorios />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;