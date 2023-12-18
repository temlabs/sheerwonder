import {ViewStyle} from 'react-native';
import React, {useEffect, useRef} from 'react';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {getPlayerScript} from './playerScript';
import useAccessTokenQuery from '@/tanstack/queries/useAccessTokenQuery';
import {usePlayerWebViewMessage} from './hooks/usePlayerWebviewMessage';
import {useStore} from '@/store/useStore';

export function PlayerWebView(): JSX.Element {
  const webViewRef = useRef<WebView>(null);
  const {onDeviceIdMessage, onPlaybackStateChangeMessage} =
    usePlayerWebViewMessage();
  const authCode = useStore(state => state.spotifyAuthCode);
  const {data: accessToken, isStale} = useAccessTokenQuery(authCode);

  useEffect(() => {
    useStore.setState(state => ({...state, spotifyAccessToken: accessToken}));
  }, [accessToken]);

  const handleMessage = (e: WebViewMessageEvent) => {
    const message = e.nativeEvent.data;
    if (message.startsWith('sheerwondercl')) {
      console.log('webview log: ', message.substring('sheerwondercl'.length));
    } else if (message.startsWith('deviceIdReceived')) {
      onDeviceIdMessage(message);
    } else if (message.startsWith('playbackStateChanged')) {
      onPlaybackStateChangeMessage(message);
    }
  };

  console.log({isStale});
  return accessToken ? (
    <WebView
      key={3}
      autoManageStatusBarEnabled={true}
      allowsProtectedMedia={true}
      mediaPlaybackRequiresUserAction={false}
      contentMode="desktop"
      mixedContentMode="always"
      forceDarkOn={true}
      ref={webViewRef}
      source={{uri: 'https://temlabs.github.io/sheerwonder/'}}
      style={webViewStyle}
      onMessage={handleMessage}
      injectedJavaScript={getPlayerScript(accessToken)}
    />
  ) : null;
}

const webViewStyle: ViewStyle = {
  position: 'absolute',
  height: 0,
  width: 0,
};
