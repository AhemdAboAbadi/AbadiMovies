import {View, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../theme';

const Loader = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.gray3} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray,
  },
});
