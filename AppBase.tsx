import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LogBox, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeWindStyleSheet } from 'nativewind';
import { ToastProvider } from './src/ui';
import AppNavigator from './src/navigation/AppNavigator';

NativeWindStyleSheet.setOutput({
  web: 'native',
  default: 'native',
});

if (Platform.OS === 'web') {
  const originalWarn = console.warn.bind(console);
  console.warn = (...args: any[]) => {
    const first = args[0];
    if (typeof first === 'string') {
      if (first.includes('"shadow*" style props are deprecated. Use "boxShadow".')) return;
      if (first.includes('props.pointerEvents is deprecated. Use style.pointerEvents')) return;
    }
    originalWarn(...args);
  };
}

LogBox.ignoreLogs([
  '"shadow*" style props are deprecated. Use "boxShadow".',
  'props.pointerEvents is deprecated. Use style.pointerEvents',
]);

export default function AppBase() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ToastProvider>
          <AppNavigator />
        </ToastProvider>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
