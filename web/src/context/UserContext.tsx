import React, { ReactNode, createContext, useContext, useState } from 'react';
import type { TUser, TUserContextProps } from '../utils/types';

const UserContext = createContext<TUserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<TUser | null>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: user !== null,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
