import { createBrowserRouter } from 'react-router';

import AppLayout from '../../../widgets/app-layout/ui/AppLayout';
import CartPage from '../../../pages/cart/ui/CartPage';
import CatalogPage from '../../../pages/catalog/ui/CatalogPage';
import HomePage from '../../../pages/home/ui/HomePage';
import LoginPage from '../../../pages/login/ui/LoginPage';
import NotFoundPage from '../../../pages/not-found/ui/NotFoundPage';
import ProductPage from '../../../pages/product/ui/ProductPage';
import ProfilePage from '../../../pages/profile/ui/ProfilePage';

import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/catalog',
        element: <CatalogPage />,
      },
      {
        path: '/product/:id',
        element: <ProductPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/cart',
            element: <CartPage />,
          },
          {
            path: '/profile',
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
