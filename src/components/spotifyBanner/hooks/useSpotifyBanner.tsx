import {PlayerWebView} from '@/components/spotifyBanner/PlayerWebView';
import {useStore} from '@/store/useStore';
import useAccessTokenQuery from '@/tanstack/queries/useAccessTokenQuery';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useMemo, useCallback} from 'react';

const DEFAULT_BANNER_TEXT = 'Connect to Spotify to start listening';

type SpotifyState =
  | 'CONNECTED'
  | 'CONNECTING'
  | 'NO_PLAYER'
  | 'ERROR'
  | 'DISCONNECTED';

function useSpotify(authCode: string) {
  const navigation = useNavigation();
  const authCodeInStore = useStore.getState().spotifyAuthCode;

  const openLoginModal = () => navigation.navigate(screens.SPOTIFY_LOGIN_MODAL);
  const openLogoutModal = () =>
    navigation.navigate(screns.SPOTIFY_LOGOUT_MODAL);

  const {
    data: accessToken,
    isFetching: accessTokenIsFetching,
    isError: isAccessTokenError,
    error: accessTokenError,
  } = useAccessTokenQuery(authCode);

  const spotifyDeviceId = useStore(s => s.spotifyDeviceId);

  console.debug({
    accessTokenIsFetching,
    accessTokenError,
    authCode: !!authCode,
    accessToken: !!accessToken,
  });
  console.log({accessTokenIsFetching, accessTokenError, spotifyDeviceId});
  const spotifyState: SpotifyState =
    authCodeInStore === ''
      ? 'DISCONNECTED'
      : accessToken && spotifyDeviceId === ''
      ? 'NO_PLAYER'
      : accessTokenIsFetching
      ? 'CONNECTING'
      : accessToken && spotifyDeviceId
      ? 'CONNECTED'
      : isAccessTokenError
      ? 'ERROR'
      : 'DISCONNECTED';

  let spotifyBannerText = DEFAULT_BANNER_TEXT;
  let onSpotifyBannerPress;
  switch (spotifyState) {
    case 'CONNECTED':
      onSpotifyBannerPress = openLogoutModal;
      spotifyBannerText = "You're in! Tap to disconnect";
      break;
    case 'CONNECTING':
      onSpotifyBannerPress = undefined;
      spotifyBannerText = 'Connecting you to the wonder...';
      break;
    case 'DISCONNECTED':
      onSpotifyBannerPress = openLoginModal;
      spotifyBannerText = DEFAULT_BANNER_TEXT;
      break;
    case 'NO_PLAYER':
      onSpotifyBannerPress = openLogoutModal;
      spotifyBannerText = "You're in watch-mode. Tap to disconnect";
      break;
    case 'ERROR':
      onSpotifyBannerPress = openLoginModal;
      spotifyBannerText =
        "Oh no! We couldn't connect you. Tap to logout, then try again try again.";
      break;
    default:
      break;
  }

  const SpotifyPlayer = accessToken ? (
    <PlayerWebView accessToken={accessToken} />
  ) : (
    <></>
  );

  return {
    spotifyBannerText,
    onSpotifyBannerPress,
    SpotifyPlayer,
  };
}

export default useSpotify;
