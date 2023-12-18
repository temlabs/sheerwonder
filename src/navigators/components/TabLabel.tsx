import {LabelPosition} from '@/react-navigation/bottom-tabs/lib/typescript/@types';
import React, {ReactNode} from 'react';
import {View, Text, TextStyle, ViewStyle} from 'react-native';
import colors from '@/theme/colors';
import {ThemeColor} from '@/theme/types';
import {styles} from '@/theme/styles';

interface Props {
  children: ReactNode;
  text: string;
  color: string;
}

export function TabLabel({children, text, color}: Props): JSX.Element {
  return (
    <View style={[styles.flexColJustStartCent, styles.gap2, tabLabelViewStyle]}>
      {children}
      <Text style={[bottomTabTextStyle, {color: color}]}>{text}</Text>
    </View>
  );
}

const tabLabelViewStyle: ViewStyle = {};

const bottomTabTextStyle: TextStyle = {
  flexShrink: 1,
  fontSize: 10,
};
