import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export function TickCircle(props: SvgProps): JSX.Element {
  return (
    <Svg width={200} height={200} viewBox="0 0 15 15" {...props}>
      <Path
        fill="none"
        stroke={props.stroke}
        d="M4 7.5L7 10l4-5m-3.5 9.5a7 7 0 1 1 0-14a7 7 0 0 1 0 14Z"
      />
    </Svg>
  );
}
