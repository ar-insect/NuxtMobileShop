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
  const base = 'rounded-full items-center justify-center ' + nativeShadowClass('sm');
  const byVariant: Record<Variant, string> = {
    primary: 'bg-primary',
    secondary: 'bg-gray-100',
    outline: 'bg-transparent border border-gray-300',
    ghost: 'bg-transparent',
    danger: 'bg-red-500',
  };
  const bySize: Record<Size, string> = {
    sm: 'px-4 py-1.5',
    md: 'px-6 py-2.5',
    lg: 'px-8 py-3.5',
  };
  
  const getTextColor = () => {
    if (variant === 'primary') return 'text-white';
    if (variant === 'secondary') return 'text-gray-900';
    if (variant === 'danger') return 'text-white';
    return 'text-gray-900';
  };
  
  const textColor = getTextColor();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${base} ${byVariant[variant]} ${bySize[size]} ${disabled ? 'opacity-60' : ''} ${className}`}
      style={[webShadowStyle('sm'), style]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' || variant === 'danger' ? '#fff' : '#111827'} />
      ) : (
        <Text className={`font-bold ${textColor}`} style={textStyle}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

