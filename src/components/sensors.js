import * as React from "react";
import { useEffect, useReducer } from "react";
import { Text } from "react-native";
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

const chartData = { altitude: [0.0] };

function chartReducer(state, action) {
  return { altitude: [...state.altitude, action.payload].slice(-20) };
}

export function AltitudeChart() {
    const altitude = useRecoilValue(altitudeAtom);

    const [chartAltitude, chartDispatcher] = useReducer(chartReducer, chartData);

    useEffect(() => {
      chartDispatcher({type: 'altitude', payload: altitude})
      console.log(chartAltitude.altitude);
    }, [altitude]);

    return (
      <LineChart
      data={{
        datasets: [
          {
            data: chartAltitude.altitude,
          }
        ],
        legend: ["Altitude"]
      }}
        width={500}
        height={220}
        chartConfig={chartConfig}
        />
    )
}


export function MaxAltitude() {
    const maxAltitude = useRecoilValue(maxAltitudeAtom);
    return (
      <Text>Max Altitude: {Number(maxAltitude).toFixed(2)}</Text>
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
