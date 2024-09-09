import type { MouseEvent } from 'react';

export type TUser = {
  name: string;
  email: string;
  phone: string;
};

export type TUserContextProps = {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  isAuthenticated: boolean;
};

export type TRouteGuard = {
  element: JSX.Element;
};

export type TSignUpFormValues = TUser & {
  password: string;
  re_password: string;
};

export type TCustomInputProps = {
  label: string;
  name: string;
  placeholder: string;
  type: string;
  onClear: (e: MouseEvent<HTMLImageElement>) => void;
};
