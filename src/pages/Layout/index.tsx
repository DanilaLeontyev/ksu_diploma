import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Link, Outlet } from 'react-router';
import styles from './Layout.module.css';

function Layout() {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link to="/" className={styles.logoLink}>
          <span className={styles.logo}>BIRCH</span>
        </Link>
        <Link to="/cart" className={styles.cartButton}>
          Заказ {totalPrice > 0 && ` / ${totalPrice.toFixed(2)}₽`}
        </Link>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
