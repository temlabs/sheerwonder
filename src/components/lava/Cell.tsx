import React from 'react';
import {
  interpolate,
  dist,
  vec,
  Group,
  Text,
  Rect,
  Skia,
  interpolateColors,
} from '@shopify/react-native-skia';
import {useWindowDimensions} from 'react-native';
import {createNoise2D, createNoise3D} from '../noise/SimpleNoise';
import {
  SharedValue,
  interpolateColor,
  useDerivedValue,
} from 'react-native-reanimated';

interface Props {
  i: number;
  j: number;
  columns: number;
  rows: number;
  clock: SharedValue<number>;
}

export function Cell({i, j, columns, rows, clock}: Props) {
  const dimensions = useWindowDimensions();
  const width = dimensions.width / columns;
  const height = dimensions.height / rows;
  const x = i * width;
  const y = j * height;
  const noise = createNoise3D();
  const color = useDerivedValue(() => {
    const colourTransition =
      (noise(i / rows, j / columns, clock.value) + 1) * 0.5;

    const c = interpolateColor(
      colourTransition,
      [0, 1],
      ['#EDE342', '#F69A97', '#FF51EB', '#FB76C1', '#F2BF6C'],
    );
    return c;
    // return `rgb(${colourTransition * 255},${colourTransition * 255},${
    //   colourTransition * 255
    // })`;
  }, [clock]);

  return <Rect x={x} y={y} width={width} height={height} color={color} />;
}
