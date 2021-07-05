import { ReactNode } from 'react';

export type User = {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
};

export type AuthData = {
  token: string;
  user: User;
};

export type SignInCredentials = {
  email: string;
  password: string;
};

export type AuthContextProps = {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
};

export type AuthProviderProps = {
  children: ReactNode;
};
