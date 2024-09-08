import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { AbsoluteRoutes } from './utils';
import { FullScreenLoader } from './components';

const UserPage = lazy(() => import('./pages/user/User'));
const LoginPage = lazy(() => import('./pages/login/Login'));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<FullScreenLoader />}>
        <Routes>
          <Route path={AbsoluteRoutes.login} element={<LoginPage />} />
          <Route path={AbsoluteRoutes.user} element={<UserPage />} />
          <Route path='*' element={<Navigate to={AbsoluteRoutes.login} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
