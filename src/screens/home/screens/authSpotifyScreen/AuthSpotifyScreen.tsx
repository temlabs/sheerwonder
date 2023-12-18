import React, {useRef} from 'react';
import {Pressable, ViewStyle, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {HomeDrawerProps} from '@/screens/types';
import {
  extractCode,
  fetchAccessToken,
  generateSpotifyLoginUri,
} from '@/spotify/spotifyAuthFunctions';
import {OnShouldStartLoadWithRequest} from 'react-native-webview/lib/WebViewTypes';
import {REDIRECT_URI} from '@/spotify/spotifyConfig';
import {screens, stacks} from '@/navigators/config';
import useAccessTokenQuery from '@/tanstack/queries/useAccessTokenQuery';
import {useStore} from '@/store/useStore';

export function AuthSpotifyScreen({
  navigation,
}: HomeDrawerProps): React.JSX.Element {
  const uri = generateSpotifyLoginUri();
  const setSpotifyAuthCode = useStore(state => state.setSpotifyAuthCode);
  const {data: accessToken} = useAccessTokenQuery();

  const webViewRef = useRef<WebView>(null);

  const goBack = (): void => {
    navigation.goBack();
  };

  const handleLoadRequest: OnShouldStartLoadWithRequest = request => {
    const {url} = request;
    if (url.startsWith(REDIRECT_URI)) {
      const code = extractCode(url);
      setSpotifyAuthCode(code);
      navigation.navigate(stacks.HOME, {
        screen: screens.AUTH_SPOTIFY_RESULT,
        params: {authCode: code},
      });
      return false;
    }
    return true;
  };

  return true ? (
    <>
      <WebView
        key={3}
        javaScriptCanOpenWindowsAutomatically={true}
        ref={webViewRef}
        source={{uri: uri}}
        originWhitelist={['*']}
        style={webViewStyle}
        injectedJavaScript={`document.main.style.paddingBottom = '450px';`}
        scrollEnabled={true}
        onShouldStartLoadWithRequest={handleLoadRequest}
      />
      <Pressable style={buttonStyle} onPress={goBack}>
        <Text>Cancel</Text>
      </Pressable>
    </>
  ) : null;
}

const webViewStyle: ViewStyle = {
  flex: 1,
  paddingBottom: 100,
  backgroundColor: 'transparent',
};

const buttonStyle: ViewStyle = {
  position: 'absolute',
  bottom: 50,
  backgroundColor: 'yellow',
};
