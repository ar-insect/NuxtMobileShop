import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useProductStore } from '../store/useProductStore';
import { useCartStore } from '../store/useCartStore';
import { Badge, Button, Card, Header, Icon, Price, Rating, Stepper, useToast } from '../ui';

const ProductDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { id } = route.params;
  const { products, isLoading, fetchProducts, getProductById } = useProductStore();
  const { addToCart } = useCartStore();
  const toast = useToast();
  const [qty, setQty] = React.useState(1);
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  const product = getProductById(id);

  const related = React.useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 10);
  }, [products, product]);

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <Header title="商品详情" />
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-gray-600">{isLoading ? '加载中...' : '未找到商品'}</Text>
          <View className="mt-4">
            <Button title="返回" variant="outline" onPress={() => navigation.goBack()} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = async () => {
    for (let i = 0; i < qty; i++) {
      await addToCart(product);
    }
    toast.show(`已加入购物车 x${qty}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header
        title="商品详情"
        right={
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            className="w-10 h-10 rounded-full items-center justify-center"
            activeOpacity={0.85}
          >
            <Icon name="ShoppingCart" size={20} color="#111827" />
          </TouchableOpacity>
        }
      />

      <View className="flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 110 }}>
          <View className="bg-rose-50">
            <View className="px-4 py-6">
              <Image
                source={{ uri: product.image }}
                className="w-full h-64 bg-transparent"
                resizeMode="contain"
              />
            </View>
          </View>

          <View className="px-4 -mt-8">
            <Card className="p-4">
              <View className="flex-row items-start justify-between">
                <View className="flex-1 pr-3">
                  <Text className="text-xl font-bold text-gray-900" numberOfLines={2}>
                    {product.title}
                  </Text>
                  <View className="mt-2 flex-row items-center">
                    <Badge text="现货" tone="success" />
                    <View className="ml-2">
                      <Rating value={product.rating.rate} count={product.rating.count} />
                    </View>
                  </View>
                </View>
                <Price value={product.price} large />
              </View>

              <View className="mt-4 flex-row items-center justify-between">
                <Text className="text-gray-700 font-medium">数量</Text>
                <Stepper value={qty} onChange={setQty} min={1} max={99} />
              </View>
            </Card>
          </View>

          <View className="px-4 mt-4">
            <Card className="p-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-bold text-gray-900">详情</Text>
                <TouchableOpacity onPress={() => setExpanded((v) => !v)} activeOpacity={0.85}>
                  <Text className="text-red-500 font-medium">{expanded ? '收起' : '展开'}</Text>
                </TouchableOpacity>
              </View>
              <Text className="text-gray-700 leading-6 mt-2" numberOfLines={expanded ? undefined : 3}>
                {product.description}
              </Text>
            </Card>
          </View>

          {related.length > 0 ? (
            <View className="px-4 mt-4">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-base font-bold text-gray-900">同类推荐</Text>
                <Text className="text-gray-400 text-xs">{related.length} 件</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {related.map((p) => (
                  <TouchableOpacity
                    key={p.id}
                    className="mr-3"
                    onPress={() => navigation.push?.('ProductDetail', { id: p.id }) ?? navigation.navigate('ProductDetail', { id: p.id })}
                    activeOpacity={0.85}
                  >
                    <Card className="p-3 w-36">
                      <Image source={{ uri: p.image }} className="w-full h-20 bg-gray-50 rounded-lg" resizeMode="contain" />
                      <Text className="text-xs font-medium text-gray-900 mt-2" numberOfLines={2}>
                        {p.title}
                      </Text>
                      <Price value={p.price} />
                    </Card>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ) : null}
        </ScrollView>

        <View className="absolute left-0 right-0 bottom-0 bg-white border-t border-gray-100 px-4 py-3">
          <Button title="加入购物车" variant="danger" onPress={handleAddToCart} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;
