# 📱 Guia de Configuração do Capacitor - Planix

O Planix agora está configurado como um **app nativo mobile** usando Capacitor! Isso permite publicar nas lojas Apple App Store e Google Play Store.

## ✅ O Que Já Foi Configurado

- ✅ Capacitor instalado e configurado
- ✅ Plugins nativos: Push Notifications, Splash Screen, Status Bar, App
- ✅ Hooks React para funcionalidades nativas
- ✅ Configuração PWA mantida (funciona em paralelo)
- ✅ Ícones e splash screens gerados

## 🚀 Como Testar Localmente

### Passo 1: Exportar para GitHub
1. Clique no botão **"Export to Github"** no Lovable
2. Conecte sua conta GitHub se ainda não conectou
3. Faça git pull do repositório para sua máquina local

### Passo 2: Instalar Dependências
```bash
cd planix-financeiro
npm install
```

### Passo 3: Inicializar Capacitor
```bash
npx cap init
```
Quando perguntado, use:
- **App ID**: `app.lovable.ac228287ee874afd99529f0d4479b8a5`
- **App Name**: `Planix`

### Passo 4: Build do Projeto
```bash
npm run build
```

### Passo 5: Adicionar Plataformas

#### Para Android:
```bash
npx cap add android
npx cap update android
npx cap sync
```

**Requisitos Android:**
- Android Studio instalado
- SDK do Android (API 22 ou superior)

#### Para iOS:
```bash
npx cap add ios
npx cap update ios
npx cap sync
```

**Requisitos iOS:**
- macOS com Xcode instalado
- Apple Developer Account (para publicar)

### Passo 6: Executar o App

#### Android:
```bash
npx cap run android
```
Ou abra o projeto no Android Studio:
```bash
npx cap open android
```

#### iOS:
```bash
npx cap run ios
```
Ou abra o projeto no Xcode:
```bash
npx cap open ios
```

## 🔄 Workflow de Desenvolvimento

Sempre que fizer alterações no código:

1. **Build do projeto:**
   ```bash
   npm run build
   ```

2. **Sincronizar com plataformas nativas:**
   ```bash
   npx cap sync
   ```

3. **Testar no dispositivo/emulador:**
   ```bash
   npx cap run android
   # ou
   npx cap run ios
   ```

## 🌐 Hot Reload Durante Desenvolvimento

O Capacitor está configurado para usar o servidor Lovable durante desenvolvimento:
```typescript
server: {
  url: 'https://ac228287-ee87-4afd-9952-9f0d4479b8a5.lovableproject.com?forceHideBadge=true',
  cleartext: true
}
```

Isso permite testar mudanças instantaneamente no app sem rebuild!

**Para desenvolvimento local**, atualize o `capacitor.config.ts`:
```typescript
server: {
  url: 'http://localhost:8080',  // seu servidor local
  cleartext: true
}
```

## 📦 Funcionalidades Nativas Implementadas

### 1. Push Notifications
```typescript
import { usePushNotifications } from '@/hooks/usePushNotifications'

const { token, isRegistered } = usePushNotifications()
```

### 2. Splash Screen
Configurado para mostrar por 2 segundos com o logo Planix

### 3. Status Bar
Estilizada com a cor verde do Planix (#00CC85)

### 4. App Lifecycle
Detecta quando o app está ativo/inativo

## 🏪 Publicação nas Lojas

### Google Play Store (Android)

1. **Gerar keystore:**
   ```bash
   keytool -genkey -v -keystore planix.keystore -alias planix -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Build de produção:**
   - Abra o projeto no Android Studio (`npx cap open android`)
   - Build > Generate Signed Bundle / APK
   - Escolha "Android App Bundle"
   - Siga o assistente

3. **Upload no Play Console:**
   - Acesse Google Play Console
   - Crie um novo app
   - Faça upload do arquivo `.aab`

### Apple App Store (iOS)

1. **Configurar no Xcode:**
   - Abra o projeto (`npx cap open ios`)
   - Configure Signing & Capabilities
   - Adicione seu Apple Developer Team

2. **Archive e Upload:**
   - Product > Archive
   - Window > Organizer
   - Distribute App > App Store Connect

3. **App Store Connect:**
   - Complete metadados
   - Adicione screenshots
   - Submeta para revisão

## 🔧 Plugins Disponíveis

Você pode adicionar mais funcionalidades:

```bash
# Câmera
npm install @capacitor/camera
npx cap sync

# Geolocalização
npm install @capacitor/geolocation
npx cap sync

# Compartilhamento
npm install @capacitor/share
npx cap sync

# Filesystem
npm install @capacitor/filesystem
npx cap sync
```

## 📝 Notas Importantes

- **PWA ainda funciona**: O app pode ser instalado via browser E publicado nas lojas
- **Hot reload**: Durante dev, o app carrega do servidor Lovable
- **Build para produção**: Remova a URL do servidor antes de publicar
- **Permissões**: Configure permissões no `AndroidManifest.xml` e `Info.plist`

## 🆘 Problemas Comuns

**Erro "Plugin not implemented":**
- Execute `npx cap sync` após instalar plugins

**App não carrega:**
- Verifique se rodou `npm run build`
- Confirme que o servidor está acessível

**Notificações não funcionam:**
- Configure Firebase (Android) ou Apple Push (iOS)
- Adicione permissões necessárias

## 📚 Recursos Úteis

- [Documentação Capacitor](https://capacitorjs.com/docs)
- [Blog post Lovable sobre Capacitor](https://lovable.dev/blog)
- [Plugins Capacitor](https://capacitorjs.com/docs/plugins)

---

**Pronto!** 🎉 O Planix agora é um app nativo mobile completo!
