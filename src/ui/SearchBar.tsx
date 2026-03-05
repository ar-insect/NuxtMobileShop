import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Icon from './Icon';

export default function SearchBar({
  value,
  onChange,
  placeholder = '搜索商品、品牌',
  onSubmit,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
}) {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-full px-3 py-2">
      <Icon name="Search" size={18} color="#6b7280" />
      <TextInput
        className="flex-1 px-2 text-gray-900"
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
      />
      {value ? (
        <TouchableOpacity onPress={() => onChange('')}>
          <Text className="text-gray-400">✕</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

