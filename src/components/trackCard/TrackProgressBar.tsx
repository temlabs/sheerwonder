import React, {useRef} from 'react';
import {
  View,
  ViewStyle,
  DimensionValue,
  InteractionManager,
  Animated,
  Easing,
} from 'react-native';
import colors from '@/theme/colors';
import {useStore} from '@/store/useStore';
import {isCurrentlyPlaying} from '@/spotify/spotifyPlaybackFunctions';
import {useIsFocused} from '@/react-navigation/native';

interface Props {
  duration: number;
  timeIn: number;
  timeOut: number;
  trackId: string;
  id: string;
}

export function TrackProgressBar({
  duration,
  timeIn,
  timeOut,
  trackId,
  id,
}: Props): JSX.Element {
  const isFocused = useIsFocused();
  const playingTrack = useStore(state => state.playingTrack);
  const pause = useStore(state => state.pause);
  const selectedTrack = useStore(state => state.selectedTrack);
  const leftProportion = (timeIn / duration) * 100;
  const rightProportion = ((duration - timeOut) / duration) * 100;

  const leftWidth: DimensionValue = `${leftProportion}%`;
  const rightWidth: DimensionValue = `${rightProportion}%`;

  const leftInactiveWidthStyle: ViewStyle = {
    width: leftWidth,
  };
  const rightInactiveWidthStyle: ViewStyle = {
    width: rightWidth,
  };

  const thisTrackIsPlaying = isCurrentlyPlaying(
    trackId,
    id,
    selectedTrack,
    playingTrack,
  );

  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const fadeTo = (newOpacity: number, duration?: number) =>
    Animated.timing(opacity, {
      toValue: newOpacity,
      duration: duration ?? 250,
      useNativeDriver: true,
      easing: Easing.linear,
    });

  const startPlayhead = (duration: number) =>
    Animated.timing(scale, {
      toValue: 3,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    });

  InteractionManager.runAfterInteractions(() => {
    if (thisTrackIsPlaying && isFocused) {
      const selectedDuration = timeOut - timeIn;
      const currentTime = Date.now();
      const currentPlaybackTime =
        playingTrack.position + (currentTime - playingTrack.startTime);
      const timePlayed = currentPlaybackTime - timeIn;
      const startProgress = timePlayed / selectedDuration;
      const remainingTime = selectedDuration - timePlayed;
      scale.setValue(1 + startProgress * 2);
      fadeTo(1, 0).start();
      startPlayhead(remainingTime).start(
        result =>
          result.finished &&
          pause().then(() =>
            fadeTo(0).start(result => result.finished && scale.setValue(1)),
          ),
      );
    } else {
      fadeTo(0).start(result => result.finished && scale.setValue(1));
    }
  });

  const widthStyle: ViewStyle = {
    ...activeSegmentPlayed,
    position: 'absolute',
    height: '100%',
    top: 0,
    width: '100%',
    left: '-100%',
    transform: [
      {
        scaleX: scale,
      },
    ],
    opacity: opacity,
  };

  return (
    <View style={progressBarContainerView}>
      <View style={[inactiveSegment, leftInactiveWidthStyle]}></View>
      <View style={activeSegment}>
        <Animated.View style={widthStyle}></Animated.View>
      </View>
      <View style={[inactiveSegment, rightInactiveWidthStyle]}></View>
    </View>
  );
}

const progressBarContainerView: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
  height: 6,
  justifyContent: 'space-between',
  zIndex: 10,
};

const activeSegment: ViewStyle = {
  flexGrow: 1,
  opacity: 0.5,
  // alignItems: 'flex-start',
  backgroundColor: colors.TEXT_PRIMARY,
  justifyContent: 'center',
  alignItems: 'flex-start',
  overflow: 'hidden',
};

const activeSegmentPlayed: ViewStyle = {
  opacity: 1,
  position: 'absolute',
  left: 0,
  bottom: 0,
  zIndex: 30,
  height: '100%',
  padding: 0,
  backgroundColor: colors.TEXT_WHITE,
  // backgroundColor: 'yellow',
};

const inactiveSegment: ViewStyle = {
  backgroundColor: colors.TEXT_PRIMARY,
  opacity: 0.1,
};
