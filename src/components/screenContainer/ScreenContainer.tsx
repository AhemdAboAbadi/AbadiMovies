import React, {ReactNode} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {colors, spacing} from '../../theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IScreenContainer {
  children: ReactNode;
  scrollable?: boolean;
  withPadding?: boolean;
}

const ScreenContainer = ({
  children,
  scrollable = false,
  withPadding = true,
}: IScreenContainer) => {
  const {top} = useSafeAreaInsets();
  return scrollable ? (
    <ScrollView
      contentContainerStyle={{flex: 1}}
      style={[
        styles.scrollContainer,
        {
          paddingTop: top,
          paddingHorizontal: withPadding ? spacing.xLarge : undefined,
        },
      ]}>
      {children}
    </ScrollView>
  ) : (
    <View
      style={[
        styles.container,
        {
          paddingTop: top,
          paddingHorizontal: withPadding ? spacing.xLarge : undefined,
        },
      ]}>
      {children}
    </View>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: colors.gray,
  },
  container: {
    flex: 1,
    backgroundColor: colors.gray,
  },
});
