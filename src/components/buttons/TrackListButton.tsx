import React from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  Text,
  ImageStyle,
  Image,
  TextStyle,
} from 'react-native';
import colors from '@/theme/colors';
import {Close} from '@/components/icons/Close';
import {useNavigation} from '@react-navigation/native';
import {SearchBar} from '@/components/textInput/SearchBar';
import useRecentlyPlayedTracksQuery from '@/tanstack/queries/useRecentPlayedTracksQuery';
import {SpotifyTrack} from '@/spotify/spotifyTrackTypes';

export function TrackListButton(props: SpotifyTrack & {onPress: () => void}) {
  //   console.debug('TLB: ', props);
  return (
    <TouchableOpacity style={buttonContainer}>
      <Image
        style={imageStyle}
        source={{uri: props?.album?.images[0].url, height: 50}}
      />
      <View style={copyView}>
        <Text style={trackName}>{props.name}</Text>
        <Text style={artistName} numberOfLines={1}>
          {props?.artists?.map(a => a.name).join(', ')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const buttonContainer: ViewStyle = {
  width: '100%',
  backgroundColor: 'transparent',
  flexDirection: 'row',
  gap: 10,
  paddingVertical: 10,
  paddingHorizontal: 10,
  overflow: 'hidden',
};

const imageStyle: ImageStyle = {
  height: 50,
  width: 50,
};

const copyView: ViewStyle = {
  flexGrow: 1,
  flexWrap: 'wrap',
  flex: 1,
};

const trackName: TextStyle = {
  color: colors.TEXT_WHITE,
  fontWeight: '600',
  width: '100%',
};

const artistName: TextStyle = {
  color: colors.TEXT_WHITE,
  opacity: 0.7,
  width: '100%',
};
