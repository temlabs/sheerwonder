import React, {useState, useRef} from 'react';
import {ViewStyle, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  extractCode,
  generateSpotifyLoginUri,
} from '@/spotify/spotifyAuthFunctions';
import {OnShouldStartLoadWithRequest} from 'react-native-webview/lib/WebViewTypes';
import {REDIRECT_URI} from '@/spotify/spotifyConfig';
import {useStore} from '@/store/useStore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import {SpotifyBanner} from './SpotifyBanner';
import {TAB_BAR_HEIGHT, screens} from '@/navigators/config';

export function SpotifyLoginModal(
  props: NativeStackScreenProps<
    ParamListBase,
    typeof screens.SPOTIFY_LOGIN_MODAL
  >,
): React.JSX.Element {
  const [spotifyBannerText, setSpotifyBannerText] = useState(
    'Back to sheerwonder',
  );
  const dismissModal = () => props.navigation.goBack();

  const uri = generateSpotifyLoginUri();
  const setSpotifyAuthCode = useStore(state => state.setSpotifyAuthCode);

  const webViewRef = useRef<WebView>(null);

  const handleLoadRequest: OnShouldStartLoadWithRequest = request => {
    const {url} = request;
    if (url.startsWith(REDIRECT_URI)) {
      const code = extractCode(url);
      if (code) {
        setSpotifyAuthCode(code);
        dismissModal();
        return false;
      } else {
        setSpotifyBannerText('There was an error signing you in');
      }
      return false;
    }
    return true;
  };

  return (
    <View style={containerViewStyle}>
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

      <View style={bannerViewStyle}>
        <SpotifyBanner onPress={dismissModal} text={spotifyBannerText} />
      </View>
    </View>
  );
}

const webViewStyle: ViewStyle = {
  overflow: 'hidden',
  opacity: 1,
};

const containerViewStyle: ViewStyle = {
  flex: 1,
  justifyContent: 'space-between',
  height: '100%',
};

const bannerViewStyle: ViewStyle = {
  width: '100%',
  height: TAB_BAR_HEIGHT,
  justifyContent: 'center',
  flexDirection: 'column',
};
