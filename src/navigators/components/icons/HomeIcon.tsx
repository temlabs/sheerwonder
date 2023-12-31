import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export function HomeIcon(props: SvgProps): JSX.Element {
  return (
    <Svg width={128} height={128} viewBox="0 0 16 16" {...props}>
      <Path
        fill={props.fill ?? '#000000'}
        d="M15.5 14.69h-1.25V7.78a.62.62 0 0 0-.25-.47L8.4 2.7a.65.65 0 0 0-.81 0L2 7.31a.62.62 0 0 0-.22.47v6.91H.5V7.78a1.87 1.87 0 0 1 .68-1.44l5.62-4.6a1.88 1.88 0 0 1 2.39 0l5.63 4.6a1.87 1.87 0 0 1 .68 1.44z"
      />
      <Path
        fill={props.fill ?? '#000000'}
        d="M11.05 12.11H9.8A1.72 1.72 0 0 0 8 10.49a1.72 1.72 0 0 0-1.8 1.62H5a3 3 0 0 1 3-2.87a3 3 0 0 1 3.05 2.87zm-6.1 0H6.2v2.58H4.95zm4.85 0h1.25v2.58H9.8z"
      />
    </Svg>
  );
}
