import React from 'react';
import * as Icons from 'lucide-react-native';
import { View } from 'react-native';

interface IconProps {
  name: keyof typeof Icons;
  size?: number;
  color?: string;
}

export default function Icon({ name, size = 20, color = '#111827' }: IconProps) {
  // eslint-disable-next-line import/namespace
  const Cmp = Icons[name] as any;
  if (!Cmp) return <View />;
  return <Cmp size={size} color={color} />;
}

