export const getBlackness = (hex: string): number => {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse the r, g, b values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Calculate the average of the RGB components
  let average = (r + g + b) / 3;

  // Calculate the "blackness"
  let blackness = 1 - average / 255;

  return blackness;
};
