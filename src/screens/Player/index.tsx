import React, { useState } from 'react';
import { Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from 'src/constants';

const { width, height } = Dimensions.get('window');
console.log(height);

interface Props {}

export const Player: React.FC<Props> = () => {
  const { top } = useSafeAreaInsets();
  const [isOpen, setOpen] = useState<boolean>(false);

  const onPress = () => {
    setOpen(!isOpen);
  };

  const translateY = isOpen ? 0 : height + top - 100;
  const paddingTop = isOpen ? top : 20;
  const borderTopWidth = isOpen ? 0 : 2;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { transform: [{ translateY }], paddingTop, borderTopWidth },
      ]}>
      <Text style={styles.text}>Player area</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: Colors.primary,
    backgroundColor: Colors.background,
  },

  text: {
    fontSize: 25,
    color: Colors.white,
    textAlign: 'center',
  },
});
