import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, Icon } from '../ui';

const FAQ_LIST = [
  { id: 1, q: '如何退换货？', a: '请在订单详情页申请售后，或联系客服处理。' },
  { id: 2, q: '发货时间是多久？', a: '一般下单后24小时内发货，特殊商品以详情页为准。' },
  { id: 3, q: '支持哪些支付方式？', a: '支持微信支付、支付宝、银行卡等多种支付方式。' },
  { id: 4, q: '如何修改收货地址？', a: '在“我的-收货地址”中可以管理您的地址。' },
];

export default function HelpScreen() {
  const [expandedId, setExpandedId] = React.useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleContact = () => {
    Linking.openURL('tel:400-888-8888').catch(() => {});
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Header title="帮助与支持" />
      <ScrollView className="flex-1 bg-gray-50">
        <View className="px-4 py-4">
           <Text className="text-lg font-bold text-gray-900 mb-4">常见问题</Text>
           {FAQ_LIST.map((item) => (
             <View key={item.id} className="bg-white rounded-lg mb-3 overflow-hidden">
               <TouchableOpacity 
                 className="flex-row items-center justify-between p-4"
                 onPress={() => toggleExpand(item.id)}
                 activeOpacity={0.7}
               >
                 <Text className="text-base font-medium text-gray-800 flex-1">{item.q}</Text>
                 <Icon name={expandedId === item.id ? 'ChevronUp' : 'ChevronDown'} size={20} color="#999" />
               </TouchableOpacity>
               {expandedId === item.id && (
                 <View className="px-4 pb-4 bg-gray-50/50">
                   <Text className="text-gray-600 leading-6">{item.a}</Text>
                 </View>
               )}
             </View>
           ))}
        </View>

        <View className="px-4 mt-4 mb-8">
           <Text className="text-lg font-bold text-gray-900 mb-4">联系我们</Text>
           <TouchableOpacity 
             className="bg-white p-4 rounded-lg flex-row items-center"
             onPress={handleContact}
           >
              <View className="w-10 h-10 bg-pink-50 rounded-full items-center justify-center mr-3">
                 <Icon name="Phone" size={20} color="#ec4899" />
              </View>
              <View>
                 <Text className="text-base font-bold text-gray-900">客服热线</Text>
                 <Text className="text-gray-500 text-sm">400-888-8888 (9:00-18:00)</Text>
              </View>
           </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
