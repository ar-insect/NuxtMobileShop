import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from './Icon';

interface HeaderProps {
  title: string;
  canGoBack?: boolean;
  right?: React.ReactNode;
  onBack?: () => void;
  showBack?: boolean; // Alias for canGoBack for backward compatibility
}

export default function Header({
  title,
  canGoBack = true,
  right,
  onBack,
  showBack
}: HeaderProps) {
  const navigation = useNavigation<any>();
  const shouldShowBack = showBack !== undefined ? showBack : canGoBack;

  return (
    <View className="flex-row justify-between items-center px-6 py-2 bg-white">
      {shouldShowBack ? (
        <TouchableOpacity 
          className="w-10 h-10 bg-primary rounded-xl items-center justify-center"
          onPress={onBack || (() => navigation.goBack())}
        >
          <Icon name="ChevronLeft" size={24} color="#ffffff" />
        </TouchableOpacity>
      ) : (
        <View className="w-10 h-10" />
      )}
      
      <Text className="text-lg font-bold text-gray-900">{title}</Text>
      
      {right ? (
        <View className="w-10 h-10 items-center justify-center">
          {right}
        </View>
      ) : (
        <View className="w-10 h-10" />
      )}
    </View>
  );
}

