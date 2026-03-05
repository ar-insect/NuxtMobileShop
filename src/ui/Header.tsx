import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { nativeShadowClass, webShadowStyle } from '../utils/webStyle';
import Icon from './Icon';

export default function Header({
  title,
  canGoBack = true,
  right,
}: {
  title: string;
  canGoBack?: boolean;
  right?: React.ReactNode;
}) {
  const navigation = useNavigation<any>();
  return (
    <View className={`bg-white ${nativeShadowClass('sm')}`} style={webShadowStyle('sm')}>
      <View className="h-12 flex-row items-center px-3">
        {canGoBack ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-full items-center justify-center"
            accessibilityLabel="返回"
          >
            <Icon name="ChevronLeft" size={22} color="#111827" />
          </TouchableOpacity>
        ) : (
          <View className="w-10" />
        )}
        <View className="flex-1 items-center">
          <Text className="text-base font-bold text-gray-900">{title}</Text>
        </View>
        <View className="w-10 items-end">{right}</View>
      </View>
    </View>
  );
}

