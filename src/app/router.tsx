//Archivo de enrutamiento como el autoroute en flutter que tiene la ruta / y llama al AppLayout que ya trae el footer y header
//previamente armado llama a HomePage y en el caso de admin llamara a la AdminPage
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout/AppLayout';
import { CategoriesPage } from '../modules/catalog/presentation';
import ProductDetailPage from '../modules/catalog/presentation/pages/ProductDetailPage';
import ComingSoon from '../utils/ComingSoon';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <CategoriesPage /> },
      {
        path: 'category/:categorySlug/:subSlug/:productSlug',
        element: <ProductDetailPage />,
      },
      {
        path: 'quote',
        element: (
          <ComingSoon
            title="Solicitar cotización"
            message="Estamos trabajando en esta sección, pronto podrás pedir tus cotizaciones aquí."
          />
        ),
      },
      {
        path: 'cart',
        element: (
          <ComingSoon
            title="Carrito de compras"
            message="Pronto podrás revisar y gestionar tus productos seleccionados aquí."
          />
        ),
      },
    ],
  },
  {
    path: '*',
    element: <div style={{ padding: 16 }}>404 - Página no encontrada</div>,
  },
]);

