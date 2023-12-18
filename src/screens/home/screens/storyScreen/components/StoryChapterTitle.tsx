import React from 'react';
import {Text, TextStyle} from 'react-native';
import colors from '@/theme/colors';

export function StoryChapterTitle({title}: {title: string}): JSX.Element {
  return <Text style={chapterTitleStyle}>{title}</Text>;
}

const chapterTitleStyle: TextStyle = {
  color: colors.TEXT_PRIMARY,
  fontSize: 30,
  fontWeight: '600',
  marginBottom: 24,
  textAlign: 'left',
  alignSelf: 'flex-start',
};
