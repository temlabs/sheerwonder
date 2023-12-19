import React, {useRef} from 'react';
import {Pressable, ViewStyle, Text} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import {HomeDrawerProps} from '@/screens/types';
import {screens} from '@/navigators/config';
import {useStore} from '@/store/useStore';

export function LogoutSpotifyScreen({
  navigation,
}: HomeDrawerProps): JSX.Element {
  const webViewRef = useRef<WebView>(null);

  const allButtonsPressListenerScript = `
    document.querySelectorAll('button').forEach(function(button) {
      button.addEventListener('click', function() {
        var buttonText = this.textContent || this.innerText;
      
        window.ReactNativeWebView.postMessage('button_press_' + buttonText.trim());
      });
    });

`;

  const goBack = (): void => {
    navigation.goBack();
  };

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
        buttonText === 'logout' && navigation.navigate(screens.HOME);
      }
    }
  };

  return (
    <>
      <WebView
        javaScriptCanOpenWindowsAutomatically={true}
        ref={webViewRef}
        onMessage={handleMessage}
        source={{uri: `https://accounts.spotify.com/`}}
        originWhitelist={['*']}
        style={webViewStyle}
        injectedJavaScript={allButtonsPressListenerScript}
        scrollEnabled={true}
      />
      <Pressable style={buttonStyle} onPress={goBack}>
        <Text>Cancel</Text>
      </Pressable>
    </>
  );
}

const webViewStyle: ViewStyle = {
  flex: 1,
  paddingBottom: 100,
};

const buttonStyle: ViewStyle = {
  position: 'absolute',
  bottom: 50,
  backgroundColor: 'yellow',
  height: 50,
};
