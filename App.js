import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native"



import { AddAnEmployeeScreen, AddItem, AdministrationScreen, CartScreen, CViewBehaviorScreen, EditItem,
EmployeeViewListScreen, EViewBehaviorScreen, MenuScreen, SelectedItemScreen, SelectedProfileScreen, SignInScreen } from './src/screens'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator
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
