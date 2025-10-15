import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

export const useCapacitor = () => {
  const [isNative, setIsNative] = useState(false);
  const [platform, setPlatform] = useState<string>('web');

  useEffect(() => {
    const native = Capacitor.isNativePlatform();
    setIsNative(native);
    setPlatform(Capacitor.getPlatform());

    if (native) {
      // Configure status bar
      StatusBar.setStyle({ style: Style.Dark }).catch(() => {
        // Status bar not available on all platforms
      });

      StatusBar.setBackgroundColor({ color: '#00CC85' }).catch(() => {
        // Not available on iOS
      });

      // Hide splash screen after app loads
      SplashScreen.hide();

      // Handle app state changes
      App.addListener('appStateChange', ({ isActive }) => {
        console.log('App state changed. Is active?', isActive);
      });

      // Handle deep links
      App.addListener('appUrlOpen', (event) => {
        console.log('App opened with URL:', event.url);
        // Handle deep linking here
      });
    }

    return () => {
      if (native) {
        App.removeAllListeners();
      }
    };
  }, []);

  return {
    isNative,
    platform,
    isIOS: platform === 'ios',
    isAndroid: platform === 'android',
    isWeb: platform === 'web',
  };
};
