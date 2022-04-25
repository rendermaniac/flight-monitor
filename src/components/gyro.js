import * as React from "react";
import { useEffect, useReducer } from "react";
import { Text, useWindowDimensions } from "react-native";
import {LineChart} from 'react-native-chart-kit';

import { useRecoilValue } from 'recoil';
import { rotationAtom } from '../atoms';

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

export function Rotation() {
  const rotation = useRecoilValue(rotationAtom);
  return (
    <Text>Rotation: {Number(rotation[0]).toFixed(2)} {Number(rotation[1]).toFixed(2)} {Number(rotation[2]).toFixed(2)}</Text>
  )
}

const chartData = { x: [0.0], y: [0.0], z: [0.0] };

function rotationChartReducer(state, action) {
      return { x: [...state.x, action.payload[0]].slice(-20),
               y: [...state.y, action.payload[1]].slice(-20),
               z: [...state.z, action.payload[2]].slice(-20),
       }
}

export function GyroChart() {

    const rotation = useRecoilValue(rotationAtom);

    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    const [chartRotation, rotationChartDispatcher] = useReducer(rotationChartReducer, chartData);

    useEffect(() => {
      rotationChartDispatcher({type: 'rotation', payload: rotation});
      // console.log(chartRotation);
    }, [rotation]);

    return (
      <LineChart
      data={{
        datasets: [
          { data: chartRotation.x, color: () => "#D35E60" },
          { data: chartRotation.y, color: () => "#84BA5B" },
          { data: chartRotation.z, color: () => "#7293CB" },
        ],
      }}
        bezier
        width={windowWidth}
        height={windowHeight - 200}
        chartConfig={chartConfig}
        />
    )
}

