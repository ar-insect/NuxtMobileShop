import React from 'react';
import { Text, View, ViewStyle } from 'react-native';

type Tone = 'default' | 'success' | 'warning' | 'danger';

export default function Badge({
  text,
  tone = 'default',
  style,
}: {
  text: string;
  tone?: Tone;
  style?: ViewStyle;
}) {
  const map: Record<Tone, string> = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-700',
  };
  const [bg, textCls] = map[tone].split(' ');
  return (
    <View className={`px-2 py-0.5 rounded-full ${bg}`} style={style}>
      <Text className={`text-xs font-medium ${textCls}`}>{text}</Text>
    </View>
  );
}

