import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Stepper({
  value,
  onChange,
  min = 1,
  max = 99,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  return (
    <View className="flex-row items-center">
      <TouchableOpacity className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center" onPress={dec}>
        <Text className="text-gray-600 font-bold">-</Text>
      </TouchableOpacity>
      <Text className="mx-3 font-medium text-gray-800">{value}</Text>
      <TouchableOpacity className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center" onPress={inc}>
        <Text className="text-gray-600 font-bold">+</Text>
      </TouchableOpacity>
    </View>
  );
}

