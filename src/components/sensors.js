import * as React from "react";
import { Text } from "react-native";

import { useRecoilValue } from 'recoil';

import { altitudeAtom, maxAltitudeAtom, accelerationAtom, rotationAtom } from '../atoms';

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
