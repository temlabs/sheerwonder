import React from 'react';
import {
  Circle,
  SweepGradient,
  Group,
  Paint,
  Blur,
  ColorMatrix,
  RadialGradient,
} from '@shopify/react-native-skia';
import {createNoise3D} from '../noise/SimpleNoise';
import {SharedValue, useDerivedValue} from 'react-native-reanimated';
import {getColor} from './functions';

interface Props {
  i: number;
  j: number;
  columns: number;
  rows: number;
  clock: SharedValue<number>;
  width: number;
  height: number;
  useRadial?: boolean;
}

export function CellCouple({
  i,
  j,
  columns,
  rows,
  clock,
  width,
  height,
  useRadial = true,
}: Props) {
  const y = i * height;
  const x = j * width;
  const noise = createNoise3D();
  const noise2 = createNoise3D();
  const colorScale = ['#2E222E', '#350E0E', '#4B1E1F', '#1F1111', '#000F08'];

  const color1 = useDerivedValue(() => {
    const n = (noise(x / width, y / height, clock.value * 0.00003) + 1) * 0.5;
    return getColor(colorScale, n);
  });

  const color2 = useDerivedValue(() => {
    const n = (noise(x / width, y / height, clock.value * 0.00003) + 1) * 0.5;
    return getColor(colorScale, n);
  });

  const x1Animated = useDerivedValue(() => {
    const n = noise2(x / width, y / height, clock.value * 0.0002);
    const nClamped = 3 * n + 1;
    return 200 - 5 + nClamped;
  });

  const x2Animated = useDerivedValue(() => {
    const n = noise(x / width, y / height, clock.value * 0.000008);
    const nClamped = 2.3 * n;
    return 200 - 5 + nClamped * 50;
  });

  const y1Animated = useDerivedValue(() => {
    const n = noise2(x / width, y / height, clock.value * 0.000008);
    const nClamped = 2 * (n - 1);
    return 200 - 5 + nClamped * 200;
  });

  const y2Animated = useDerivedValue<number>(() => {
    const n = noise(x / width, y / height, clock.value * 0.000008);
    const nClamped = 2 * (n - 0.5);
    return 300 - 5 + nClamped * 100 - 50;
  });

  const c1 = useDerivedValue(() => ({
    x: x1Animated.value, // + widthAnimated.value * 0.3,
    y: y2Animated.value, //+ heightAnimated.value * 0.04,
  }));

  const c2 = useDerivedValue(() => ({
    x: x2Animated.value, // + widthAnimated.value * 0.3,
    y: y2Animated.value, //+ heightAnimated.value * 0.04,
  }));

  return (
    <>
      <Group
        layer={
          <Paint>
            <Blur blur={30} />
            <ColorMatrix
              matrix={[
                // R, G, B, A, Position
                // prettier-ignore
                1, 0, 0, 0, 0,
                // prettier-ignore
                0, 1, 0, 0, 0,
                // prettier-ignore
                0, 0, 1, 0, 0,
                // prettier-ignore
                0, 0, 0, 30, -20,
              ]}
            />
          </Paint>
        }>
        <Circle cx={x1Animated} cy={y1Animated} r={130}>
          <SweepGradient
            // start={0}
            // end={180}
            c={c2}
            colors={['magenta', 'white', 'cyan', 'orange']}
          />
        </Circle>
        <Circle cx={x2Animated} cy={y2Animated} r={200}>
          {useRadial ? (
            <RadialGradient
              c={c1}
              r={200}
              colors={['magenta', 'green', 'cyan', 'orange', 'white']}
            />
          ) : (
            <SweepGradient
              start={0}
              end={180}
              c={c1}
              colors={['magenta', 'green', 'cyan', 'orange', 'white']}
            />
          )}
        </Circle>
      </Group>
    </>
  );
}
