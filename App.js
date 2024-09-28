import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './screens/HomeScreen'; 
import FavoriteScreen from './screens/FavoriteScreen'; 
import DetailScreen from './screens/DetailScreen'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Detail" component={DetailScreen} options={{ headerTitle: 'Art Tool Detail' }} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Favorites') {
              iconName = 'heart';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStack} 
          options={{ headerShown: false }}
          listeners={({ navigation }) => ({
            tabPress: e => {
              navigation.navigate('Home');
            },
          })}
        />
        <Tab.Screen 
          name="Favorites" 
          component={FavoriteScreen} 
          options={{ unmountOnBlur: true }}  
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

