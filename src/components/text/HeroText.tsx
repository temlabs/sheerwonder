import colors from '@/theme/colors';
import React from 'react';
import {Text, TextStyle} from 'react-native';

export function HeroText({text}: {text: string}) {
  return <Text style={heroTextStyle}>{text}</Text>;
}

const heroTextStyle: TextStyle = {
  fontSize: 44,
  color: colors.TEXT_WHITE,
  textAlign: 'center',
  fontWeight: '600',
};
