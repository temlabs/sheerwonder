import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export function Play(props: SvgProps): JSX.Element {
  return (
    <Svg width={128} height={128} viewBox="0 0 256 256" {...props}>
      <Path
        fill={props.fill ?? '#000000'}
        d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128Z"
      />
    </Svg>
  );
}
