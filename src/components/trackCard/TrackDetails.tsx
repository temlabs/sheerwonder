import colors from '@/theme/colors';
import React from 'react';
import {View, Text, TextStyle, ViewStyle} from 'react-native';

interface Props {
  trackArtist: string;
  trackName: string;
}

export function TrackDetails({trackArtist, trackName}: Props) {
  return (
    <View style={trackDetailsView}>
      <Text style={trackNameStyle} ellipsizeMode="tail" numberOfLines={1}>
        {trackName}
      </Text>
      <Text style={trackArtistStyle} ellipsizeMode="tail" numberOfLines={1}>
        {trackArtist}
      </Text>
    </View>
  );
}

const trackDetailsView: ViewStyle = {
  flexDirection: 'column',
  gap: 5,
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  overflow: 'hidden',
  flex: 1,
};

const trackNameStyle: TextStyle = {
  color: colors.TEXT_WHITE,
  fontWeight: 'bold',
  width: '100%',
};
const trackArtistStyle: TextStyle = {
  flexDirection: 'row',
  flexWrap: 'nowrap',
  color: colors.TEXT_SECONDARY,
  opacity: 0.7,
  flex: 1,
};
