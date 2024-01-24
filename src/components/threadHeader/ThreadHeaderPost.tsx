import {ShortPostProps} from '@/demo/types';
import colors from '@/theme/colors';
import React from 'react';
import {View, Text, Image, ViewStyle, TextStyle} from 'react-native';

interface Props {
  shortPost: ShortPostProps;
}

export function ThreadHeaderPost({shortPost}: Props) {
  return (
    <View>
      <Text style={{color: colors.TEXT_WHITE}}>{shortPost.text}</Text>
    </View>
  );
}
