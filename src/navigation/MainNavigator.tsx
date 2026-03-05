import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import LoginScreen from '../screens/LoginScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import OrdersScreen from '../screens/OrdersScreen';
import UIDemoScreen from '../screens/UIDemoScreen';
import UserInfoScreen from '../screens/UserInfoScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddressScreen from '../screens/AddressScreen';
import PaymentScreen from '../screens/PaymentScreen';
import HelpScreen from '../screens/HelpScreen';
import { useAuthStore } from '../store/useAuthStore';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  // Navigation setup
  const { loadUser } = useAuthStore();

  React.useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Tabs" 
          component={TabNavigator} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ presentation: 'modal' }} 
        />
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Orders" 
          component={OrdersScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="UIDemo" 
          component={UIDemoScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ProfileUserInfo" 
          component={UserInfoScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ProfileSettings" 
          component={SettingsScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ProfileAddress" 
          component={AddressScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ProfilePayment" 
          component={PaymentScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ProfileHelp" 
          component={HelpScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
