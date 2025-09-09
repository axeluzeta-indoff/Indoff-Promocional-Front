import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';
import HomePage from '../../pages/home/Home.page';
import AdminPage from '../../pages/admin/Admin.page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'admin', element: <AdminPage /> },
    ],
  },
]);
