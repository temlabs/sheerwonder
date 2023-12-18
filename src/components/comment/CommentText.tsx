import React, {ReactNode} from 'react';
import {
  View,
  Image,
  ImageStyle,
  ViewStyle,
  Text,
  TextStyle,
} from 'react-native';
import colors from '@/theme/colors';

interface Props {
  children: ReactNode;
  isThread?: boolean;
}

export function CommentText({children, isThread}: Props): JSX.Element {
  const commentTextStyle: TextStyle = {
    color: colors.TEXT_BODY,
    opacity: isThread ? 0.9 : 0.8,
    fontSize: isThread ? 16 : undefined,
  };

  return <Text style={commentTextStyle}>{children}</Text>;
}
