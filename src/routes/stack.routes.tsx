import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Scheduling from '../screens/Scheduling';
import SchedulingDetail from '../screens/SchedulingDetail';
import SchedulingComplete from '../screens/SchedulingComplete';
import MyCars from '../screens/MyCars';
import Splash from '../screens/Splash';
import SignIn from '../screens/SignIn';

const { Navigator, Screen } = createStackNavigator();

function StackRoutes() {
  return (
    <Navigator headerMode="none" initialRouteName="SignIn">
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }}
      />
      <Screen name="Detail" component={Detail} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetail" component={SchedulingDetail} />
      <Screen
        name="SchedulingComplete"
        component={SchedulingComplete}
        options={{ gestureEnabled: false }}
      />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}

export default StackRoutes;
