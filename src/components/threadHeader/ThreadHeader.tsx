import {CommentProps, ShortPostProps} from '@/demo/types';
import React from 'react';
import {View, ViewStyle} from 'react-native';
import {ThreadHeaderPost} from './ThreadHeaderPost';
import {ThreadHeaderThread} from './ThreadHeaderThread';
import {ShortPost} from '../shortPost/ShortPost';
import colors from '@/theme/colors';

interface Props {
  shortPost: ShortPostProps;
  parentThread?: CommentProps[];
}

export function ThreadHeader({shortPost, parentThread}: Props) {
  return (
    <View>
      {parentThread ? (
        <ThreadHeaderPost shortPost={shortPost} />
      ) : (
        <View style={shortPostContainer}>
          <ShortPost {...shortPost} />
        </View>
      )}
      {parentThread ? <ThreadHeaderThread thread={parentThread} /> : <></>}
    </View>
  );
}

const shortPostContainer: ViewStyle = {
  borderBottomColor: colors.BACKGROUND_BORDER,
  borderBottomWidth: 2,
  marginBottom: 20,
};
