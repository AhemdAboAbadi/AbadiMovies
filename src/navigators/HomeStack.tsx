import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, MovieDetailsScreen} from '../screens';
import {BackArrowIcon} from '../assets/icons';
import {colors} from '../theme';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  const {goBack} = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        options={{
          title: 'Details',
          headerTitleAlign: 'center',
          headerLeft: () => <BackArrowIcon onPress={goBack} />,
          headerStyle: {backgroundColor: colors.gray},
          headerTintColor: colors.white,
        }}
        name="MovieDetails"
        component={MovieDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
