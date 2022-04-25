import * as React from "react";
import { useEffect, useReducer } from "react";
import { Text, useWindowDimensions } from "react-native";
import {LineChart} from 'react-native-chart-kit';

import { useRecoilValue } from 'recoil';
import { accelerationAtom } from '../atoms';

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

export function Acceleration() {
  const acceleration = useRecoilValue(accelerationAtom);
  return (
    <Text>Acceleration: {Number(acceleration[0]).toFixed(2)} {Number(acceleration[1]).toFixed(2)} {Number(acceleration[2]).toFixed(2)}</Text>
  )
}

const chartData = { x: [0.0], y: [0.0], z: [0.0] };

function accelerationChartReducer(state, action) {
      return { x: [...state.x, action.payload[0]].slice(-20),
               y: [...state.y, action.payload[1]].slice(-20),
               z: [...state.z, action.payload[2]].slice(-20),
       }
}

export function AccelerometerChart() {

    const acceleration = useRecoilValue(accelerationAtom);

    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    const [chartAcceleration, accelerationChartDispatcher] = useReducer(accelerationChartReducer, chartData);

    useEffect(() => {
      accelerationChartDispatcher({type: 'acceleration', payload: acceleration});
      // console.log(chartAcceleration);
    }, [acceleration]);

    return (
      <LineChart
      data={{
        datasets: [
          { data: chartAcceleration.x, color: () => "#D35E60" },
          { data: chartAcceleration.y, color: () => "#84BA5B" },
          { data: chartAcceleration.z, color: () => "#7293CB" },
        ],
      }}
        bezier
        width={windowWidth}
        height={windowHeight - 200}
        chartConfig={chartConfig}
        />
    )
}

