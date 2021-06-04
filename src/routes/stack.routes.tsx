import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Scheduling from '../screens/Scheduling';
import SchedulingDetail from '../screens/SchedulingDetail';
import SchedulingComplete from '../screens/SchedulingComplete';

const { Navigator, Screen } = createStackNavigator();

function StackRoutes() {
  return (
    <Navigator headerMode="none">
      <Screen name="Home" component={Home} />
      <Screen name="Detail" component={Detail} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetail" component={SchedulingDetail} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
    </Navigator>
  );
}

export default StackRoutes;
