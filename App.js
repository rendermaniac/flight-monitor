import * as React from "react";
import { RecoilRoot } from 'recoil';

import { RootScreen } from '@screens/rootScreen';

export default function App() {

  return (
    <RecoilRoot>
      <RootScreen/>
    </RecoilRoot>
  );
}

