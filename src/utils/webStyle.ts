import { Platform } from 'react-native';

type ShadowLevel = 'sm' | 'md' | 'lg';

const WEB_SHADOW: Record<ShadowLevel, string> = {
  sm: '0 1px 2px rgba(0,0,0,0.08)',
  md: '0 4px 8px rgba(0,0,0,0.12)',
  lg: '0 12px 20px rgba(0,0,0,0.14)',
};

export function nativeShadowClass(level: ShadowLevel) {
  return Platform.OS === 'web' ? '' : `shadow-${level}`;
}

export function webShadowStyle(level: ShadowLevel) {
  if (Platform.OS !== 'web') return undefined;
  return { boxShadow: WEB_SHADOW[level] } as any;
}

