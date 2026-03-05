import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { useProductStore } from '../store/useProductStore';
import ProductCard from '../components/ProductCard';
import { useCartStore } from '../store/useCartStore';
import { Card, Icon, SearchBar, useToast } from '../ui';

const HomeScreen = () => {
  const { products, isLoading, fetchProducts } = useProductStore();
  const { addToCart } = useCartStore();
  const toast = useToast();
  const [keyword, setKeyword] = React.useState('');
  const [category, setCategory] = React.useState('全部');

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const categories = React.useMemo(() => {
    const uniq = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
    return ['全部', ...uniq];
  }, [products]);

  const filteredProducts = React.useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return products.filter((p) => {
      const byCat = category === '全部' || p.category === category;
      const byKw = !kw || p.title.toLowerCase().includes(kw);
      return byCat && byKw;
    });
  }, [products, keyword, category]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const header = (
    <View>
      <View className="bg-white px-4 pt-2 pb-4">
        <View className="flex-row items-center">
          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
            onPress={() => toast.show('菜单')}
            activeOpacity={0.85}
          >
            <Icon name="Menu" size={20} color="#111827" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-base font-bold text-gray-900">首页</Text>
          </View>
          <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
            <Icon name="User" size={18} color="#111827" />
          </View>
        </View>
        <Text className="text-2xl font-bold text-gray-900 mt-3">发现好物</Text>
        <Text className="text-gray-500 mt-1">精选推荐，天天低价</Text>
        <View className="mt-4">
          <SearchBar
            value={keyword}
            onChange={setKeyword}
            onSubmit={() => toast.show(keyword ? `搜索：${keyword}` : '请输入关键词')}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
          {categories.map((c) => {
            const active = c === category;
            return (
              <TouchableOpacity
                key={c}
                onPress={() => setCategory(c)}
                className={`mr-2 px-4 py-2 rounded-full ${active ? 'bg-red-500' : 'bg-gray-100'}`}
                activeOpacity={0.85}
              >
                <Text className={`font-medium ${active ? 'text-white' : 'text-gray-700'}`}>{c}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View className="px-4 mt-4 mb-2 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-gray-900">推荐商品</Text>
        <Text className="text-gray-400 text-xs">{filteredProducts.length} 件</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        ListHeaderComponent={header}
        columnWrapperStyle={{ paddingHorizontal: 12, gap: 12 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={{ flex: 1, marginBottom: 12 }}>
            <ProductCard
              product={item}
              onQuickAdd={async (p) => {
                await addToCart(p);
                toast.show('已加入购物车');
              }}
            />
          </View>
        )}
        ListEmptyComponent={
          <Card className="p-6 mx-4 mt-6 items-center">
            <Text className="text-gray-500">暂无匹配商品</Text>
          </Card>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
