import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SearchScreen} from '../screens';
import {BackArrowIcon} from '../assets/icons';
import {colors} from '../theme';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  const {goBack} = useNavigation();
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
          headerTitleAlign: 'center',
          headerLeft: () => <BackArrowIcon onPress={goBack} />,
          headerStyle: {backgroundColor: colors.gray},
          headerTintColor: colors.white,
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
