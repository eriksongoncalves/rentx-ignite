import React, { useState, createContext, useContext } from 'react';
import * as types from './types';
import api from '../services/api';

const AuthContext = createContext<types.AuthContextProps>(
  {} as types.AuthContextProps
);

const AuthProvider = ({ children }: types.AuthProviderProps) => {
  const [data, setData] = useState({} as types.AuthData);

  const signIn = async ({ email, password }: types.SignInCredentials) => {
    try {
      const { data } = await api.post<types.AuthData>('/sessions', {
        email,
        password
      });

      api.defaults.headers.authorization = `Bearer ${data.token}`;

      setData(data);
    } catch (error) {
      throw new Error('Login ou senha inválidos');
    }
  };

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
