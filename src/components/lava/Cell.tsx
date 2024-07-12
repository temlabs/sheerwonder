import React from 'react';
import {
  interpolateColors,
  Circle,
  Oval,
  rotate,
  Transforms3d,
  SweepGradient,
  vec,
  Skia,
  FractalNoise,
} from '@shopify/react-native-skia';
import {createNoise3D} from '../noise/SimpleNoise';
import {
  SharedValue,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

// Helper function to convert hex to RGB

interface Props {
  i: number;
  j: number;
  columns: number;
  rows: number;
  clock: SharedValue<number>;
  width: number;
  height: number;
}

export function Cell({i, j, columns, rows, clock, width, height}: Props) {
  const y = i * height;
  const x = j * width;
  const noise = createNoise3D();

  const color1 = useDerivedValue(() => {
    const hexToRgb = hex => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    };

    const colorScale = ['#2E222E', '#350E0E', '#4B1E1F', '#1F1111', '#000F08'];
    const rgbColorScale = colorScale.map(hexToRgb);

    const n = noise(x / width, y / height, clock.value * 0.00005);

    // Map noise value to a continuous range between 0 and colorScale.length - 1
    const transition = (n + 1) * 0.5 * (colorScale.length - 1);

    // Find the two colors to interpolate between
    const index1 = Math.floor(transition);
    const index2 = Math.min(index1 + 1, colorScale.length - 1);

    // Calculate the interpolation factor between these two colors
    const factor = transition - index1;

    // Interpolate between the two colors
    const interpolatedColor = interpolateColors(
      factor,
      [0, 1],
      [rgbColorScale[index1], rgbColorScale[index2]],
    );

    // Convert back to a string format that Skia can use
    return `rgb(${Math.round(interpolatedColor[0])}, ${Math.round(
      interpolatedColor[1],
    )}, ${Math.round(interpolatedColor[2])})`;
  });

  const color2 = useDerivedValue(() => {
    const hexToRgb = hex => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    };

    const colorScale = ['#EDCB96', '#9E7682', '#F24236', '#F5F749', '#14FFF7'];
    const rgbColorScale = colorScale.map(hexToRgb);

    const n = noise(x / width, y / height, clock.value * 0.00003);

    // Map noise value to a continuous range between 0 and colorScale.length - 1
    const transition = (n + 1) * 0.5 * (colorScale.length - 1);

    // Find the two colors to interpolate between
    const index1 = Math.floor(transition);
    const index2 = Math.min(index1 + 1, colorScale.length - 1);

    // Calculate the interpolation factor between these two colors
    const factor = transition - index1;

    // Interpolate between the two colors
    const interpolatedColor = interpolateColors(
      factor,
      [0, 1],
      [rgbColorScale[index1], rgbColorScale[index2]],
    );

    // Convert back to a string format that Skia can use
    return `rgb(${Math.round(interpolatedColor[0])}, ${Math.round(
      interpolatedColor[1],
    )}, ${Math.round(interpolatedColor[2])})`;
  });

  const colorArray = useDerivedValue(() => {
    return [color1.value, color2.value];
  });

  const xAnimated = useDerivedValue(() => {
    const n = noise(x / width, y / height, clock.value * 0.00002);
    const nClamped = (n + 1) * 0.5;
    return x - 5 + nClamped * x;
  });

  const yAnimated = useDerivedValue(() => {
    const n = noise(x / width, y / height, clock.value * 0.00002);
    const nClamped = (n + 1) * 0.5;
    return y - 5 + nClamped * y;
  });

  const widthAnimated = useDerivedValue(() => {
    const n = noise(x / width, y / height, clock.value * 0.00002);
    return width + n * n * width;
  });

  const heightAnimated = useDerivedValue(() => {
    const n = noise(x / width, y / height, clock.value * 0.000005) + 1;
    return height + n * height;
  });

  const c = useDerivedValue(() => ({
    x: xAnimated.value, // + widthAnimated.value * 0.3,
    y: yAnimated.value, //+ heightAnimated.value * 0.04,
  }));

  const transform = useDerivedValue(() => {
    const centerX = c.value.x;
    const centerY = c.value.y;
    const rotationDegrees = 45;

    const matrix = Skia.Matrix();

    // Translate to origin
    matrix.translate(-centerX, -centerY);
    // Rotate
    matrix.rotate(rotationDegrees);
    // Translate back
    matrix.translate(centerX, centerY);
    return matrix.get();
  });

  return (
    <Oval
      x={xAnimated}
      y={yAnimated}
      width={widthAnimated}
      height={heightAnimated}

      // color={color}
    >
      <SweepGradient start={0} end={180} c={c} colors={colorArray} />
    </Oval>
  );
}
//<Circle cx={cx} cy={cy} r={cr} color={color} />
