import React from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, Icon, Button, useToast } from '../ui';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const { logout } = useAuthStore();
  const navigation = useNavigation<any>();
  const toast = useToast();
  const [notifications, setNotifications] = React.useState(true);

  const handleLogout = () => {
    Alert.alert('退出登录', '确定要退出登录吗？', [
      { text: '取消', style: 'cancel' },
      { 
        text: '退出登录', 
        style: 'destructive', 
        onPress: async () => {
          await logout();
          toast.show('已退出登录');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Tabs' }],
          });
        } 
      }
    ]);
  };

  const handleClearCache = () => {
    toast.show('缓存已清除');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Header title="设置" />
      <ScrollView className="flex-1 bg-gray-50">
        <View className="mt-4 bg-white px-4">
           <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
              <Text className="text-base text-gray-900">消息通知</Text>
              <Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: '#ec4899', false: '#e5e7eb' }} />
           </View>
           <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100" onPress={handleClearCache}>
              <Text className="text-base text-gray-900">清除缓存</Text>
              <Text className="text-gray-400">12.5MB</Text>
           </TouchableOpacity>
        </View>

        <View className="mt-4 bg-white px-4">
           <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100">
              <Text className="text-base text-gray-900">用户协议</Text>
              <Icon name="ChevronRight" size={20} color="#ccc" />
           </TouchableOpacity>
           <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100">
              <Text className="text-base text-gray-900">隐私政策</Text>
              <Icon name="ChevronRight" size={20} color="#ccc" />
           </TouchableOpacity>
           <View className="flex-row items-center justify-between py-4">
              <Text className="text-base text-gray-900">关于我们</Text>
              <Text className="text-gray-400">v1.0.0</Text>
           </View>
        </View>

        <View className="mt-8 px-4">
           <Button 
             title="退出登录" 
             variant="outline" 
             onPress={handleLogout} 
             className="border-red-500 bg-white" 
             textStyle={{ color: '#ef4444' }} 
           />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
