import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useProductStore } from '../store/useProductStore';
import { useCartStore } from '../store/useCartStore';
import { nativeShadowClass, webShadowStyle } from '../utils/webStyle';

const ProductDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { id } = route.params;
  const { getProductById } = useProductStore();
  const { addToCart } = useCartStore();

  const product = getProductById(id);

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Product not found</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} className="mt-4 p-2 bg-blue-500 rounded">
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAddToCart = async () => {
    await addToCart(product);
    Alert.alert('Success', 'Added to cart', [
      { text: 'Continue Shopping' },
      { text: 'Go to Cart', onPress: () => navigation.navigate('Cart') }
    ]);
  };

  return (
    <View className="flex-1 bg-white relative">
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        className="absolute top-12 left-4 z-10 bg-white/80 p-2 rounded-full shadow-sm"
        style={webShadowStyle('sm')}
      >
        <Text className="text-xl font-bold">←</Text>
      </TouchableOpacity>

      <ScrollView>
        <Image 
          source={{ uri: product.image }} 
          className="w-full h-80 bg-gray-100" 
          resizeMode="contain"
        />
        
        <View className="p-4 space-y-3">
          <Text className="text-2xl font-bold text-gray-900">{product.title}</Text>
          <Text className="text-xl font-bold text-red-600">¥{product.price}</Text>
          
          <View className="flex-row items-center">
            <Text className="text-yellow-500 mr-1">★</Text>
            <Text className="text-gray-600">
              {product.rating.rate} ({product.rating.count} reviews)
            </Text>
          </View>
          
          <View className="border-t border-gray-200 my-2 pt-2">
            <Text className="text-gray-500 uppercase text-xs font-bold mb-1">Description</Text>
            <Text className="text-gray-700 leading-6">{product.description}</Text>
          </View>
        </View>
      </ScrollView>

      <View
        className={`p-4 border-t border-gray-100 bg-white ${nativeShadowClass('lg')}`}
        style={webShadowStyle('lg')}
      >
        <TouchableOpacity 
          className={`bg-blue-600 p-4 rounded-xl items-center ${nativeShadowClass('md')}`}
          style={webShadowStyle('md')}
          onPress={handleAddToCart}
        >
          <Text className="text-white font-bold text-lg">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailScreen;
