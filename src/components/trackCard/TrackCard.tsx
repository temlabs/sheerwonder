import React, {useRef, useState} from 'react';
import {
  View,
  ViewStyle,
  Text,
  TextStyle,
  Image,
  ImageStyle,
  Pressable,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {CommentProps, TrackProps} from '@/demo/types';
import colors from '@/theme/colors';

import {LinearGradientBackground} from '../LinearGradientBackground';
import {TrackProgressBar} from './TrackProgressBar';
import {useStore} from '@/store/useStore';
import {isCurrentlyPlaying} from '@/spotify/spotifyPlaybackFunctions';
import {Play} from '../icons/Play';
import PlayingBarsAnimation from './PlayingBarsAnimation';
import RippleButton from '../buttons/Ripplebutton';
import {TouchableOpacity} from 'react-native';
import {TrackDetails} from './TrackDetails';

type Props = TrackProps &
  Pick<CommentProps, 'timeIn' | 'timeOut' | 'id'> & {transparent?: boolean};

export function TrackCard({
  trackArtist,
  trackArtwork,
  trackName,
  duration,
  timeIn,
  timeOut,
  spotifyId,
  id,
  transparent = true,
}: Props): JSX.Element {
  const play = useStore(state => state.play);
  const setSelectedTrack = useStore(state => state.setSelectedTrack);
  const selectedTrack = useStore(state => state.selectedTrack);
  const playingTrack = useStore(state => state.playingTrack);
  const pause = useStore(state => state.pause);

  let backgroundDark: string = colors.BACKGROUND;
  let backgroundLight: string = colors.BACKGROUND;

  const [scale] = useState(new Animated.Value(1));

  const timeoutRef = useRef<NodeJS.Timeout>();

  const thisTrackIsPlaying = isCurrentlyPlaying(
    spotifyId,
    id,
    selectedTrack,
    playingTrack,
  );

  const handlePressIn = async () => {
    if (thisTrackIsPlaying) {
      console.log('pausing');
      // setSelectedTrack({postId: '', spotifyTrackId: ''});
      try {
        await pause();
      } catch (error) {
        console.log('pause err: ', error);
      }
    } else {
      console.log('playing');
      setSelectedTrack({spotifyTrackId: spotifyId, postId: id});
      try {
        await play(`spotify:track:${spotifyId}`, timeIn ?? 0);
      } catch (error) {
        console.log('play err: ', error);
      }
    }
  };

  const handlePressOut = () => {
    clearTimeout(timeoutRef.current);
    Animated.spring(scale, {
      toValue: 1,
      speed: 200,
      useNativeDriver: true,
    }).start();
  };

  const animatedContainerStyle = {
    transform: [{scale: scale}],
  };

  return (
    <View>
      <View style={containerView}>
        <View style={innerContainerView}>
          <LinearGradientBackground
            x1={100}
            style={gradientBackgroundStyle(transparent)}
            stops={[
              {offset: 0, opacity: 1, color: backgroundDark},
              {offset: 100, opacity: 1, color: backgroundLight},
            ]}
          />
          {/* <Image
            style={gradientBackgroundStyle(transparent)}
            source={{uri: trackArtwork, width: 20, height: 20}}
            blurRadius={40}
          /> */}
          <TrackProgressBar
            duration={duration}
            timeIn={timeIn ?? 0}
            timeOut={timeOut ?? duration}
            trackId={spotifyId}
            id={id}
          />
          <View style={innerViewStyle}>
            <Image
              style={coverArtImageStyle}
              source={{uri: trackArtwork, width: 20, height: 20}}
            />
            <TrackDetails trackArtist={trackArtist} trackName={trackName} />

            <View style={{height: 20, width: 24}}>
              {/* <PlayingBarsAnimation isPlaying={thisTrackIsPlaying} /> */}
            </View>
          </View>
        </View>
        <TouchableOpacity style={playButtonStyle} onPress={handlePressIn} />
      </View>
    </View>
  );
}

const containerView: ViewStyle = {
  width: '100%',
  // height: 40,
  borderRadius: 8,
  // borderTopLeftRadius: 4,
  // borderTopRightRadius: 4,
  overflow: 'hidden',
  backgroundColor: 'black',
  alignSelf: 'center',
};

const innerContainerView: ViewStyle = {
  borderRadius: 8,
  // borderTopLeftRadius: 4,
  // borderTopRightRadius: 4,
  overflow: 'hidden',
};

const innerViewStyle: ViewStyle = {
  paddingHorizontal: 10,
  paddingVertical: 10,
  flexDirection: 'row',
  gap: 15,
  alignItems: 'center',
  // height: '100%',
  width: '100%',
};

const gradientBackgroundStyle: (
  transparent: boolean,
) => ImageStyle = transparent => ({
  position: 'absolute',
  height: '100%',
  width: '100%',
  alignSelf: 'center',
  opacity: transparent ? 0.7 : 1,
});

const coverArtImageStyle: ImageStyle = {
  width: 50,
  height: 50,
};

const playButtonStyle: ViewStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  width: '30%',
  height: '100%',
  backgroundColor: 'white',
  opacity: 0.01,
};
