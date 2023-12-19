import React, {useState, useRef} from 'react';
import {ViewStyle, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {WebViewMessageEvent} from 'react-native-webview/lib/WebViewTypes';
import {useStore} from '@/store/useStore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import {SpotifyBanner} from './SpotifyBanner';
import {TAB_BAR_HEIGHT, screens} from '@/navigators/config';

export function SpotifyLogoutModal(
  props: NativeStackScreenProps<ParamListBase, 'SpotifyLogoutModal'>,
): React.JSX.Element {
  const [spotifyBannerText, setSpotifyBannerText] = useState(
    'Back to sheerwonder',
  );
  const dismissModal = () => props.navigation.goBack();

  const webViewRef = useRef<WebView>(null);

  const allButtonsPressListenerScript = `
  document.querySelectorAll('button').forEach(function(button) {
    button.addEventListener('click', function() {
      var buttonText = this.textContent || this.innerText;
    
      window.ReactNativeWebView.postMessage('button_press_' + buttonText.trim());
    });
  });

`;

  const handleMessage = (e: WebViewMessageEvent): void => {
    const message = e.nativeEvent.data;
    console.debug('MESSAGE :', message);
    if (message.startsWith('button_press_')) {
      const buttonText = message
        .substring('button_press_'.length)
        .toLowerCase()
        .replace(/\s/g, '');
      if (buttonText === 'logout') {
        useStore.getState().resetSpotifyCodes();
        buttonText === 'logout' && props.navigation.navigate(screens.HOME);
      }
    }
  };

  return (
    <View style={containerViewStyle}>
      <WebView
        javaScriptCanOpenWindowsAutomatically={true}
        ref={webViewRef}
        onMessage={handleMessage}
        source={{uri: 'https://accounts.spotify.com/'}}
        originWhitelist={['*']}
        style={webViewStyle}
        injectedJavaScript={allButtonsPressListenerScript}
        scrollEnabled={true}
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
