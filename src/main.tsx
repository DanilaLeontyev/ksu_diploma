import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router';
// import Layout from "./pages/Layout.tsx";
import Menu from './pages/Menu.tsx';
import Cart from './pages/Cart.tsx';
import Order from './pages/Order.tsx';
import Layout from './pages/LayoutNew';

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
