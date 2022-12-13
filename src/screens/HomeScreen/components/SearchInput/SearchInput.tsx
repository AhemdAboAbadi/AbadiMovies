import React from 'react';
import {View, StyleSheet, TextInput, Image, ViewStyle} from 'react-native';
import {colors, spacing} from '../../../../theme';

interface ISearchInput {
  containerStyle?: ViewStyle | ViewStyle[];
  setValue?: (value: any) => void;
  value?: string;
  editable?: boolean;
}

const SearchInput = ({
  containerStyle,
  setValue,
  value,
  editable = true,
}: ISearchInput) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder="Search"
        placeholderTextColor={colors.gray3}
        style={styles.textValue}
        editable={editable}
      />
      <Image source={require('../../../../assets/images/Search.png')} />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray2,
    borderRadius: spacing.normal,
    paddingLeft: spacing.xLarge,
    paddingRight: spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 42,
  },
  textValue: {
    color: colors.white,
  },
});
