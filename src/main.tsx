import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './pages/Layout/index.tsx';
import Order from './pages/Order/index.tsx';
import Cart from './pages/Cart/Cart.tsx';
import { store } from './store/store';
import Menu from './pages/Menu.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Menu />} />
            <Route path="cart" element={<Cart />} />
            <Route path="order/:cartId" element={<Order />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
