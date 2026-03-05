import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Product } from '../types';
import { useNavigation } from '@react-navigation/native';
import { nativeShadowClass, webShadowStyle } from '../utils/webStyle';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity 
      className={`bg-white rounded-lg m-2 p-3 w-[45%] ${nativeShadowClass('sm')}`}
      style={webShadowStyle('sm')}
      onPress={() => navigation.navigate('ProductDetail', { id: product.id })}
    >
      <Image 
        source={{ uri: product.image }} 
        className="w-full h-32 rounded-md mb-2" 
        resizeMode="contain"
      />
      <Text className="text-sm font-medium text-gray-800" numberOfLines={2}>
        {product.title}
      </Text>
      <Text className="text-red-500 font-bold mt-1">
        ¥{product.price}
      </Text>
    </TouchableOpacity>
  );
};

export default ProductCard;
