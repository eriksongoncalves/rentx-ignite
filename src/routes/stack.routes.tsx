import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Scheduling from '../screens/Scheduling';
import SchedulingDetail from '../screens/SchedulingDetail';
import MyCars from '../screens/MyCars';
import Splash from '../screens/Splash';
import SignIn from '../screens/SignIn';
import SignUpFirstStep from '../screens/SignUp/FirstStep';
import SignUpSecondStep from '../screens/SignUp/SecondStep';
import Confirmation from '../screens/Confirmation';

const { Navigator, Screen } = createStackNavigator();

function StackRoutes() {
  return (
    <Navigator headerMode="none" initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
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

export default StackRoutes;
