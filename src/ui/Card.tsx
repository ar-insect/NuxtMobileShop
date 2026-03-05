import React from 'react';
import { View, ViewProps } from 'react-native';
import { nativeShadowClass, webShadowStyle } from '../utils/webStyle';

export default function Card({ className = '', style, ...rest }: ViewProps & { className?: string }) {
  return (
    <View
      className={`bg-white rounded-xl ${nativeShadowClass('sm')} ${className}`}
      style={[webShadowStyle('sm'), style]}
      {...rest}
    />
  );
}

