import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, Alert } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';
import { Card, Button, Badge, Header } from '../ui';

const ProfileScreen = () => {
  const { user, logout, isLoading } = useAuthStore();
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    Alert.alert('退出登录', '确定要退出登录吗？', [
      { text: '取消', style: 'cancel' },
      { text: '退出登录', style: 'destructive', onPress: logout }
    ]);
  };

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <Header title="我的" canGoBack={false} />
        <View className="flex-1 justify-center items-center p-6">
          <Text className="text-xl font-bold mb-4 text-gray-800">欢迎来到 NuxtShop</Text>
          <Text className="text-gray-500 mb-8 text-center">登录以管理您的订单、收藏和个人资料。</Text>
          <Button title="登录" onPress={() => navigation.navigate('Login')} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header title="我的" canGoBack={false} />
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <Card className="p-6 mb-4 items-center">
          <Image 
            source={{ uri: user.avatar }} 
            className="w-24 h-24 rounded-full mb-4 bg-gray-200"
          />
          <Text className="text-xl font-bold text-gray-900">{user.name}</Text>
          <Text className="text-gray-500">@{user.username}</Text>
          <View className="mt-2">
            <Badge text={user.role} tone="success" />
          </View>
        </Card>

        <Card className="px-4 py-2 mb-4">
          <TouchableOpacity 
            className="py-4 flex-row justify-between items-center border-b border-gray-50"
            onPress={() => navigation.navigate('Orders')}
          >
            <Text className="text-lg text-gray-800">我的订单</Text>
            <Text className="text-gray-400">›</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="py-4 flex-row justify-between items-center border-b border-gray-50"
            onPress={() => navigation.navigate('UIDemo' as never)}
          >
            <Text className="text-lg text-gray-800">UI 组件演示</Text>
            <Text className="text-gray-400">›</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-4 flex-row justify-between items-center border-b border-gray-50">
            <Text className="text-lg text-gray-800">收藏夹</Text>
            <Text className="text-gray-400">›</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-4 flex-row justify-between items-center">
            <Text className="text-lg text-gray-800">地址管理</Text>
            <Text className="text-gray-400">›</Text>
          </TouchableOpacity>
        </Card>

        <Card className="px-4 py-2">
          <TouchableOpacity className="py-4 border-b border-gray-50 flex-row justify-between items-center">
            <Text className="text-lg text-gray-800">设置</Text>
            <Text className="text-gray-400">›</Text>
          </TouchableOpacity>
          <View className="py-4 items-center">
            <Button title="退出登录" variant="danger" onPress={handleLogout} />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
