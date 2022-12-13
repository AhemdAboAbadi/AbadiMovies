import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabs from './BottomTabs';
import {MainProvider} from '../context/mainContext';

const RootNavigator = () => {
  return (
    <MainProvider>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </MainProvider>
  );
};

export default RootNavigator;
