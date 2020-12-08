import React from 'react';
import { Text as RNText, TextStyle, TextProps } from 'react-native';

import { Colors } from 'src/constants';

export enum TextType {
  REGULAR = 'Poppins-Regular',
  SEMIBOLD = 'Poppins-SemiBold',
}

interface Props {
  style?: TextStyle;
  type?: TextType;
  children: string | string[];
  size?: number;
  color?: string;
  center?: boolean;
  features?: TextProps;
}

type ShortStyles = {
  fontSize?: number;
  color?: string;
  textAlign?: string;
};

export const Text: React.FC<Props> = ({
  size,
  center,
  style,
  children,
  color = Colors.white,
  type = TextType.REGULAR,
  features = {},
}: Props) => {
  let styles: ShortStyles = {};

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
      style={{
        fontFamily: type,
        ...styles,
        ...style,
      }}
      {...features}>
      {children}
    </RNText>
  );
};
