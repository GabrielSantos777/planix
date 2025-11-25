import React from "react";
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
import { PrivacyProvider } from "./context/PrivacyContext";
import { InstallPrompt } from "./components/InstallPrompt";

import ProtectedRoute from "./components/ProtectedRoute";

import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Plans from "./pages/Plans";
import Install from "./pages/Install";
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
import Contacts from "./pages/Contacts";
import Social from "./pages/Social";
import Boletos from "./pages/Boletos";
import AboutUs from "./pages/AboutUs";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import Orcamento from "./pages/Orcamento";

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
          <PrivacyProvider>
            <CategoriesProvider>
              <AppProvider>
                  <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <InstallPrompt />
                    <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/landing" element={<Landing />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/plans" element={<Plans />} />
                      <Route path="/install" element={<Install />} />
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
                        <Route path="/orcamento" element={
                          <ProtectedRoute requireSubscription>
                            <Orcamento />
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
                       <Route path="/contatos" element={
                         <ProtectedRoute>
                           <Contacts />
                         </ProtectedRoute>
                       } />
                       <Route path="/social" element={
                         <ProtectedRoute>
                           <Social />
                         </ProtectedRoute>
                       } />
                       <Route path="/boletos" element={
                         <ProtectedRoute requireSubscription>
                           <Boletos />
                         </ProtectedRoute>
                       } />
                       <Route path="/sobre" element={<AboutUs />} />
                       <Route path="/termos" element={<TermsOfService />} />
                       <Route path="/privacidade" element={<PrivacyPolicy />} />
                       <Route path="/contato" element={<Contact />} />
                       <Route path="*" element={<NotFound />} />
                    </Routes>
                    </BrowserRouter>
                  </TooltipProvider>
              </AppProvider>
            </CategoriesProvider>
          </PrivacyProvider>
        </CurrencyProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;