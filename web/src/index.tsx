import './index.scss';

import AppRouter from './AppRouter';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <UserProvider>
    <AppRouter />
  </UserProvider>,
);
