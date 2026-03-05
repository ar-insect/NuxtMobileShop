import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../ui';

export default function AddressScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Header title="收货地址" />
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">收货地址管理开发中...</Text>
      </View>
    </SafeAreaView>
  );
}
