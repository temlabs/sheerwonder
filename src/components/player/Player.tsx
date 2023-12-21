import React, {memo} from 'react';
import {PlayerWebView} from '../spotifyBanner/PlayerWebView';
import {PlayerBanner} from './PlayerBanner';

const Player = function Player(): JSX.Element {
  return (
    <>
      <PlayerBanner />
      <PlayerWebView />
    </>
  );
};

export {Player};
