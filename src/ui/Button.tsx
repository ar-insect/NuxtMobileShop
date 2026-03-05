import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { nativeShadowClass, webShadowStyle } from '../utils/webStyle';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  disabled,
  loading,
  variant = 'primary',
  size = 'md',
  className = '',
  style,
  textStyle,
}: ButtonProps) {
  const base = 'rounded-xl items-center justify-center ' + nativeShadowClass('sm');
  const byVariant: Record<Variant, string> = {
    primary: 'bg-blue-600',
    secondary: 'bg-gray-800',
    outline: 'bg-transparent border border-gray-300',
    ghost: 'bg-transparent',
    danger: 'bg-red-600',
  };
  const bySize: Record<Size, string> = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-5 py-4',
  };
  const textColor =
    variant === 'outline' || variant === 'ghost' ? 'text-gray-900' : 'text-white';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${base} ${byVariant[variant]} ${bySize[size]} ${disabled ? 'opacity-60' : ''} ${className}`}
      style={[webShadowStyle('sm'), style]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#111827' : '#fff'} />
      ) : (
        <Text className={`font-bold ${textColor}`} style={textStyle}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

