import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import {
  PushNotifications,
  Token,
  PushNotificationSchema,
  ActionPerformed,
} from '@capacitor/push-notifications';
import { useToast } from '@/hooks/use-toast';

export const usePushNotifications = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    const registerNotifications = async () => {
      try {
        // Request permission
        let permStatus = await PushNotifications.checkPermissions();

        if (permStatus.receive === 'prompt') {
          permStatus = await PushNotifications.requestPermissions();
        }

        if (permStatus.receive !== 'granted') {
          console.log('Push notification permission denied');
          return;
        }

        // Register with Apple / Google
        await PushNotifications.register();
        setIsRegistered(true);
      } catch (error) {
        console.error('Error registering push notifications:', error);
      }
    };

    // Listeners
    PushNotifications.addListener('registration', (token: Token) => {
      console.log('Push registration success, token: ' + token.value);
      setToken(token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push notification received: ', notification);
        toast({
          title: notification.title || 'Nova notificação',
          description: notification.body || '',
        });
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push notification action performed', notification);
      }
    );

    registerNotifications();

    return () => {
      PushNotifications.removeAllListeners();
    };
  }, [toast]);

  return {
    token,
    isRegistered,
  };
};
