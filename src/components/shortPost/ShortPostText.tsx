import React, {ReactNode} from 'react';
import {Text, TextStyle} from 'react-native';
import colors from '@/theme/colors';

interface Props {
  children: ReactNode;
  isThread?: boolean;
}

export function ShortPostText({children, isThread}: Props): JSX.Element {
  const shortPostTextStyle: TextStyle = {
    color: colors.TEXT_BODY,
    opacity: isThread ? 0.9 : 0.8,
    fontSize: isThread ? 16 : undefined,
  };

  return <Text style={shortPostTextStyle}>{children}</Text>;
}
