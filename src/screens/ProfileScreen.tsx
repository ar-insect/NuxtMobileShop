import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Image, Alert } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { user, logout, isLoading } = useAuthStore();
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: logout }
    ]);
  };

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-white p-6">
        <Text className="text-xl font-bold mb-4 text-gray-800">Welcome to NuxtShop</Text>
        <Text className="text-gray-500 mb-8 text-center">Sign in to manage your orders, wishlist, and profile.</Text>
        
        <TouchableOpacity 
          className="bg-blue-600 w-full py-4 rounded-xl items-center"
          onPress={() => navigation.navigate('Login')}
        >
          <Text className="text-white font-bold text-lg">Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        <View className="bg-white p-6 mb-4 items-center border-b border-gray-100">
          <Image 
            source={{ uri: user.avatar }} 
            className="w-24 h-24 rounded-full mb-4 bg-gray-200"
          />
          <Text className="text-xl font-bold text-gray-900">{user.name}</Text>
          <Text className="text-gray-500">@{user.username}</Text>
          <View className="bg-blue-100 px-3 py-1 rounded-full mt-2">
            <Text className="text-blue-800 text-xs font-bold uppercase">{user.role}</Text>
          </View>
        </View>

        <View className="bg-white px-4 py-2 mb-4">
          <TouchableOpacity 
            className="py-4 border-b border-gray-100 flex-row justify-between items-center"
            onPress={() => navigation.navigate('Orders')}
          >
            <Text className="text-lg text-gray-800">My Orders</Text>
            <Text className="text-gray-400">›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="py-4 border-b border-gray-100 flex-row justify-between items-center">
            <Text className="text-lg text-gray-800">Wishlist</Text>
            <Text className="text-gray-400">›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="py-4 border-b border-gray-100 flex-row justify-between items-center">
            <Text className="text-lg text-gray-800">Address Book</Text>
            <Text className="text-gray-400">›</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white px-4 py-2">
          <TouchableOpacity className="py-4 border-b border-gray-100 flex-row justify-between items-center">
            <Text className="text-lg text-gray-800">Settings</Text>
            <Text className="text-gray-400">›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="py-4 flex-row justify-center items-center mt-4"
            onPress={handleLogout}
          >
            <Text className="text-red-500 font-bold text-lg">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
