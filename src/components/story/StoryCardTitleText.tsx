import React, {ReactNode} from 'react';
import {View, Text, TextStyle} from 'react-native';
import colors from '@/theme/colors';

interface Props {
  children: ReactNode;
  fontSize?: number;
}

export function StoryCardTitleText({children, fontSize}: Props): JSX.Element {
  const titleTextStyle: TextStyle = {
    fontSize: fontSize ?? 28,
    fontWeight: '500',
    color: colors.TEXT_WHITE,
  };

  return <Text style={titleTextStyle}>{children}</Text>;
}
