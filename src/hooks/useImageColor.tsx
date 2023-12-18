import {useState, useEffect} from 'react';
// import {ImageColorsResult, getColors} from 'react-native-image-colors';

// export function useImageColor(
//   url: string,
//   fallback?: string,
// ): ImageColorsResult | null {
//   const [colors, setColors] = useState<ImageColorsResult>(null);

//   const defaultOptions = {fallback: '#000000', cache: true, key: url};

//   useEffect(() => {
//     getColors(url, {...defaultOptions, fallback})
//       .then(setColors)
//       .catch(e => console.debug(e));
//   }, []);

//   return colors;
// }
