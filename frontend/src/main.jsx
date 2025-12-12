import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';


import { ProductProvider } from './Admin/Context/ProductContext.jsX';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <RouterProvider router={router} >
        <App/>
        </RouterProvider>
    </ProductProvider>
  </StrictMode>
);
