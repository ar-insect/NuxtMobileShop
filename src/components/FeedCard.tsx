import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from '../ui';
import { Product } from '../types';
import { useNavigation } from '@react-navigation/native';

interface Props {
  product: Product;
  height?: number; // Optional override for image height to simulate masonry
}

const FeedCard: React.FC<Props> = ({ product, height = 180 }) => {
  const navigation = useNavigation<any>();

  // Mock "Xianyu" style tags/attributes based on category
  const isClothing = product.category.includes('clothing');
  const tag = isClothing ? '包邮' : '自用';
  const subInfo = isClothing ? '全新 | 吊牌齐全' : '95新 | 功能正常';

  return (
    <TouchableOpacity 
      className="bg-white rounded-xl mb-3 overflow-hidden"
      onPress={() => navigation.navigate('ProductDetail', { id: product.id })}
      activeOpacity={0.9}
    >
      <Image 
        source={{ uri: product.image }} 
        style={{ width: '100%', height: height }}
        resizeMode="cover"
        className="bg-gray-100"
      />
      
      <View className="p-3">
        <Text numberOfLines={2} className="text-sm text-gray-900 font-bold leading-5">
          <Text className="bg-yellow-300 text-xs px-1 py-0.5 rounded mr-1 overflow-hidden">
             {` ${tag} `}
          </Text>
          {` ${product.title}`}
        </Text>

        <View className="mt-2 flex-row items-baseline">
          <Text className="text-red-500 font-bold text-xs">¥</Text>
          <Text className="text-red-500 font-bold text-lg mr-2">{Math.floor(product.price)}</Text>
          <Text className="text-gray-400 text-xs">{product.rating.count}人想要</Text>
        </View>

        <View className="mt-1 flex-row items-center">
           <Image 
             source={{ uri: `https://ui-avatars.com/api/?name=${product.category.substring(0,2)}&background=random&size=16` }}
             className="w-4 h-4 rounded-full mr-1"
           />
           <Text className="text-gray-400 text-xs">{subInfo}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeedCard;
