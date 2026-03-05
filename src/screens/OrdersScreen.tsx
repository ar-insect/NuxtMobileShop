import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { Order } from '../types';
import api from '../utils/api';
import { nativeShadowClass, webShadowStyle } from '../utils/webStyle';

const OrdersScreen = () => {
  const { user } = useAuthStore();
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const response = await api.get<Order[]>('/orders');
        setOrders(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [user]);

  const renderItem = ({ item }: { item: Order }) => (
    <View className={`bg-white p-4 mb-2 rounded-lg ${nativeShadowClass('sm')}`} style={webShadowStyle('sm')}>
      <View className="flex-row justify-between mb-2">
        <Text className="font-bold text-gray-800">Order #{item.id}</Text>
        <Text className={`font-medium ${
          item.status === 'delivered' ? 'text-green-600' : 'text-orange-500'
        }`}>{item.status.toUpperCase()}</Text>
      </View>
      <Text className="text-gray-500 text-xs mb-2">{new Date(item.date).toLocaleDateString()}</Text>
      
      <View className="border-t border-gray-100 pt-2">
        <Text className="text-gray-600 mb-1">{item.items.length} Items</Text>
        <Text className="text-right font-bold text-lg">Total: ¥{item.total.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className={`p-4 bg-white mb-2 ${nativeShadowClass('sm')}`} style={webShadowStyle('sm')}>
        <Text className="text-xl font-bold text-center">My Orders</Text>
      </View>
      
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Text>Loading orders...</Text>
        </View>
      ) : orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16 }}
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">No orders found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrdersScreen;
