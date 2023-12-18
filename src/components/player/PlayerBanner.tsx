import {View, Text, ViewStyle, TextStyle} from 'react-native';
import React from 'react';
import colors from '@/theme/colors';
import {useStore} from '@/store/useStore';
import useAccessTokenQuery from '@/tanstack/queries/useAccessTokenQuery';
import {styles} from '@/theme/styles';

export function PlayerBanner(): JSX.Element {
  const refreshToken = useStore(state => state.spotifyRefreshToken);
  const spotifyDeviceId = useStore(state => state.spotifyDeviceId);
  const accessTokenQuery = useAccessTokenQuery();
  const accessToken = accessTokenQuery.data;

  const isAuthenticated =
    !!refreshToken &&
    !!accessToken &&
    !accessTokenQuery.isStale &&
    !!spotifyDeviceId;

  return (
    <View style={playerContainerStyle}>
      {isAuthenticated ? (
        <Text style={textStyle}>Spotify is authenticated! Happy sharing</Text>
      ) : (
        <Text style={textStyle}>
          You&apos;re in watch mode. Sign in to Spotify to share the wonder with
          no restrictions
        </Text>
      )}
    </View>
  );
}

const playerContainerStyle: ViewStyle = {
  width: '100%',
  //   height: 30,
  position: 'absolute',
  bottom: 50,
  backgroundColor: colors.BACKGROUND,
  opacity: 0.8,
  padding: 5,
  paddingHorizontal: 10,
  alignItems: 'center',
};

const textStyle: TextStyle = {
  color: colors.TEXT_GRAY,
  alignSelf: 'center',
  textAlign: 'center',
};
