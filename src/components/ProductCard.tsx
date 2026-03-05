import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Product } from '../types';
import { useNavigation } from '@react-navigation/native';
import { Card, Icon, Price, Rating, Image } from '../ui';

interface Props {
  product: Product;
  onQuickAdd?: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onQuickAdd }) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { id: product.id })} activeOpacity={0.85}>
      <Card className="p-3">
        <View className="relative">
          <Image
            source={{ uri: product.image }}
            className="w-full h-32 rounded-lg bg-gray-50"
            resizeMode="contain"
          />
          {onQuickAdd ? (
            <TouchableOpacity
              onPress={() => onQuickAdd(product)}
              className="absolute bottom-2 right-2 w-9 h-9 bg-red-500 rounded-xl items-center justify-center"
              activeOpacity={0.85}
            >
              <Icon name="Plus" size={18} color="#fff" />
            </TouchableOpacity>
          ) : null}
        </View>
        <Text className="text-sm font-medium text-gray-900 mt-2" numberOfLines={2}>
          {product.title}
        </Text>
        <View className="mt-2 flex-row items-center justify-between">
          <Price value={product.price} />
          <Rating value={product.rating.rate} />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default ProductCard;
