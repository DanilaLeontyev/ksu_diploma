import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Link, Outlet } from 'react-router';
import styles from './layout.module.css';

function Layout() {
  const cart = useSelector((state: RootState) => state.cart.cart);

  const price = cart
    .reduce((prev, cur) => (prev += cur.price * cur.quantity), 0)
    .toFixed(2);

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className={styles.logo}>BIRCH</span>
        </Link>
        <button className={styles.cartButton}>
          <Link to="/cart" className={styles.cartLink}>
            Заказ {price === '0.00' ? '' : ` / ${price}₽`}
          </Link>
        </button>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
