import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';
import { Icon, Button, Image, useToast } from '../ui';

const ProfileScreen = () => {
  const { user, logout } = useAuthStore();
  const navigation = useNavigation<any>();
  const toast = useToast();

  const handleLogout = () => {
    Alert.alert('退出登录', '确定要退出登录吗？', [
      { text: '取消', style: 'cancel' },
      { 
        text: '退出登录', 
        style: 'destructive', 
        onPress: async () => {
          await logout();
          toast.show('已退出登录');
        } 
      }
    ]);
  };

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={['top']}>
        <View className="flex-1 justify-center items-center p-6">
          <View className="w-24 h-24 bg-primary rounded-[30px] items-center justify-center mb-6">
            <Icon name="User" size={40} color="#ffffff" />
          </View>
          <Text className="text-2xl font-bold mb-2 text-gray-900">欢迎来到 NuxtShop</Text>
          <Text className="text-gray-500 mb-8 text-center px-4">登录以管理您的订单、收藏和个人资料。</Text>
          <View className="w-full">
            <Button title="登录 / 注册" onPress={() => navigation.navigate('Login')} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-2">
        <TouchableOpacity 
          className="w-10 h-10 bg-primary rounded-xl items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <Icon name="ChevronLeft" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">个人中心</Text>
        <TouchableOpacity 
          className="w-10 h-10 bg-primary rounded-xl items-center justify-center"
          onPress={() => navigation.navigate('ProfileUserInfo')}
        >
          <Icon name="Edit2" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View className="items-center mt-6 mb-8">
          <View className="w-28 h-28 bg-primary rounded-[36px] items-center justify-center mb-4 overflow-hidden">
             <Image 
                source={{ uri: user.avatar }} 
                className="w-full h-full"
                resizeMode="cover"
              />
          </View>
          <Text className="text-2xl font-bold text-gray-900">{user.name}</Text>
          <Text className="text-gray-400 mt-1">@{user.username}</Text>
        </View>

        {/* Quick Actions Bar */}
        <View className="flex-row bg-primary rounded-[24px] py-4 justify-around mb-8">
          <TouchableOpacity className="items-center px-4" onPress={() => navigation.navigate('Orders')}>
            <View className="mb-2">
              <Icon name="FileText" size={24} color="#ffffff" />
            </View>
            <Text className="text-white text-xs font-medium">我的订单</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center px-4" onPress={() => navigation.navigate('ProfilePayment')}>
            <View className="mb-2">
              <Icon name="CreditCard" size={24} color="#ffffff" />
            </View>
            <Text className="text-white text-xs font-medium">支付方式</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center px-4" onPress={() => navigation.navigate('ProfileAddress')}>
            <View className="mb-2">
              <Icon name="MapPin" size={24} color="#ffffff" />
            </View>
            <Text className="text-white text-xs font-medium">收货地址</Text>
          </TouchableOpacity>
        </View>

        {/* Menu List */}
        <View className="space-y-2">
          <MenuItem icon="User" label="个人信息" onPress={() => navigation.navigate('ProfileUserInfo')} />
          <MenuItem icon="Settings" label="设置" onPress={() => navigation.navigate('ProfileSettings')} />
          <MenuItem icon="HelpCircle" label="帮助与支持" onPress={() => navigation.navigate('ProfileHelp')} />
          <MenuItem icon="Layout" label="UI 组件演示" onPress={() => navigation.navigate('UIDemo')} />
          <MenuItem icon="LogOut" label="退出登录" onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem = ({ icon, label, onPress, rightElement }: any) => (
  <TouchableOpacity 
    className="flex-row items-center py-4" 
    onPress={onPress}
  >
    <View className="w-12 h-12 bg-gray-100 rounded-2xl items-center justify-center mr-4">
      <Icon name={icon} size={24} color="#333" />
    </View>
    <Text className="flex-1 text-lg text-gray-800 font-medium">{label}</Text>
    {rightElement && <View>{rightElement}</View>}
    <Icon name="ChevronRight" size={20} color="#ccc" />
  </TouchableOpacity>
);

export default ProfileScreen;
