import React from 'react';
import {Svg, Rect, Defs, LinearGradient, Stop} from 'react-native-svg';
import {ViewStyle} from 'react-native';

interface StopProps {
  offset: number;
  color: string;
  opacity: number;
}

interface Props {
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
  stops: StopProps[];
  style?: ViewStyle;
}

export function LinearGradientBackground({
  x1 = 0,
  y1 = 0,
  x2 = 0,
  y2 = 100,
  stops,
  style,
}: Props): JSX.Element {
  return (
    <Svg width="100%" height="100%" style={style}>
      <Defs>
        <LinearGradient
          id="grad"
          x1={`${x1}%`}
          y1={`${y1}%`}
          x2={`${x2}%`}
          y2={`${y2}%`}>
          {stops.map((s, i) => (
            <Stop
              key={i}
              offset={`${s.offset}%`}
              stopColor={s.color}
              stopOpacity={s.opacity.toString()}
            />
          ))}
          {/* <Stop offset="0%" stopColor="#4c669f" stopOpacity="1" />
          <Stop offset="100%" stopColor="#192f6a" stopOpacity="1" /> */}
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
    </Svg>
  );
}
