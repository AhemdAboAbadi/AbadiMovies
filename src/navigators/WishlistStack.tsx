import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Wishlist} from '../screens';
import {BackArrowIcon} from '../assets/icons';
import {colors} from '../theme';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const WishlistStack = () => {
  const {goBack} = useNavigation();
  return (
    <Stack.Navigator initialRouteName="Wishlist">
      <Stack.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          title: 'Watch list',
          headerTitleAlign: 'center',
          headerLeft: () => <BackArrowIcon onPress={goBack} />,
          headerStyle: {backgroundColor: colors.gray},
          headerTintColor: colors.white,
        }}
      />
    </Stack.Navigator>
  );
};

export default WishlistStack;
