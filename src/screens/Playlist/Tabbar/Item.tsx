import React from 'react';
import { View, StyleSheet } from 'react-native';

import { IPlaylist } from 'src/interfaces';
import { Text, TextType } from 'src/components';

interface Props extends IPlaylist {
  isActive: boolean;
}

export const Item: React.FC<Props> = ({ title, isActive }: Props) => {
  return (
    <View style={styles.container}>
      <Text size={18} type={isActive ? TextType.SEMIBOLD : TextType.REGULAR}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 25,
  },
});
