import React from 'react';
import { Text as RNText, StyleProp, TextStyle, TextProps } from 'react-native';

import { Colors } from 'src/constants';

export enum TextType {
  REGULAR = 'Poppins-Regular',
  SEMIBOLD = 'Poppins-SemiBold',
}

interface Props extends TextProps {
  style?: StyleProp<TextStyle>;
  type?: TextType;
  children: string | string[];
  size?: number;
  color?: string;
  center?: boolean;
  features?: TextProps;
}

export const Text: React.FC<Props> = ({
  size,
  center,
  style,
  children,
  color = Colors.white,
  type = TextType.REGULAR,
  ...props
}: Props) => {
  let styles: StyleProp<TextStyle> = {};

  if (size) {
    styles.fontSize = size;
  }
  if (color) {
    styles.color = color;
  }

  if (center) {
    styles.textAlign = 'center';
  }

  return (
    <RNText
      style={[
        {
          fontFamily: type,
        },
        styles,
        style,
      ]}
      {...props}>
      {children}
    </RNText>
  );
};
