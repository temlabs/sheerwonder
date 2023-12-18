import React, {ReactNode} from 'react';
import {View, Text, TextStyle} from 'react-native';
import colors from '@/theme/colors';

interface Props {
  children: ReactNode;
  fontSize?: number;
}

export function StoryCardSubtitleText({
  children,
  fontSize,
}: Props): JSX.Element {
  const subtitleTextStyle: TextStyle = {
    fontSize: fontSize ?? 18,
    color: colors.TEXT_WHITE,
    opacity: 0.9,
  };

  return <Text style={subtitleTextStyle}>{children}</Text>;
}
