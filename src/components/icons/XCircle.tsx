import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export function XCircle(props: SvgProps): JSX.Element {
  return (
    <Svg width={200} height={200} viewBox="0 0 15 15" {...props}>
      <Path
        fill="none"
        stroke={props.stroke}
        d="m4.5 4.5l6 6m-6 0l6-6m-3 10a7 7 0 1 1 0-14a7 7 0 0 1 0 14Z"
      />
    </Svg>
  );
}