import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Phone, Bot, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const WhatsAppConnection = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!phoneNumber) {
      toast({
        title: "Erro",
        description: "Por favor, insira seu número do WhatsApp.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      toast({
        title: "Conexão estabelecida!",
        description: "Seu WhatsApp foi conectado com sucesso.",
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setPhoneNumber("");
    toast({
      title: "Desconectado",
      description: "WhatsApp desconectado com sucesso.",
    });
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
            <h1 className="text-2xl sm:text-3xl font-bold">Conexão WhatsApp</h1>
            <p className="text-muted-foreground">
              Conecte seu WhatsApp para receber notificações e usar IA
            </p>
          </div>
        </div>

        {/* Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className={`p-2 rounded-full ${
                isConnected ? 'bg-success/10 text-success' : 'bg-muted'
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
                  <p className="text-sm text-muted-foreground mt-2">
                    Número: {phoneNumber}
                  </p>
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
                <Phone className="h-5 w-5" />
                Conectar WhatsApp
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Número do WhatsApp</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+55 11 99999-9999"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isConnecting}
                />
                <p className="text-sm text-muted-foreground">
                  Insira o número com código do país (+55 para Brasil)
                </p>
              </div>

              <Button 
                onClick={handleConnect} 
                disabled={isConnecting}
                className="w-full"
              >
                {isConnecting ? "Conectando..." : "Conectar WhatsApp"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  Consultas sobre gastos via WhatsApp
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Lembretes de vencimentos
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Análises automáticas de gastos
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Dicas de economia personalizadas
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-success" />
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Alertas de gastos elevados
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Resumos diários/semanais
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Metas alcançadas
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Lembretes de pagamentos
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Como usar a IA no WhatsApp</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Comandos básicos:</h4>
                <div className="bg-muted p-3 rounded-lg space-y-1 text-sm font-mono">
                  <p>• "Gastos hoje" - Ver gastos do dia</p>
                  <p>• "Saldo atual" - Consultar saldo</p>
                  <p>• "Adicionar gasto [valor] [descrição]" - Registrar despesa</p>
                  <p>• "Metas" - Ver progresso das metas</p>
                  <p>• "Relatório mensal" - Obter análise do mês</p>
                </div>
              </div>

              <Separator />

              <div className="bg-primary/5 p-4 rounded-lg">
                <h4 className="font-medium text-primary mb-2">💡 Dica Pro</h4>
                <p className="text-sm text-muted-foreground">
                  A IA aprende com seus padrões de gastos e oferece insights 
                  personalizados para melhorar sua saúde financeira!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default WhatsAppConnection;