import * as React from "react";
import { useEffect, useReducer } from "react";
import { Text, useWindowDimensions } from "react-native";
import {LineChart} from 'react-native-chart-kit';

import { useRecoilValue } from 'recoil';
import { altitudeAtom, maxAltitudeAtom, accelerationAtom, rotationAtom } from '../atoms';

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#001d3d",
  // backgroundGradientTo: "#ffa726",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "3",
    strokeWidth: "2",
    stroke: "#001d3d"
  }
};

export function Altitude() {
  const altitude = useRecoilValue(altitudeAtom);
  return (
    <Text>Altitude: {Number(altitude).toFixed(2)}</Text>
  )
}

export function MaxAltitude() {
  const maxAltitude = useRecoilValue(maxAltitudeAtom);
  return (
    <Text>Max Altitude: {Number(maxAltitude).toFixed(2)}</Text>
  )
}

const chartData = { altitude: [0.0], maxAltitude: [0.0] };

function chartReducer(state, action) {
  switch (action.type) {
    case "altitude":
      return { altitude: [...state.altitude, action.payload].slice(-20), maxAltitude: state.maxAltitude }
    case "maxAltitude":
      return { altitude: state.altitude, maxAltitude: [...state.maxAltitude, action.payload].slice(-20)}
    default:
      return state;
  }
}

export function AltitudeChart() {

    const altitude = useRecoilValue(altitudeAtom);
    const maxAltitude = useRecoilValue(maxAltitudeAtom);

    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    const [chartAltitude, chartDispatcher] = useReducer(chartReducer, chartData);

    useEffect(() => {
      chartDispatcher({type: 'altitude', payload: altitude});
      chartDispatcher({type: 'maxAltitude', payload: maxAltitude});
    }, [altitude, maxAltitude]);

    return (
      <LineChart
      data={{
        datasets: [
          { data: chartAltitude.altitude, color: () => '#C7EBFF' },
          { data: chartAltitude.maxAltitude }
        ],
      }}
        bezier
        width={windowWidth}
        height={windowHeight - 100}
        chartConfig={chartConfig}
        />
    )
}

export function Acceleration() {
    const acceleration = useRecoilValue(accelerationAtom);
    return (
      <Text>Acceleration: {Number(acceleration[0]).toFixed(2)} {Number(acceleration[1]).toFixed(2)} {Number(acceleration[2]).toFixed(2)}</Text>
    )
  }
  
export function Rotation() {
    const rotation = useRecoilValue(rotationAtom);
    return (
      <Text>Rotation: {Number(rotation[0]).toFixed(2)} {Number(rotation[1]).toFixed(2)} {Number(rotation[2]).toFixed(2)}</Text>
    )
  }
