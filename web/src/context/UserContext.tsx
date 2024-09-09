import React, { ReactNode, createContext, useContext, useState } from 'react';
import type { TNotificationState, TUser, TUserContextProps } from '../utils/types';

const UserContext = createContext<TUserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [notificationState, setNotificationState] = useState<TNotificationState>({ notifications: [] });
  const [activeRequests, setActiveRequests] = useState<number>(0);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: user !== null,
        notificationState,
        setNotificationState,
        activeRequests,
        setActiveRequests,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAppContext must be used within a UserProvider');
  }
  return context;
};
