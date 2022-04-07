import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native"
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import { AddAnEmployeeScreen, AddItem, AdministrationScreen, CartScreen, CViewBehaviorScreen, EditItem,
EmployeeViewListScreen, EViewBehaviorScreen, MenuScreen, SelectedItemScreen, SelectedProfileScreen, SignInScreen } from './src/screens'

const Stack = createNativeStackNavigator();

export default function App() {
  
  let [fontsLoaded] = useFonts({
    'ArimaMadurai-Black': require('./assets/fonts/ArimaMadurai-Black.ttf'),
    'ArimaMadurai-Bold': require('./assets/fonts/ArimaMadurai-Bold.ttf'),
    'ArimaMadurai-ExtraBold': require('./assets/fonts/ArimaMadurai-ExtraBold.ttf'),
    'ArimaMadurai-ExtraLight': require('./assets/fonts/ArimaMadurai-ExtraLight.ttf'),
    'ArimaMadurai-Light': require('./assets/fonts/ArimaMadurai-Light.ttf'),
    'ArimaMadurai-Medium': require('./assets/fonts/ArimaMadurai-Medium.ttf'),
    'ArimaMadurai-Regular': require('./assets/fonts/ArimaMadurai-Regular.ttf'),
    'ArimaMadurai-Thin': require('./assets/fonts/ArimaMadurai-Thin.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
     contentStyle:{
       backgroundColor:'#E6FFFF'
     }
    }} 
      initialRouteName="SignIn"
    >

      <Stack.Screen
        name="AddEmployee"
        component={AddAnEmployeeScreen}
      />
      <Stack.Screen
        name="Administration"
        component={AdministrationScreen}
      />
      <Stack.Screen
        name="SeeEmployees"
        component={EmployeeViewListScreen}
      />


      <Stack.Screen
        name="EViewBehavior"
        component={EViewBehaviorScreen}
      />
      <Stack.Screen
        name="CViewBehavior"
        component={CViewBehaviorScreen}
      />


      <Stack.Screen
        name="Cart"
        component={CartScreen}
      />

      <Stack.Screen
        name="AddItem"
        component={AddItem}
      />
      <Stack.Screen
        name="EditItem"
        component={EditItem}
      />
      <Stack.Screen
        name="SelectedItem"
        component={SelectedItemScreen}
      />
      
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
      />

      <Stack.Screen
        name="SelectedProfile"
        component={SelectedProfileScreen}
      />

      <Stack.Screen 
        name="SignIn" 
        component={SignInScreen} 
      />
      
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
