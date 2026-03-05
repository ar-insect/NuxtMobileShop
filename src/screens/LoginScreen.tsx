import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = React.useState('admin');
  const [password, setPassword] = React.useState('123456');
  const { login, isLoading, error } = useAuthStore();
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigation.replace('Tabs'); // Navigate to main tabs after login
    } catch {
      Alert.alert('登录失败', error || '请检查用户名和密码');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center px-6">
      <View className="items-center mb-10">
        <Text className="text-3xl font-bold text-blue-600">NuxtShop</Text>
        <Text className="text-gray-500 mt-2">登录以继续</Text>
      </View>

      <View className="space-y-4">
        <View>
          <Text className="text-gray-700 mb-1">用户名</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 bg-gray-50"
            placeholder="请输入用户名"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View>
          <Text className="text-gray-700 mb-1">密码</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 bg-gray-50"
            placeholder="请输入密码"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className={`bg-blue-600 rounded-lg p-4 items-center mt-4 ${isLoading ? 'opacity-70' : ''}`}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text className="text-white font-bold text-lg">
            {isLoading ? '登录中...' : '登录'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
