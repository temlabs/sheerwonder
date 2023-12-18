import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export function Menu(props: SvgProps): JSX.Element {
  return (
    <Svg width={128} height={128} viewBox="0 0 24 24" {...props}>
      <Path
        fill={props.fill ?? '#000000'}
        d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
      />
    </Svg>
  );
}
