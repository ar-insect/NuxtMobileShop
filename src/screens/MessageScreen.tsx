import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, Image } from '../ui';

const messages = [
  {
    id: '1',
    title: '系统通知',
    content: '您的订单 #123456 已发货，请注意查收。',
    time: '10:30',
    unread: true,
    avatar: 'https://ui-avatars.com/api/?name=System&background=ff4757&color=fff',
  },
  {
    id: '2',
    title: '优惠活动',
    content: '618大促即将开始，全场5折起！',
    time: '昨天',
    unread: false,
    avatar: 'https://ui-avatars.com/api/?name=Promo&background=ffc107&color=fff',
  },
  {
    id: '3',
    title: '物流助手',
    content: '您的包裹已到达配送站，配送员正在派送中。',
    time: '昨天',
    unread: false,
    avatar: 'https://ui-avatars.com/api/?name=Logistics&background=2196f3&color=fff',
  },
  {
    id: '4',
    title: '客服小美',
    content: '亲，您咨询的商品有货了哦~',
    time: '前天',
    unread: true,
    avatar: 'https://ui-avatars.com/api/?name=Service&background=4caf50&color=fff',
  },
];

const MessageScreen = () => {
  const renderItem = ({ item }: { item: typeof messages[0] }) => (
    <TouchableOpacity className="flex-row items-center p-4 bg-white border-b border-gray-100">
      <View className="relative">
        <Image 
          source={{ uri: item.avatar }} 
          className="w-12 h-12 rounded-full"
        />
        {item.unread && (
          <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white" />
        )}
      </View>
      
      <View className="flex-1 ml-3">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-base font-bold text-gray-900">{item.title}</Text>
          <Text className="text-xs text-gray-400">{item.time}</Text>
        </View>
        <Text className="text-gray-500 text-sm" numberOfLines={1}>
          {item.content}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Header title="消息中心" showBack={false} />
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        className="bg-gray-50 flex-1"
      />
    </SafeAreaView>
  );
};

export default MessageScreen;
