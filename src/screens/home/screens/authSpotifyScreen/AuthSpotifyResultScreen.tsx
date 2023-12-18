import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {screens, stacks} from '@/navigators/config';
import {HomeScreenProps} from '@/screens/types';
import {useStore} from '@/store/useStore';
import useAccessTokenQuery from '@/tanstack/queries/useAccessTokenQuery';
import useSpotifyProfileQuery from '@/tanstack/queries/useSpotifyProfileQuery';

export function AuthSpotifyResultScreen({
  navigation,
  route,
}: HomeScreenProps<typeof screens.AUTH_SPOTIFY_RESULT>): JSX.Element {
  const params = route.params;
  const authCode = params.authCode;

  const {data: accessToken, isLoading, error} = useAccessTokenQuery(authCode);
  const spotifyDeviceId = useStore(state => state.spotifyDeviceId);
  const {data: spotifyProfile} = useSpotifyProfileQuery(!!accessToken);

  const returnToHome = (): void => {
    navigation.navigate(stacks.HOME_DRAWER, {screen: screens.HOME});
  };

  const ready = !!accessToken && !isLoading && !!spotifyProfile;

  console.log({accessToken, spotifyDeviceId});

  return (
    <View>
      <Text style={{color: 'white'}}>Logging you in!</Text>
      <TouchableOpacity disabled={!ready} onPress={returnToHome}>
        {ready ? (
          <Text style={{color: 'white'}}>Share the Wonder</Text>
        ) : (
          <Text style={{color: 'white'}}>Loading</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={returnToHome}>
        <Text style={{color: 'white'}}>Duck out</Text>
      </TouchableOpacity>
    </View>
  );
}
