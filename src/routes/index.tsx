import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackRoutes from './auth.stack.routes';
import AppTabRoutes from './app.tab.routes';

import { useAuth } from '../hooks/auth';
import { LoadingCar } from '../components';

function Routes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingCar />;
  }

  return (
    <NavigationContainer>
      {user?.id ? <AppTabRoutes /> : <AuthStackRoutes />}
    </NavigationContainer>
  );
}

export default Routes;
