import {useState} from 'react';
import {runOnJS, useSharedValue} from 'react-native-reanimated';
import {convertMillisecondsToTimestamp as convertMillisecondsToTimestampJS} from '@/components/rangeSelector/functions/utlilityFunctions';
import {MAXIMUM_POST_TIME_MS, MINIMUM_POST_TIME_MS} from '@/config/postConfig';
import {SpotifyTrack} from '@/spotify/types/spotifyCommonTypes';
import {LayoutChangeEvent} from 'react-native';
import {rangeSelectorHitSlop} from '../config';
import {Gesture} from 'react-native-gesture-handler';
import {RangeSelectorGestureAction} from '../types';

interface Props {
  initialInPerc: number;
  initialOutPerc: number;
  track: SpotifyTrack;
  onRangeChange: (startPos: number, endPos: number) => void;
}

export function useRangeSelector(props: Props) {
  const track = props.track;
  const duration = track.duration_ms;

  const [rangeSelectorHeight, setRangeSelectorHeight] = useState<number>();
  const minimumTime = Math.min(MINIMUM_POST_TIME_MS, duration);
  const minimumHeight = rangeSelectorHeight
    ? rangeSelectorHeight * (minimumTime / duration)
    : 100;

  const top = useSharedValue<number>(0);
  const height = useSharedValue<number>(0);
  const rangeAction = useSharedValue<RangeSelectorGestureAction>(undefined);

  const fromTimestamp = useSharedValue<string>('00:00');
  const toTimestamp = useSharedValue<string>(
    convertMillisecondsToTimestampJS(Math.min(duration, MAXIMUM_POST_TIME_MS)),
  );

  const onLayout = (e: LayoutChangeEvent) => {
    const newRangeSelectorHeight = e.nativeEvent.layout.height;
    setRangeSelectorHeight(e.nativeEvent.layout.height);
    top.value = props.initialInPerc * newRangeSelectorHeight;
    height.value =
      Math.max(0, props.initialOutPerc - props.initialInPerc) *
      newRangeSelectorHeight;
    fromTimestamp.value = convertMillisecondsToTimestampJS(
      Math.round(props.initialInPerc * duration),
    );
    toTimestamp.value = convertMillisecondsToTimestampJS(
      Math.round(props.initialOutPerc * duration),
    );
  };

  const gesture = Gesture.Pan()
    .hitSlop(rangeSelectorHitSlop)
    .onBegin(e => {
      const buffer = Math.max(0, height.value * 0.3);
      const endOfRange = top.value + height.value - buffer;
      const startOfRange = top.value + buffer;
      if (e.y >= endOfRange) {
        rangeAction.value = 'CHANGE_END';
      } else if (e.y <= startOfRange) {
        rangeAction.value = 'CHANGE_START';
      } else if (e.y > startOfRange && e.y < endOfRange) {
        rangeAction.value = 'PAN';
      }
    })
    .onChange(e => {
      if (rangeAction.value === 'CHANGE_END') {
        const newHeight = e.y - top.value;
        if (
          newHeight > minimumHeight
          // && maximumHeight &&
          // newHeight <= maximumHeight
        ) {
          height.value = newHeight;
        }
      } else if (rangeAction.value === 'CHANGE_START') {
        const difference = top.value - e.y;
        const newHeight = height.value + difference;
        if (
          newHeight > minimumHeight
          // && maximumHeight &&
          // newHeight <= maximumHeight
        ) {
          top.value = e.y;
          height.value = height.value + difference;
        }
      } else if ((rangeAction.value = 'PAN')) {
        top.value = top.value + e.changeY;
      }

      if (rangeSelectorHeight) {
        const convertMillisecondsToTimestamp = (duration: number): string => {
          let seconds = Math.max(Math.floor(duration / 1000), 0);
          let minutes = Math.max(Math.floor(seconds / 60), 0);
          seconds = seconds % 60;
          let hours = Math.max(Math.floor(minutes / 60), 0);
          minutes = minutes % 60;

          // Formatting the time into 'mm:ss' or 'hh:mm:ss'
          if (hours > 0) {
            return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
          } else {
            return `${pad(minutes)}:${pad(seconds)}`;
          }

          // Helper function to pad numbers with a leading zero if they are less than 10
          function pad(number: number) {
            return number < 10 ? '0' + number : number;
          }
        };
        fromTimestamp.value = convertMillisecondsToTimestamp(
          (duration * top.value) / rangeSelectorHeight,
        );
        toTimestamp.value = convertMillisecondsToTimestamp(
          (duration * (top.value + height.value)) / rangeSelectorHeight,
        );
      }
    })
    .onFinalize(() => {
      rangeAction.value = undefined;
      const endOfRange = top.value + height.value;

      if (rangeSelectorHeight && endOfRange > rangeSelectorHeight) {
        height.value = rangeSelectorHeight - top.value;
      }
      if (top.value < 0) {
        const difference = top.value;
        height.value = height.value + difference;
        top.value = 0;
      }
      rangeSelectorHeight &&
        props.onRangeChange &&
        runOnJS(props.onRangeChange)(
          top.value / rangeSelectorHeight,
          (top.value + height.value) / rangeSelectorHeight,
        );
    });

  return {
    top,
    height,
    onLayout,
    gesture,
    fromTimestamp,
    toTimestamp,
    rangeSelectorHeight,
  };
}
