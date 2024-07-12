import {interpolateColors} from '@shopify/react-native-skia';

export const hexToRgb = (hex: string) => {
  'worklet';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

export const getColor = (hexColorScale: Array<string>, signal: number) => {
  'worklet';

  const colorScale = ['#EDCB96', '#9E7682', '#F24236', '#F5F749', '#14FFF7'];
  const rgbColorScale = hexColorScale.map(hexToRgb);

  // Map noise value to a continuous range between 0 and colorScale.length - 1
  const transition = signal * (colorScale.length - 1);

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
};
