import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { FullScreenLoader } from './components';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<FullScreenLoader />}></Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
