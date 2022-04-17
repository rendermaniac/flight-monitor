import {atom} from 'recoil';

export const altitudeAtom = atom({
  key: "altitude",
  default: 0.0,
});

export const maxAltitudeAtom = atom({
  key: "maxAltitude",
  default: 0.0,
});

export const accelerationAtom = atom({
  key: "acceleration",
  default: [0.0, 0.0, 0.0],
});

export const rotationAtom = atom({
  key: "rotation",
  default: [0.0, 0.0, 0.0],
});