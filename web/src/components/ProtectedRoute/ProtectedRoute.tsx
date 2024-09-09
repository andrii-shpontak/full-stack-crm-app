import { AbsoluteRoutes, LocalStorageKeys, LocalStorageService } from '../../utils';

import { Navigate } from 'react-router-dom';
import type { TRouteGuard } from '../../utils/types';

const ProtectedRoute = ({ element }: TRouteGuard) => {
  const token = LocalStorageService.getItem(LocalStorageKeys.Access);

  if (!token) {
    LocalStorageService.clear();
    return <Navigate to={AbsoluteRoutes.login} />;
  }

  return element;
};

export default ProtectedRoute;
