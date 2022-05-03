import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import * as React from "react";
import { RecoilRoot } from 'recoil';

import { RootScreen } from '@screens/rootScreen';

export default function App() {

  return (
    <NavigationContainer>
    <RecoilRoot>
      <RootScreen/>
    </RecoilRoot>
    </NavigationContainer>
  );
}

