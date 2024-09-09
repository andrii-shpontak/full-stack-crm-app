import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { FullScreenLoader, Notification, ProtectedRoute } from './components';
import { Suspense, lazy } from 'react';

import { AbsoluteRoutes } from './utils';
import { useAppContext } from './context/UserContext';

const UserPage = lazy(() => import('./pages/user/User'));
const LoginPage = lazy(() => import('./pages/login/Login'));
const SignUpPage = lazy(() => import('./pages/signUp/SignUp'));

const AppRouter = () => {
  const { activeRequests } = useAppContext();

  return (
    <BrowserRouter>
      <Suspense fallback={<FullScreenLoader />}>
        <Routes>
          <Route path={AbsoluteRoutes.login} element={<LoginPage />} />
          <Route path={AbsoluteRoutes.user} element={<ProtectedRoute element={<UserPage />} />} />
          <Route path={AbsoluteRoutes.signUp} element={<SignUpPage />} />
          <Route path='*' element={<Navigate to={AbsoluteRoutes.login} />} />
        </Routes>
      </Suspense>
      <Notification />
      {!!activeRequests && <FullScreenLoader />}
    </BrowserRouter>
  );
};

export default AppRouter;
