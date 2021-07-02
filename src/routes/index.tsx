import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackRoutes from './auth.stack.routes';
import AppTabRoutes from './app.tab.routes';

import { useAuth } from '../hooks/auth';

function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user?.id ? <AppTabRoutes /> : <AuthStackRoutes />}
    </NavigationContainer>
  );
}

export default Routes;
