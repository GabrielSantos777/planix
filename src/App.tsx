import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { CategoriesProvider } from "./context/CategoriesContext";
import { InvestmentsProvider } from "./context/InvestmentsContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Plans from "./pages/Plans";
import Dashboard from "./pages/Dashboard";
import TransacoesImproved from "./pages/TransacoesImproved";
import ContasImproved from "./pages/ContasImproved";
import Investimentos from "./pages/Investimentos";
import GoalsImproved from "./pages/GoalsImproved";
import RelatoriosImproved from "./pages/RelatoriosImproved";
import SettingsImproved from "./pages/SettingsImproved";
import NotFound from "./pages/NotFound";
import WhatsAppConnection from "./pages/WhatsAppConnection";
import Categorias from "./pages/Categorias";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="finance-tracker-theme">
      <AuthProvider>
        <CurrencyProvider>
          <CategoriesProvider>
            <InvestmentsProvider>
              <AppProvider>
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
                          <TransacoesImproved />
                        </ProtectedRoute>
                      } />
                      <Route path="/contas" element={
                        <ProtectedRoute requireSubscription>
                          <ContasImproved />
                        </ProtectedRoute>
                      } />
                      <Route path="/investimentos" element={
                        <ProtectedRoute requireSubscription>
                          <Investimentos />
                        </ProtectedRoute>
                      } />
                      <Route path="/metas" element={
                        <ProtectedRoute>
                          <GoalsImproved />
                        </ProtectedRoute>
                      } />
                       <Route path="/relatorios" element={
                         <ProtectedRoute requireSubscription>
                           <RelatoriosImproved />
                         </ProtectedRoute>
                       } />
                       <Route path="/settings" element={
                        <ProtectedRoute>
                          <SettingsImproved />
                        </ProtectedRoute>
                      } />
                       <Route path="/conexao" element={
                        <ProtectedRoute requireSubscription>
                          <WhatsAppConnection />
                        </ProtectedRoute>
                      } />
                      <Route path="/categorias" element={
                        <ProtectedRoute>
                          <Categorias />
                        </ProtectedRoute>
                      } />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                </TooltipProvider>
              </AppProvider>
            </InvestmentsProvider>
          </CategoriesProvider>
        </CurrencyProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;