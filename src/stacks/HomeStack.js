import React from 'react';
import Home from '../screens/Home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Standings from '../screens/Standings';
import Calendar from '../screens/Calendar';
import Statistics from '../screens/Statistics';
const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Home} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="poll" color={color} size={26} />
        )}} />
      <Tab.Screen name="Standings" component={Standings} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="trending-up" color={color} size={26} />
        ),
      }} />
      <Tab.Screen name="Statistics" component={Statistics} options={{
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="chart-bar" color={color} size={26} />
            ),
      }} />
      <Tab.Screen name="Calendar" component={Calendar} options={{
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="calendar" color={color} size={26} />
            ),
            tabBarBadge: 1
      }} />
    </Tab.Navigator>
  );
}