import {useState, useEffect} from 'react';
import {ImageColorsResult, getColors} from 'react-native-image-colors';

export function useImageColor(
  url: string | null,
  fallback: string = '#000000',
): ImageColorsResult | null {
  const [colors, setColors] = useState<ImageColorsResult | null>(null);

  useEffect(() => {
    const defaultOptions = {fallback: fallback, cache: true, key: url ?? ''};
    !!url &&
      getColors(url, {...defaultOptions, fallback})
        .then(setColors)
        .catch(e => console.debug(e));
  }, [fallback, url]);

  return colors;
}
