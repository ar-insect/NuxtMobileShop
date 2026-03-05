import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '../store/useCartStore';
import { useNavigation } from '@react-navigation/native';
import { CartItem } from '../types';
import { nativeShadowClass, webShadowStyle } from '../utils/webStyle';
import { Header, Image } from '../ui';

const CartScreen = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const navigation = useNavigation<any>();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    Alert.alert('结算', '下单成功！', [
      { 
        text: '确定', 
        onPress: () => {
          clearCart();
          navigation.navigate('Orders');
        } 
      }
    ]);
  };

  const renderItem = (item: CartItem) => (
    <View
      key={item.id}
      className={`flex-row bg-white p-3 mb-2 rounded-lg items-center ${nativeShadowClass('sm')}`}
      style={webShadowStyle('sm')}
    >
      <Image source={{ uri: item.image }} className="w-20 h-20 bg-gray-50 rounded" resizeMode="contain" />
      
      <View className="flex-1 ml-3 space-y-1">
        <Text numberOfLines={1} className="font-medium text-gray-900">{item.title}</Text>
        <Text className="text-red-600 font-bold">¥{item.price}</Text>
        
        <View className="flex-row items-center mt-2">
          <TouchableOpacity 
            className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Text className="text-gray-600 font-bold">-</Text>
          </TouchableOpacity>
          
          <Text className="mx-3 font-medium text-gray-800">{item.quantity}</Text>
          
          <TouchableOpacity 
            className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Text className="text-gray-600 font-bold">+</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="ml-auto bg-red-50 p-2 rounded"
            onPress={() => removeFromCart(item.id)}
          >
            <Text className="text-red-500 text-xs">移除</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Header title={`我的购物车 (${cartItems.length})`} showBack={false} />

      <ScrollView className="flex-1 p-4 bg-gray-50">
        {cartItems.length > 0 ? (
          cartItems.map(renderItem)
        ) : (
          <View className="items-center justify-center py-20">
            <Text className="text-gray-400 text-lg">购物车为空</Text>
            <TouchableOpacity 
              className="mt-4 bg-blue-500 px-6 py-2 rounded-full"
              onPress={() => navigation.navigate('Home')}
            >
              <Text className="text-white font-bold">去购物</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <View
          className={`p-4 bg-white border-t border-gray-100 ${nativeShadowClass('lg')}`}
          style={webShadowStyle('lg')}
        >
          <View className="flex-row justify-between mb-4">
            <Text className="text-gray-600 text-lg">合计:</Text>
            <Text className="text-red-600 text-2xl font-bold">¥{total.toFixed(2)}</Text>
          </View>
          
          <TouchableOpacity 
            className={`bg-blue-600 py-4 rounded-xl items-center ${nativeShadowClass('md')}`}
            style={webShadowStyle('md')}
            onPress={handleCheckout}
          >
            <Text className="text-white font-bold text-lg">去结算</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
