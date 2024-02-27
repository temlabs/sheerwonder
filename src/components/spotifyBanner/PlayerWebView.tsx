import {ViewStyle} from 'react-native';
import React, {useRef} from 'react';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {getPlayerScript} from './functions/playerScript';
import {usePlayerWebViewMessage} from './hooks/usePlayerWebviewMessage';
import {StoreProps} from '@/store/useStore';

export function PlayerWebView({
  accessToken,
}: {
  accessToken: StoreProps['spotifyAccessToken'];
}): JSX.Element {
  const webViewRef = useRef<WebView>(null);
  const {onDeviceIdMessage, onPlaybackStateChangeMessage} =
    usePlayerWebViewMessage();

  const handleMessage = (e: WebViewMessageEvent) => {
    const message = e.nativeEvent.data;
    if (message.startsWith('sheerwondercl')) {
    } else if (message.startsWith('deviceIdReceived')) {
      onDeviceIdMessage(message);
    } else if (message.startsWith('playbackStateChanged')) {
      onPlaybackStateChangeMessage(message);
    } else {
      console.log('web view log: ', message);
    }
  };

  return (
    <WebView
      key={3}
      autoManageStatusBarEnabled={true}
      allowsProtectedMedia={true}
      mediaPlaybackRequiresUserAction={false}
      contentMode="desktop"
      mixedContentMode="always"
      forceDarkOn={true}
      ref={webViewRef}
      source={{uri: 'https://sheerwonder-landing-production.up.railway.app/'}}
      style={webViewStyle}
      onMessage={handleMessage}
      injectedJavaScript={getPlayerScript(accessToken)}
    />
  );
}

const webViewStyle: ViewStyle = {
  position: 'absolute',
  height: 0,
  width: 0,
};
