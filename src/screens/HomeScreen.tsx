import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProductStore } from '../store/useProductStore';
import FeedCard from '../components/FeedCard';
import { SearchBar, useToast, Header, Icon, Banner } from '../ui';

const CATEGORIES = [
  { id: 'all', label: '猜你喜欢' },
  { id: 'electronics', label: '数码' },
  { id: 'jewelery', label: '首饰' },
  { id: "men's clothing", label: '男装' },
  { id: "women's clothing", label: '女装' },
];

const HomeScreen = () => {
  const { products, isLoading, fetchProducts } = useProductStore();
  const toast = useToast();
  const [keyword, setKeyword] = React.useState('');
  const [activeTabId, setActiveTabId] = React.useState('all');

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const bannerImages = React.useMemo(() => {
    return products.slice(0, 5).map(p => p.image);
  }, [products]);

  const filteredProducts = React.useMemo(() => {
    let result = products;
    
    if (activeTabId !== 'all') {
      result = result.filter(p => p.category === activeTabId);
    }

    if (keyword) {
      const kw = keyword.trim().toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(kw));
    }
    return result;
  }, [products, keyword, activeTabId]);

  // Split into two columns for masonry effect
  const [col1, col2] = React.useMemo(() => {
    const c1: typeof products = [];
    const c2: typeof products = [];
    filteredProducts.forEach((p, i) => {
      if (i % 2 === 0) c1.push(p);
      else c2.push(p);
    });
    return [c1, c2];
  }, [filteredProducts]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Header title="首页" showBack={false} />
      
      <ScrollView stickyHeaderIndices={[2]} showsVerticalScrollIndicator={false}>
        {/* Search Area */}
        <View className="bg-white px-4 pb-2">
          <SearchBar
            value={keyword}
            onChange={setKeyword}
            onSubmit={() => toast.show(keyword ? `搜索：${keyword}` : '请输入关键词')}
          />
        </View>

        {/* Banner */}
        <View className="bg-white pb-4">
          <Banner images={bannerImages} height={160} />
        </View>

        {/* Tabs - Sticky Header */}
        <View className="bg-white pb-2">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4" contentContainerStyle={{ paddingRight: 20 }}>
            {CATEGORIES.map((cat) => {
              const active = cat.id === activeTabId;
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setActiveTabId(cat.id)}
                  className={`mr-3 px-4 py-1.5 rounded-full ${active ? 'bg-primary' : 'bg-gray-100'}`}
                  activeOpacity={0.8}
                >
                  <Text className={`font-bold text-sm ${active ? 'text-white' : 'text-gray-600'}`}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity className="ml-1 w-8 h-8 items-center justify-center bg-gray-100 rounded-full">
              <Icon name="Plus" size={16} color="#666" />
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Masonry Feed */}
        <View className="bg-gray-50 flex-row p-2 min-h-screen">
          <View className="flex-1 mr-1.5">
            {col1.map((item) => (
              <FeedCard 
                key={item.id} 
                product={item} 
                height={150 + (item.id % 3) * 40} // Pseudo-random height: 150, 190, 230
              />
            ))}
          </View>
          <View className="flex-1 ml-1.5">
            {col2.map((item) => (
              <FeedCard 
                key={item.id} 
                product={item} 
                height={150 + ((item.id + 1) % 3) * 40} 
              />
            ))}
          </View>
        </View>
        
        {filteredProducts.length === 0 && (
          <View className="py-20 items-center bg-gray-50">
            <Text className="text-gray-500">暂无相关商品</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
