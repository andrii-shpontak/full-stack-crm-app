import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { FullScreenLoader, ProtectedRoute } from './components';
import { Suspense, lazy } from 'react';

import { AbsoluteRoutes } from './utils';

const UserPage = lazy(() => import('./pages/user/User'));
const LoginPage = lazy(() => import('./pages/login/Login'));
const SignUpPage = lazy(() => import('./pages/signUp/SignUp'));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<FullScreenLoader />}>
        <Routes>
          <Route path={AbsoluteRoutes.login} element={<LoginPage />} />
          <Route path={AbsoluteRoutes.user} element={<ProtectedRoute element={<UserPage />} />} />
          <Route path={AbsoluteRoutes.signUp} element={<ProtectedRoute element={<SignUpPage />} />} />
          <Route path='*' element={<Navigate to={AbsoluteRoutes.login} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
