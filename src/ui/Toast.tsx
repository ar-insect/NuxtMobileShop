import React from 'react';
import { View, Text } from 'react-native';

type ToastMsg = { id: number; text: string };

const ToastContext = React.createContext<{ show: (text: string) => void } | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = React.useState<ToastMsg[]>([]);
  const idRef = React.useRef(0);

  const show = (text: string) => {
    const id = ++idRef.current;
    setMessages((m) => [...m, { id, text }]);
    setTimeout(() => {
      setMessages((m) => m.filter((x) => x.id !== id));
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <View pointerEvents="none" className="absolute left-0 right-0 bottom-16 items-center">
        {messages.map((m) => (
          <View key={m.id} className="bg-black/80 px-4 py-2 rounded-full mb-2">
            <Text className="text-white">{m.text}</Text>
          </View>
        ))}
      </View>
    </ToastContext.Provider>
  );
}

