import colors from '@/theme/colors';
import React from 'react';
import {View, Text, ViewStyle, TextStyle} from 'react-native';

interface Props {
  regNum: number;
}
export function RegNum({regNum}: Props) {
  return (
    <View style={container}>
      <Text style={text}>{regNum.toString()}</Text>
    </View>
  );
}

const container: ViewStyle = {
  borderRadius: 5,
  backgroundColor: colors.NEUTRAL_GREY,
  justifyContent: 'center',
  alignItems: 'center',
};

const text: TextStyle = {
  color: colors.TEXT_WHITE,
  fontSize: 10,
  textAlign: 'center',
  verticalAlign: 'middle',
};
