import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export function Close(props: SvgProps): JSX.Element {
  return (
    <Svg width={64} height={64} viewBox="0 0 16 16" {...props}>
      <Path
        fill={props.fill ?? '#000000'}
        d="m14.41 3.27l-.82-.94L8 7.17L2.41 2.33l-.82.94L7.05 8l-5.46 4.73l.82.94L8 8.83l5.59 4.84l.82-.94L8.95 8z"
      />
    </Svg>
  );
}
