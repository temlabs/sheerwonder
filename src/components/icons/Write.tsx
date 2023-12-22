import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

export function Write(props: SvgProps): JSX.Element {
  return (
    <Svg width={64} height={64} viewBox="0 0 16 16" {...props}>
      <Path
        fill={props.fill ?? '#000000'}
        d="M13.8 2.2a2.51 2.51 0 0 0-3.54 0l-6.9 6.91l-1.76 3.62a1.26 1.26 0 0 0 1.12 1.8a1.23 1.23 0 0 0 .55-.13l3.62-1.76l6-6l.83-.82l.06-.06a2.52 2.52 0 0 0 .02-3.56m-.89.89a1.25 1.25 0 0 1 0 1.77l-1.77-1.77a1.24 1.24 0 0 1 .86-.37a1.22 1.22 0 0 1 .91.37M2.73 13.27L4.29 10L6 11.71zm4.16-2.4L5.13 9.11L10.26 4L12 5.74z"
      />
    </Svg>
  );
}
