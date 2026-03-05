import React from 'react';
import { Text, View, ViewStyle } from 'react-native';

interface PriceProps {
  value: number;
  original?: number;
  unit?: string;
  style?: ViewStyle;
  large?: boolean;
}

export default function Price({ value, original, unit = '¥', style, large }: PriceProps) {
  const discount =
    original && original > value ? Math.round((value / original) * 100) / 10 : null;
  return (
    <View style={style} className="flex-row items-end">
      <Text className={`text-red-600 font-bold ${large ? 'text-2xl' : 'text-lg'}`}>
        {unit}
        {value}
      </Text>
      {original && original > value ? (
        <>
          <Text className="text-gray-400 line-through ml-2">{unit}{original}</Text>
          {discount ? <Text className="text-green-600 ml-2">{discount}折</Text> : null}
        </>
      ) : null}
    </View>
  );
}

