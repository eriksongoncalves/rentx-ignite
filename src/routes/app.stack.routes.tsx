import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Scheduling from '../screens/Scheduling';
import SchedulingDetail from '../screens/SchedulingDetail';
import MyCars from '../screens/MyCars';
import Confirmation from '../screens/Confirmation';

const { Navigator, Screen } = createStackNavigator();

function AppStackRoutes() {
  return (
    <Navigator headerMode="none" initialRouteName="Home">
      <Screen
        name="Confirmation"
        component={Confirmation}
        options={{ gestureEnabled: false }}
      />
      <Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }}
      />
      <Screen name="Detail" component={Detail} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetail" component={SchedulingDetail} />

      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}

export default AppStackRoutes;
