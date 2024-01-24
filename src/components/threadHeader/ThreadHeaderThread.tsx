import {CommentProps, ShortPostProps} from '@/demo/types';
import colors from '@/theme/colors';
import React from 'react';
import {View, Text, Image, ViewStyle, TextStyle} from 'react-native';

interface Props {
  thread: CommentProps[];
}

export function ThreadHeaderThread({thread}: Props) {
  return (
    <View>
      {thread.map(comment => (
        <Text style={{color: colors.TEXT_WHITE}}>{comment.text}</Text>
      ))}
    </View>
  );
}
