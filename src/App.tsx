import React, { Suspense, lazy } from "react";
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
import ErrorBoundary from "./components/ErrorBoundary";
import { PageSkeleton } from "./components/LoadingSkeletons";

import ProtectedRoute from "./components/ProtectedRoute";

// Eager-loaded (always needed)
import Index from "./pages/Index";
import Auth from "./pages/Auth";

// Lazy-loaded routes
const Landing = lazy(() => import("./pages/Landing"));
const Plans = lazy(() => import("./pages/Plans"));
const Install = lazy(() => import("./pages/Install"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const TransacoesImproved = lazy(() => import("./pages/TransacoesImproved"));
const ContasImproved = lazy(() => import("./pages/ContasImproved"));
const Investimentos = lazy(() => import("./pages/Investimentos"));
const GoalsImproved = lazy(() => import("./pages/GoalsImproved"));
const RelatoriosImproved = lazy(() => import("./pages/RelatoriosImproved"));
const SettingsImproved = lazy(() => import("./pages/SettingsImproved"));
const NotFound = lazy(() => import("./pages/NotFound"));
const WhatsAppConnection = lazy(() => import("./pages/WhatsAppConnection"));
const Categorias = lazy(() => import("./pages/Categorias"));
const Contacts = lazy(() => import("./pages/Contacts"));
const Social = lazy(() => import("./pages/Social"));
const Boletos = lazy(() => import("./pages/Boletos"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Contact = lazy(() => import("./pages/Contact"));
const Orcamento = lazy(() => import("./pages/Orcamento"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {children}
    </Suspense>
  );
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
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
                        <Suspense fallback={<PageSkeleton />}>
                          <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/landing" element={<SuspenseWrapper><Landing /></SuspenseWrapper>} />
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/plans" element={<SuspenseWrapper><Plans /></SuspenseWrapper>} />
                            <Route path="/install" element={<SuspenseWrapper><Install /></SuspenseWrapper>} />
                            <Route path="/dashboard" element={
                              <ProtectedRoute>
                                <SuspenseWrapper><Dashboard /></SuspenseWrapper>
                              </ProtectedRoute>
                            } />
                            <Route path="/transacoes" element={
                              <ProtectedRoute requireSubscription>
                                <SuspenseWrapper><TransacoesImproved /></SuspenseWrapper>
                              </ProtectedRoute>
                            } />
                            <Route path="/contas" element={
                              <ProtectedRoute requireSubscription>
                                <SuspenseWrapper><ContasImproved /></SuspenseWrapper>
                              </ProtectedRoute>
                            } />
                            <Route path="/investimentos" element={
                              <ProtectedRoute requireSubscription>
                                <SuspenseWrapper><Investimentos /></SuspenseWrapper>
                              </ProtectedRoute>
                            } />
                            <Route path="/metas" element={
                              <ProtectedRoute>
                                <SuspenseWrapper><GoalsImproved /></SuspenseWrapper>
                              </ProtectedRoute>
                            } />
                            <Route path="/orcamento" element={
                              <ProtectedRoute requireSubscription>
                                <SuspenseWrapper><Orcamento /></SuspenseWrapper>
                              </ProtectedRoute>
                            } />
                            <Route path="/relatorios" element={
                              <ProtectedRoute requireSubscription>
                                <SuspenseWrapper><RelatoriosImproved /></SuspenseWrapper>
                              </ProtectedRoute>
                            } />
                            <Route path="/settings" element={
                              <ProtectedRoute>
                                <SuspenseWrapper><SettingsImproved /></SuspenseWrapper>
                              </ProtectedRoute>
                            } />
                            <Route path="/conexao" element={
                              <ProtectedRoute requireSubscription>
                                <SuspenseWrapper><WhatsAppConnection /></SuspenseWrapper>
                              </ProtectedRoute>
                            } />
                            <Route path="/categorias" element={
                              <ProtectedRoute>
                                <SuspenseWrapper><Categorias /></SuspenseWrapper>
                              </ProtectedRoute>
                            } />
                            <Route path="/contatos" element={
                              <ProtectedRoute>
                                <SuspenseWrapper><Contacts /></SuspenseWrapper>
                              </ProtectedRoute>
                            } />
                            <Route path="/social" element={
                              <ProtectedRoute>
                                <SuspenseWrapper><Social /></SuspenseWrapper>
                              </ProtectedRoute>
                            } />
                            <Route path="/boletos" element={
                              <ProtectedRoute requireSubscription>
                                <SuspenseWrapper><Boletos /></SuspenseWrapper>
                              </ProtectedRoute>
                            } />
                            <Route path="/sobre" element={<SuspenseWrapper><AboutUs /></SuspenseWrapper>} />
                            <Route path="/termos" element={<SuspenseWrapper><TermsOfService /></SuspenseWrapper>} />
                            <Route path="/privacidade" element={<SuspenseWrapper><PrivacyPolicy /></SuspenseWrapper>} />
                            <Route path="/contato" element={<SuspenseWrapper><Contact /></SuspenseWrapper>} />
                            <Route path="*" element={<SuspenseWrapper><NotFound /></SuspenseWrapper>} />
                          </Routes>
                        </Suspense>
                      </BrowserRouter>
                    </TooltipProvider>
                  </AppProvider>
                </CategoriesProvider>
              </PrivacyProvider>
            </CurrencyProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
