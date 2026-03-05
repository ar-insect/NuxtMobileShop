import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { useProductStore } from '../store/useProductStore';
import ProductCard from '../components/ProductCard';
import { nativeShadowClass, webShadowStyle } from '../utils/webStyle';

const HomeScreen = () => {
  const { products, isLoading, fetchProducts } = useProductStore();

  React.useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className={`p-4 bg-white ${nativeShadowClass('sm')}`} style={webShadowStyle('sm')}>
        <Text className="text-xl font-bold text-center text-gray-800">NuxtShop Mobile</Text>
      </View>
      
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Hero Section Placeholder */}
        <View className="h-40 bg-blue-100 m-4 rounded-xl justify-center items-center">
          <Text className="text-blue-800 text-lg font-bold">New Arrivals</Text>
        </View>

        <View className="px-4 mb-2">
          <Text className="text-lg font-bold text-gray-800">Featured Products</Text>
        </View>

        <View className="flex-row flex-wrap justify-between px-2">
          {Array.isArray(products) && products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
