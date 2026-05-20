import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Phone, Bot, CheckCircle, AlertCircle, Camera, BarChart3, Smartphone, Copy, Zap, QrCode, TestTube, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "@/components/ui/textarea";

const WhatsAppConnection = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionCode, setConnectionCode] = useState<string>("");
  const [testPhoneNumber, setTestPhoneNumber] = useState("");
  const [apiResponse, setApiResponse] = useState<string>("");
  const [isTestingApi, setIsTestingApi] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Número do bot - deve ser configurado com o número real do WhatsApp Business API
  const BOT_PHONE_NUMBER = "+55 37 99869-0185"; // Substituir pelo número real do WhatsApp Business

  useEffect(() => {
    if (user) {
      checkExistingConnection();
    }
  }, [user]);

  const checkExistingConnection = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_integrations')
        .select('phone_number, is_active')
        .eq('user_id', user?.id)
        .eq('is_active', true)
        .single();

      if (data && !error) {
        setIsConnected(true);
        setPhoneNumber(data.phone_number);
      }
    } catch {
      // No existing connection — expected for new users
    }
  };

  const generateConnectionCode = () => {
    // Use crypto.getRandomValues for a cryptographically secure token
    const array = new Uint8Array(16)
    crypto.getRandomValues(array)
    const code = Array.from(array, b => b.toString(16).padStart(2, '0')).join('').toUpperCase().slice(0, 16)
    setConnectionCode(code)
    return code
  };

  const formatPhoneNumber = (phone: string) => {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '');

    // Add +55 if it doesn't start with it
    if (!cleaned.startsWith('55') && cleaned.length >= 10) {
      return `+55${cleaned}`;
    } else if (cleaned.startsWith('55')) {
      return `+${cleaned}`;
    }

    return phone;
  };

  const handleConnect = async () => {
    if (!phoneNumber) {
      toast({
        title: "Erro",
        description: "Por favor, insira seu número do WhatsApp.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para conectar o WhatsApp.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      const code = generateConnectionCode();

      // Call the database function to update WhatsApp token
      const { data, error } = await supabase.rpc('update_whatsapp_token', {
        user_uuid: user.id,
        new_token: code,
        phone: formattedPhone
      });

      if (error) {
        throw error;
      }

      setIsConnected(true);
      setPhoneNumber(formattedPhone);

      toast({
        title: "Conta vinculada com sucesso!",
        description: `Agora envie mensagens para o bot ${BOT_PHONE_NUMBER} no WhatsApp para usar todas as funcionalidades!`,
        duration: 5000,
      });

      // Send test message via webhook
      try {
        await supabase.functions.invoke('whatsapp-webhook', {
          body: {
            object: 'whatsapp_business_account',
            entry: [{
              changes: [{
                field: 'messages',
                value: {
                  messages: [{
                    from: formattedPhone,
                    text: { body: 'oi' }
                  }]
                }
              }]
            }]
          }
        });
      } catch {
        // Webhook test is non-critical; connection is still established
      }

    } catch {
      toast({
        title: "Erro na conexão",
        description: "Não foi possível conectar o WhatsApp. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      if (user) {
        await supabase
          .from('whatsapp_integrations')
          .update({ is_active: false })
          .eq('user_id', user.id);
      }

      setIsConnected(false);
      setPhoneNumber("");
      setConnectionCode("");

      toast({
        title: "Desconectado",
        description: "WhatsApp desconectado com sucesso.",
      });
    } catch (error: unknown) {
      toast({
        title: "Erro",
        description: "Erro ao desconectar. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Texto copiado para a área de transferência.",
    });
  };

  const testFinancialSummaryApi = async () => {
    if (!testPhoneNumber && !user?.id) {
      toast({
        title: "Erro",
        description: "Insira um número de telefone ou certifique-se de estar logado",
        variant: "destructive",
      });
      return;
    }

    setIsTestingApi(true);
    setApiResponse("");

    try {
      const payload = testPhoneNumber 
        ? { phone_number: testPhoneNumber }
        : { user_id: user?.id };

      // Use supabase.functions.invoke() so the auth JWT is included automatically
      const { data, error: fnError } = await supabase.functions.invoke('financial-summary', {
        body: payload,
      });

      if (fnError) {
        setApiResponse(`Erro: ${fnError.message}`);
        toast({
          title: "Erro na API",
          description: fnError.message,
          variant: "destructive",
        });
        return;
      }

      setApiResponse(JSON.stringify(data, null, 2));

      toast({
        title: "API testada com sucesso!",
        description: "Resumo financeiro obtido.",
      });

    } catch (error: unknown) {
      setApiResponse(`Erro: ${error}`);
      toast({
        title: "Erro",
        description: "Falha ao testar a API",
        variant: "destructive",
      });
    } finally {
      setIsTestingApi(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-success/10 rounded-lg">
            <MessageSquare className="h-6 w-6 text-success" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Bot WhatsApp com IA</h1>
            <p className="text-muted-foreground">
              Gerencie suas finanças direto do WhatsApp com inteligência artificial
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                IA Financeira
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Registro automático de transações
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Consultas em linguagem natural
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Processamento de categorias
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Análises inteligentes de gastos
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-warning" />
                OCR de Comprovantes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Envie fotos de notas fiscais
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Extração automática de dados
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Criação automática de transações
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Categorização inteligente
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-accent" />
                Relatórios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Resumos diários/semanais/mensais
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Gastos por categoria
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Saldo em tempo real
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Progresso de metas
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className={`p-2 rounded-full ${isConnected ? 'bg-success/10 text-success' : 'bg-muted'
                }`}>
                {isConnected ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
              </div>
              Status da Conexão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Badge variant={isConnected ? "default" : "secondary"}>
                  {isConnected ? "Conectado" : "Desconectado"}
                </Badge>
                {isConnected && (
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Número: {phoneNumber}
                    </p>
                    <p className="text-xs text-success">
                      ✅ Bot ativo e pronto para uso!
                    </p>
                  </div>
                )}
              </div>
              {isConnected && (
                <Button
                  variant="outline"
                  onClick={handleDisconnect}
                  className="text-destructive hover:text-destructive"
                >
                  Desconectar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Connection Form */}
        {!isConnected && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Conectar WhatsApp
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Seu Número do WhatsApp</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+55 11 99999-9999"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isConnecting}
                />
                <div className="bg-info/10 p-3 rounded-lg border border-info/20">
                  <p className="text-sm text-info-foreground">
                    ⚠️ <strong>Importante:</strong> Este é SEU número para vincular sua conta.
                    Após conectar, você enviará mensagens para o número do bot <strong>{BOT_PHONE_NUMBER}</strong>
                  </p>
                </div>
              </div>

              <Button
                onClick={handleConnect}
                disabled={isConnecting || !user}
                className="w-full"
              >
                {isConnecting ? "Conectando..." : "Conectar WhatsApp"}
              </Button>

              {!user && (
                <p className="text-sm text-destructive text-center">
                  Você precisa estar logado para conectar o WhatsApp
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Advanced Commands */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-warning" />
              Comandos Avançados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">📝 Registro de Transações:</h4>
                <div className="bg-muted p-3 rounded-lg space-y-1 text-sm font-mono">
                  <p>• "Receita de R$ 1200 freelance"</p>
                  <p>• "Despesa R$ 80 supermercado"</p>
                  <p>• "Gasto de R$ 45,50 na categoria transporte"</p>
                  <p>• "Entrada salário R$ 3000"</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">📊 Consultas e Relatórios:</h4>
                <div className="bg-muted p-3 rounded-lg space-y-1 text-sm font-mono">
                  <p>• "saldo atual"</p>
                  <p>• "resumo diário"</p>
                  <p>• "resumo semanal"</p>
                  <p>• "resumo mensal"</p>
                  <p>• "gastos em alimentação"</p>
                  <p>• "metas"</p>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="bg-primary/5 p-4 rounded-lg">
              <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
                <Camera className="h-4 w-4" />
                💡 Processamento de Imagens
              </h4>
              <p className="text-sm text-muted-foreground">
                Envie fotos de notas fiscais, comprovantes ou recibos que o bot
                extrairá automaticamente o valor, categoria e descrição, criando
                a transação no seu sistema!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default WhatsAppConnection;