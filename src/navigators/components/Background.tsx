import {LinearGradientBackground} from '@/components/LinearGradientBackground';
import {Cell} from '@/components/lava/Cell';
import colors from '@/theme/colors';
import {Canvas, useClock} from '@shopify/react-native-skia';
import React from 'react';
import {Dimensions, ViewStyle} from 'react-native';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const numberOfColumns = 20;
const numberOfRows = numberOfColumns * Math.round(screenHeight / screenWidth);
const rows = new Array(100).fill(numberOfRows).map((_, i) => i);
const cols = new Array(100).fill(numberOfColumns).map((_, i) => i);

function Background() {
  let iter = 0;
  const clock = useClock();
  return (
    <Canvas style={{width: screenWidth, height: screenHeight}}>
      {rows.map((r, i) =>
        cols.map((c, j) => {
          iter++;
          return (
            <Cell
              columns={numberOfColumns}
              rows={numberOfRows}
              i={i}
              j={j}
              key={`${iter}`}
              clock={clock}
            />
          );
        }),
      )}
    </Canvas>
  );
  // <LinearGradientBackground
  //   x1={100}
  //   style={gradientBackgroundStyle}
  //   stops={[
  //     {offset: 0, opacity: 0.2, color: colors.PRIMARY},
  //     {offset: 100, opacity: 0.2, color: colors.TERTIARY},
  //   ]}
  // />
}

const gradientBackgroundStyle: ViewStyle = {
  position: 'absolute',
  //   flex: 1,
  height: '100%',
  width: '100%',
  backgroundColor: 'black',
};

export default React.memo(Background);
