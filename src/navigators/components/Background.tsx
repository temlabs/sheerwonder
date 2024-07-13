import {LinearGradientBackground} from '@/components/LinearGradientBackground';
import {Cell} from '@/components/lava/Cell';
import colors from '@/theme/colors';
import {
  BackdropBlur,
  Blur,
  Canvas,
  FractalNoise,
  Group,
  Rect,
  Turbulence,
  useClock,
  DisplacementMap,
  vec,
  Shader,
  Paint,
  Skia,
  Fill,
} from '@shopify/react-native-skia';
import React from 'react';
import {Dimensions, View, ViewStyle} from 'react-native';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {CellCouple} from '@/components/lava/CellCouple';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const numberOfColumns = 4;
const numberOfRows = 4; //Math.round(numberOfColumns * (screenHeight / screenWidth));
const rows = new Array(numberOfRows).fill(numberOfRows).map((_, i) => i);
const cols = new Array(numberOfColumns).fill(numberOfColumns).map((_, i) => i);

function Background() {
  const clock = useClock();
  let iter = 0;

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        // backgroundColor: '#2B0E08',
        backgroundColor: 'black',
      }}>
      <Canvas
        style={{
          width: screenWidth,
          height: screenHeight,
        }}>
        <Group>
          {/* {rows.map((r, i) =>
            cols.map((c, j) => {
              iter++;
              return (
            
              );
            }),
          )} */}

          <CellCouple
            columns={numberOfColumns}
            rows={numberOfRows}
            width={screenWidth / numberOfColumns}
            height={screenHeight / numberOfRows}
            i={0}
            j={0}
            key={`${iter}`}
            clock={clock}
          />
          <CellCouple
            columns={numberOfColumns}
            rows={numberOfRows}
            width={screenWidth / numberOfColumns}
            height={screenHeight / numberOfRows}
            i={1}
            j={1}
            key={`${iter}3`}
            clock={clock}
          />
          <CellCouple
            columns={numberOfColumns}
            rows={numberOfRows}
            width={screenWidth / numberOfColumns}
            height={screenHeight / numberOfRows}
            i={2}
            j={2}
            key={`${iter}4`}
            clock={clock}
          />
          <CellCouple
            columns={numberOfColumns}
            rows={numberOfRows}
            width={screenWidth / numberOfColumns}
            height={screenHeight / numberOfRows}
            i={3}
            j={3}
            key={`${iter}5`}
            clock={clock}
          />
        </Group>

        <Blur blur={1} />
        <BackdropBlur blur={60} />
        <Fill blendMode={'softLight'}>
          <Turbulence freqX={1} freqY={1} octaves={1} />
        </Fill>
        <DisplacementMap channelX="r" channelY="b" scale={20}>
          <Turbulence freqX={0.005} freqY={0.001} octaves={2} seed={4} />
        </DisplacementMap>
      </Canvas>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.3,
          backgroundColor: 'black',
        }}
      />
    </View>
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
