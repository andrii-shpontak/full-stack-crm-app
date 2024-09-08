export type TUser = {
  name: string;
};

export type TUserContextProps = {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  isAuthenticated: boolean;
};
