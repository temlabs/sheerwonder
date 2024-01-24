import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export function Chevron(props: SvgProps): JSX.Element {
  return (
    <Svg width={64} height={64} viewBox="0 0 16 16" {...props}>
      <Path
        fill={props.fill ?? 'currentColor'}
        d="m10.18 8.05l-5.66 5.56l.87.89l5.71-5.59a1.18 1.18 0 0 0 .39-.86a1.13 1.13 0 0 0-.39-.85L5.4 1.5l-.89.88z"
      />
    </Svg>
  );
}
