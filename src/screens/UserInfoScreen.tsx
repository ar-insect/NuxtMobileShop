import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Header, Image, Button, useToast, Icon } from '../ui';
import { useAuthStore } from '../store/useAuthStore';

const InputField = ({ label, value, onChangeText, editable = true, keyboardType }: any) => (
  <View className="mb-4">
    <Text className="text-gray-600 mb-2 font-medium">{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      editable={editable}
      keyboardType={keyboardType}
      className={`bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 ${!editable ? 'bg-gray-100 opacity-60' : ''}`}
    />
  </View>
);

export default function UserInfoScreen() {
  const { user, updateUser } = useAuthStore();
  const navigation = useNavigation();
  const toast = useToast();

  const [name, setName] = useState(user?.name || 'User Name');
  const [email, setEmail] = useState(user?.email || '');
  const [username] = useState(user?.username || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name || !email) {
      toast.show('请填写完整信息');
      return;
    }

    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      updateUser({
        name,
        email,
        phone
      });
      setLoading(false);
      toast.show('保存成功');
      navigation.goBack();
    }, 1000);
  };

  if (!user) return null;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Header title="个人信息" />
      <ScrollView className="flex-1 px-4 py-6">
        <View className="items-center mb-8">
           <View className="w-24 h-24 bg-primary rounded-[30px] items-center justify-center mb-4 overflow-hidden relative">
             <Image 
                source={{ uri: 'https://ui-avatars.com/api/?name=' + user.username + '&background=random' }} 
                className="w-full h-full"
                resizeMode="cover"
              />
              <TouchableOpacity className="absolute bottom-0 right-0 left-0 bg-black/30 h-8 items-center justify-center">
                 <Icon name="Camera" size={16} color="#fff" />
              </TouchableOpacity>
          </View>
          <Text className="text-gray-500 text-sm">点击头像修改</Text>
        </View>

        <View>
           <InputField label="昵称" value={name} onChangeText={setName} />
           <InputField label="用户名" value={username} editable={false} />
           <InputField label="邮箱" value={email} onChangeText={setEmail} keyboardType="email-address" />
           <InputField label="手机号" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        </View>

        <View className="mt-8">
           <Button title="保存修改" onPress={handleSave} loading={loading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
