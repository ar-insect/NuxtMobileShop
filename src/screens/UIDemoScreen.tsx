import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Banner, Badge, Button, Card, Price, Rating, SearchBar, Stepper, useToast, Header } from '../ui';

const demoImages = [
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1611078489935-0cb964de46f9?auto=format&fit=crop&w=1200&q=80',
];

export default function UIDemoScreen() {
  const [keyword, setKeyword] = React.useState('');
  const [qty, setQty] = React.useState(1);
  const toast = useToast();

  return (
    <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ paddingBottom: 24 }}>
      <Header title="UI 组件演示" />

      <View className="px-4 pt-4 space-y-4">
        <SearchBar value={keyword} onChange={setKeyword} onSubmit={() => toast.show(`搜索：${keyword}`)} />

        <Banner images={demoImages} height={180} />

        <Card className="p-4 mt-2">
          <View className="flex-row items-center mb-2">
            <Badge text="热卖" tone="danger" />
            <Text className="ml-2 font-medium text-gray-800">苹果 AirPods Pro 2</Text>
          </View>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1585386959984-a41552231659?auto=format&fit=crop&w=1200&q=80' }}
            className="w-full h-44 rounded-lg bg-gray-100"
            resizeMode="cover"
          />
          <View className="mt-3">
            <Rating value={4.6} count={1287} />
            <Price value={1899} original={1999} large />
          </View>
          <View className="mt-3 flex-row items-center justify-between">
            <Stepper value={qty} onChange={setQty} />
            <Button title="加入购物车" onPress={() => toast.show(`已加入购物车 x${qty}`)} />
          </View>
        </Card>

        <Card className="p-4">
          <Text className="text-gray-800 font-medium mb-2">按钮样式</Text>
          <View className="flex-row flex-wrap">
            <Button title="主要按钮" className="mr-2 mb-2" />
            <Button title="次要" variant="secondary" className="mr-2 mb-2" />
            <Button title="描边" variant="outline" className="mr-2 mb-2" />
            <Button title="幽灵" variant="ghost" className="mr-2 mb-2" />
            <Button title="危险" variant="danger" className="mr-2 mb-2" />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
