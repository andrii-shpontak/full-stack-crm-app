import type { MouseEvent } from 'react';
import { NotificationType } from '../enums';
import { URLS } from '../constants';

export type TUser = {
  name: string;
  email?: string;
  phone: string;
};

export type TUserContextProps = {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  isAuthenticated: boolean;
  notificationState: TNotificationState;
  setNotificationState: React.Dispatch<React.SetStateAction<TNotificationState>>;
  activeRequests: number;
  setActiveRequests: React.Dispatch<React.SetStateAction<number>>;
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

export type UrlsType = keyof typeof URLS;

export type TLoginFormValues = {
  username: string;
  password: string;
};

export type TLoginResponse = {
  access_token: string;
  refresh_token: string;
  user_id: string;
};

export type TNotification = {
  text: string;
  title?: string;
  type: NotificationType;
  id: string;
};

export type TNotificationState = {
  notifications: TNotification[];
};

export type TNotificationProvider = {
  notification: TNotification;
  handleClose: (n: TNotification) => void;
};
