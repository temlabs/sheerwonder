import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export function Add(props: SvgProps): JSX.Element {
  return (
    <Svg width={128} height={128} viewBox="0 0 24 24" {...props}>
      <Path
        fill={props.fill ?? '#000000'}
        d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
      />
    </Svg>
  );
}
