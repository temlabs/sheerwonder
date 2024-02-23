import React, {useState} from 'react';
import {View, ViewStyle, Text, TextStyle, TouchableOpacity} from 'react-native';
import {Upvote} from '../../components/icons/Upvote';
import colors from '@/theme/colors';
import {Reply} from '../../components/icons/Reply';
import {Bookmark} from '../../components/icons/Bookmark';

interface Props {
  upvotes: number;
  replies: number;
  saves: number;
}

export function ShortPostStatBar({
  upvotes,
  replies,
  saves,
}: Props): JSX.Element {
  const [voteAddition, setVoteAddition] = useState(0);
  const [bookmarkAddition, setBookmarkAddition] = useState(0);
  return (
    <View style={[containerViewStyle, spaceBetweenRowStyle]}>
      <View style={rowViewStyle}>
        <TouchableOpacity
          onPress={() => setVoteAddition(v => (v ? 0 : 1))}
          style={iconAndMetricViewStyle}>
          <Upvote
            width={20}
            height={20}
            fill={voteAddition ? colors.SECONDARY : 'transparent'}
            stroke={colors.SECONDARY}
          />
          <Text style={interactiveMetricTextStyle}>
            {(upvotes + voteAddition).toString()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={iconAndMetricViewStyle}>
          <Reply
            width={20}
            height={20}
            fill={replies ? colors.TEXT_GRAY : 'transparent'}
            stroke={colors.TEXT_GRAY}
            opacity={0.4}
          />
          <Text style={metricTextStyle}>{replies.toString()}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => setBookmarkAddition(b => (b ? 0 : 1))}
        style={iconAndMetricViewStyle}>
        <Bookmark
          width={20}
          height={20}
          fill={bookmarkAddition ? colors.TEXT_GRAY : 'transparent'}
          stroke={colors.TEXT_GRAY}
          opacity={0.4}
        />
        <Text style={metricTextStyle}>
          {(saves + bookmarkAddition).toString()}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const containerViewStyle: ViewStyle = {
  width: '100%',
  paddingVertical: 5,
};

const spaceBetweenRowStyle: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const iconAndMetricViewStyle: ViewStyle = {
  flexDirection: 'row',
  gap: 5,
};

const interactiveMetricTextStyle: TextStyle = {
  color: colors.SECONDARY,
};

const metricTextStyle: TextStyle = {
  color: colors.TEXT_GRAY,
  opacity: 0.7,
};

const rowViewStyle: ViewStyle = {
  flexDirection: 'row',
  gap: 25,
};
