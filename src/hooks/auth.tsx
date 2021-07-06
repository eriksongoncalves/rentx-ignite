import React, { useState, useEffect, createContext, useContext } from 'react';
import * as types from './types';
import api from '../services/api';
import { database } from '../database';
import { User as ModelUser } from '../database/models/User';

const AuthContext = createContext<types.AuthContextProps>(
  {} as types.AuthContextProps
);

const AuthProvider = ({ children }: types.AuthProviderProps) => {
  const [data, setData] = useState<types.User>({} as types.User);
  const [loading, setLoading] = useState(true);

  const signIn = async ({ email, password }: types.SignInCredentials) => {
    try {
      const { data } = await api.post<types.AuthData>('/sessions', {
        email,
        password
      });

      api.defaults.headers.authorization = `Bearer ${data.token}`;

      const userCollection = database.get<ModelUser>('users');
      await database.action(async () => {
        await userCollection.create(newUser => {
          newUser.user_id = data.user.id;
          newUser.name = data.user.name;
          newUser.email = data.user.email;
          newUser.driver_license = data.user.driver_license;
          newUser.avatar = data.user.avatar;
          newUser.token = data.token;
        });
      });

      setData({
        ...data.user,
        token: data.token
      });
    } catch (error) {
      throw new Error('Login ou senha inválidos');
    }
  };

  const signOut = async () => {
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.action(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });

      setData({} as types.User);
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateUser = async (user: types.User) => {
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.action(async () => {
        const userSelected = await userCollection.find(user.id);
        await userSelected.update(userData => {
          userData.name = user.name;
          userData.driver_license = user.driver_license;
          userData.avatar = user.avatar;
        });
      });

      setData(user);

      setData({} as types.User);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<ModelUser>('users');
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as types.User;
        api.defaults.headers.authorization = `Bearer ${userData.token}`;
        setData(userData);
        setLoading(false);
      }
    }

    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data, signIn, signOut, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
