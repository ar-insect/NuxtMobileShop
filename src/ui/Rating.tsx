import React from 'react';
import { View, Text } from 'react-native';

export default function Rating({ value, count }: { value: number; count?: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <View className="flex-row items-center">
      {Array.from({ length: full }).map((_, i) => (
        <Text key={`f${i}`} className="text-yellow-500">★</Text>
      ))}
      {half === 1 ? <Text className="text-yellow-500">☆</Text> : null}
      {Array.from({ length: empty }).map((_, i) => (
        <Text key={`e${i}`} className="text-gray-300">★</Text>
      ))}
      {typeof count === 'number' ? (
        <Text className="text-gray-500 ml-1 text-xs">({count})</Text>
      ) : null}
    </View>
  );
}

