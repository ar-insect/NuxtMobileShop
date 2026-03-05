import React, { useState, useEffect } from 'react';
import { Image as RNImage, ImageProps, View } from 'react-native';
import Icon from './Icon';

interface Props extends ImageProps {
  className?: string;
}

export default function Image({ source, style, className, ...props }: Props) {
  const [error, setError] = useState(false);

  // Reset error when source changes
  useEffect(() => {
    setError(false);
  }, [source]);

  if (error) {
    return (
      <View 
        style={[style, { backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' }]} 
        className={className}
      >
        <Icon name="Image" size={24} color="#9ca3af" />
      </View>
    );
  }

  return (
    <RNImage
      source={source}
      style={style}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
