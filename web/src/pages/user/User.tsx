import './User.scss';

import { AbsoluteRoutes, LocalStorageService } from '../../utils';

import { useAppContext } from '../../context/UserContext';
import { useCallback } from 'react';
import { useGetUserData } from './hooks';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();

  useGetUserData();
  const { user } = useAppContext();

  const handleLogout = useCallback(() => {
    navigate(AbsoluteRoutes.login);
    LocalStorageService.clear();
  }, [navigate]);

  return (
    <div className='userPage'>
      <button className='logoutBtn' onClick={handleLogout}>
        Logout
      </button>
      <h3>User</h3>
      {!!user && (
        <div className='userData'>
          <p>
            <span>User name</span>
            <span>{user.name}</span>
          </p>
          <p>
            <span>Phone number</span>
            <span>{user.phone}</span>
          </p>
          {!!user.email && (
            <p>
              <span>Email</span>
              <span>{user.email}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default User;
