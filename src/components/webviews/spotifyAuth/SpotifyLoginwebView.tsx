import React, {useEffect, useRef} from 'react';
import {ViewStyle} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  extractCode,
  generateSpotifyLoginUri,
  isSpotifyAuthenticated,
} from '@/spotify/spotifyAuthFunctions';
import {OnShouldStartLoadWithRequest} from 'react-native-webview/lib/WebViewTypes';
import {REDIRECT_URI} from '@/spotify/spotifyConfig';
import {useStore} from '@/store/useStore';
import useAccessTokenQuery from '@/tanstack/queries/useAccessTokenQuery';

export function SpotifyLoginWebView(): JSX.Element {
  const {data: accessToken} = useAccessTokenQuery();
  const refreshToken = useStore(state => state.spotifyRefreshToken);
  const isAuthenticated = isSpotifyAuthenticated(refreshToken, accessToken);
  const uri = generateSpotifyLoginUri();
  const setSpotifyAuthCode = useStore(state => state.setSpotifyAuthCode);

  const webViewRef = useRef<WebView>(null);

  const handleLoadRequest: OnShouldStartLoadWithRequest = request => {
    const {url} = request;
    console.log('uri: ', request.url);
    if (url.startsWith(REDIRECT_URI)) {
      console.log('redirecting!');
      const code = extractCode(url);
      setSpotifyAuthCode(code);
      return false;
    }
    console.log('not redirecting!');
    // show a toaster saying spotify has been signed out
    return false;
  };

  return !isAuthenticated ? (
    <WebView
      javaScriptCanOpenWindowsAutomatically={true}
      ref={webViewRef}
      source={{uri: uri}}
      originWhitelist={['*']}
      style={webViewStyle}
      injectedJavaScript={`document.main.style.paddingBottom = '450px';`}
      scrollEnabled={true}
      onShouldStartLoadWithRequest={handleLoadRequest}
    />
  ) : (
    <></>
  );
}

const webViewStyle: ViewStyle = {
  width: 0,
  height: 0,
  backgroundColor: 'transparent',
  position: 'absolute',
};
