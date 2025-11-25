import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, FileText, RefreshCw, Download, Trash2, Calendar, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Boleto {
  id: string;
  external_id: string;
  barcode: string;
  digitable_line: string;
  beneficiary: string;
  amount: number;
  due_date: string;
  payment_date?: string;
  status: 'open' | 'paid' | 'overdue' | 'cancelled';
  payer_name: string;
  payer_document: string;
  synced_at: string;
}

const CONSENT_TEXT = `Para exibir seus boletos, precisamos consultar dados junto aos provedores bancários via Open Finance usando seu CPF. Estes dados serão utilizados apenas para listar seus boletos (consulta e exibição), por até 12 meses, e serão armazenados de forma segura e pseudonimizada. Você pode revogar este consentimento a qualquer momento e solicitar a exclusão dos seus dados. Tratamos esses dados em conformidade com a Lei Geral de Proteção de Dados (LGPD). Para saber mais, consulte nossa Política de Privacidade ou entre em contato com o encarregado: contato@financeapp.com`;

export default function Boletos() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  const [boletos, setBoletos] = useState<Boleto[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const [hasConsent, setHasConsent] = useState(false);
  const [hasCPF, setHasCPF] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showCPFModal, setShowCPFModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [cpf, setCpf] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    checkConsentAndCPF();
  }, [user]);

  useEffect(() => {
    if (hasConsent && hasCPF) {
      loadBoletos();
    }
  }, [hasConsent, hasCPF]);

  const checkConsentAndCPF = async () => {
    if (!user) return;

    try {
      // Check consent
      const { data: consentData } = await supabase.functions.invoke('boletos-consent', {
        body: { action: 'check' },
      });

      setHasConsent(consentData?.has_consent || false);

      // Check CPF
      const { data: cpfData } = await supabase.functions.invoke('boletos-cpf', {
        body: { action: 'get' },
      });

      setHasCPF(cpfData?.has_cpf || false);

      // Show consent modal if needed
      if (!consentData?.has_consent) {
        setShowConsentModal(true);
      } else if (!cpfData?.has_cpf) {
        setShowCPFModal(true);
      }
    } catch (error) {
      console.error('Error checking consent/CPF:', error);
    }
  };

  const handleConsent = async (accepted: boolean) => {
    if (!accepted) {
      setShowConsentModal(false);
      toast.error("É necessário aceitar o consentimento para usar este recurso");
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('boletos-consent', {
        body: {
          action: 'create',
          consent_text: CONSENT_TEXT,
          consent_version: 'v1.0',
        },
      });

      if (error) throw error;

      setHasConsent(true);
      setShowConsentModal(false);
      setShowCPFModal(true);
      toast.success("Consentimento registrado com sucesso!");
    } catch (error: any) {
      console.error('Error creating consent:', error);
      toast.error("Erro ao registrar consentimento");
    }
  };

  const handleSaveCPF = async () => {
    if (!cpf || cpf.replace(/\D/g, '').length !== 11) {
      toast.error("Por favor, insira um CPF válido");
      return;
    }

    try {
      const { error } = await supabase.functions.invoke('boletos-cpf', {
        body: {
          action: 'save',
          cpf: cpf,
        },
      });

      if (error) throw error;

      setHasCPF(true);
      setShowCPFModal(false);
      toast.success("CPF salvo com sucesso!");
      loadBoletos();
    } catch (error: any) {
      console.error('Error saving CPF:', error);
      toast.error("Erro ao salvar CPF");
    }
  };

  const handleDeleteCPF = async () => {
    try {
      const { error } = await supabase.functions.invoke('boletos-cpf', {
        body: { action: 'delete' },
      });

      if (error) throw error;

      setHasCPF(false);
      setBoletos([]);
      setShowDeleteConfirm(false);
      toast.success("CPF e dados removidos com sucesso!");
    } catch (error: any) {
      console.error('Error deleting CPF:', error);
      toast.error("Erro ao remover CPF");
    }
  };

  const loadBoletos = async () => {
    if (!user || !hasConsent || !hasCPF) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('boletos-search', {
        body: {},
      });

      if (error) throw error;

      setBoletos(data?.boletos || []);
    } catch (error: any) {
      console.error('Error loading boletos:', error);
      toast.error(error.message || "Erro ao carregar boletos");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadBoletos();
    setRefreshing(false);
    toast.success("Boletos atualizados!");
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      open: { variant: "secondary" as const, label: "Em Aberto" },
      paid: { variant: "default" as const, label: "Pago" },
      overdue: { variant: "destructive" as const, label: "Vencido" },
      cancelled: { variant: "outline" as const, label: "Cancelado" },
    };
    const config = variants[status] || variants.open;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredBoletos = boletos.filter(boleto => {
    const matchesStatus = statusFilter === "all" || boleto.status === statusFilter;
    const matchesSearch = 
      boleto.beneficiary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      boleto.external_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      boleto.digitable_line.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const exportToCSV = () => {
    const headers = ["ID", "Beneficiário", "Valor", "Vencimento", "Status"];
    const rows = filteredBoletos.map(b => [
      b.external_id,
      b.beneficiary,
      b.amount.toString(),
      b.due_date,
      b.status
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'boletos.csv';
    a.click();
    toast.success("CSV exportado com sucesso!");
  };

  if (!hasConsent || !hasCPF) {
    return (
      <>
        <div className="container mx-auto p-4">
          <Card>
            <CardHeader>
              <CardTitle>Boletos</CardTitle>
              <CardDescription>
                Configure sua conta para visualizar seus boletos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Para visualizar seus boletos, você precisa:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Aceitar o consentimento de uso de dados (LGPD)</li>
                <li>Cadastrar seu CPF de forma segura</li>
              </ul>
              {!hasConsent && (
                <Button onClick={() => setShowConsentModal(true)} className="w-full">
                  Iniciar Configuração
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <ConsentModal
          open={showConsentModal}
          onOpenChange={setShowConsentModal}
          onConsent={handleConsent}
        />

        <CPFModal
          open={showCPFModal}
          onOpenChange={setShowCPFModal}
          cpf={cpf}
          onCPFChange={setCpf}
          onSave={handleSaveCPF}
        />
      </>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Boletos</h1>
          <p className="text-muted-foreground">Gerencie seus boletos via Open Finance</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            {!isMobile && <span className="ml-2">Atualizar</span>}
          </Button>
          <Button
            variant="outline"
            onClick={exportToCSV}
            disabled={filteredBoletos.length === 0}
          >
            <Download className="h-4 w-4" />
            {!isMobile && <span className="ml-2">Exportar CSV</span>}
          </Button>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <Trash2 className="h-4 w-4" />
            {!isMobile && <span className="ml-2">Remover CPF</span>}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Buscar por número ou beneficiário</Label>
              <Input
                placeholder="Digite para buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Label>Filtrar por Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="open">Em Aberto</SelectItem>
                  <SelectItem value="overdue">Vencidos</SelectItem>
                  <SelectItem value="paid">Pagos</SelectItem>
                  <SelectItem value="cancelled">Cancelados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Boletos List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredBoletos.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {searchQuery || statusFilter !== "all"
                ? "Nenhum boleto encontrado com os filtros aplicados"
                : "Nenhum boleto encontrado"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredBoletos.map((boleto) => (
            <Card key={boleto.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{boleto.beneficiary}</h3>
                        <p className="text-sm text-muted-foreground">{boleto.external_id}</p>
                      </div>
                      {getStatusBadge(boleto.status)}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{formatCurrency(boleto.amount)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Venc: {formatDate(boleto.due_date)}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">
                      {boleto.digitable_line}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover CPF e Dados?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação irá remover seu CPF e todos os boletos salvos. Você precisará
              cadastrar novamente seu CPF para visualizar boletos no futuro.
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCPF} className="bg-destructive text-destructive-foreground">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function ConsentModal({ open, onOpenChange, onConsent }: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Consentimento para consulta de boletos</DialogTitle>
          <DialogDescription className="text-left space-y-4 pt-4">
            <p>{CONSENT_TEXT}</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onConsent(false)}>
            Recusar
          </Button>
          <Button onClick={() => onConsent(true)}>
            Aceitar e Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CPFModal({ open, onOpenChange, cpf, onCPFChange, onSave }: any) {
  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .substring(0, 14);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar CPF</DialogTitle>
          <DialogDescription>
            Seu CPF será armazenado de forma segura e criptografada para consulta aos boletos.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => onCPFChange(formatCPF(e.target.value))}
              maxLength={14}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSave}>Salvar CPF</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}