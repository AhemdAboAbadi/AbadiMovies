import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import {HomeIcon, SearchIcon, BookmarkIcon} from '../assets/icons';
import {colors} from '../theme';
import {View} from 'react-native';
import WishlistStack from './WishlistStack';
import SearchStack from './SearchStack';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.gray,
          borderTopWidth: 1,
          borderTopColor: colors.primaryBlueColor,
        },
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <HomeIcon color={focused ? colors.activeTab : colors.gray3} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          headerShown: false,
          title: 'Search',
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <SearchIcon color={focused ? colors.activeTab : colors.gray3} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="WishlistStack"
        component={WishlistStack}
        options={{
          headerShown: false,
          title: 'Watch list',
          tabBarIcon: ({focused}) => (
            <BookmarkIcon color={focused ? colors.activeTab : colors.gray3} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
