import { useDispatch, useSelector } from 'react-redux';
import { Order } from '../../types';
import { RootState } from '../../store/store';
import { checkedForPaymentsIds } from '../../store/cartSlice';
import styles from './orderCard.module.css';

interface OrderCardProps {
  order: Order;
}

function OrderCard({ order }: OrderCardProps) {
  const { product, paid, productUID } = order;
  const { name, price, image } = product;
  const dispatch = useDispatch();
  const productUIDs = useSelector((state: RootState) => state.cart.productUIDs);

  const isChecked = productUIDs.includes(productUID);
  const statusText = paid ? 'Оплачено' : 'Не оплачено';
  const statusClass = paid ? styles.paid : styles.notPaid;

  const handleCardClick = () => {
    if (!paid) {
      dispatch(checkedForPaymentsIds(productUID));
    }
  };

  return (
    <article
      className={`${styles.card} ${paid ? styles.disabled : ''}`}
      onClick={handleCardClick}
    >
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} loading="lazy" />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>

        <div className={styles.footer}>
          <div className={styles.price}>{price.toFixed(2)}₽</div>

          {!paid && (
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isChecked}
                className={styles.checkboxInput}
                readOnly
              />
            </label>
          )}
        </div>

        <div className={statusClass}>{statusText}</div>
      </div>
    </article>
  );
}

export default OrderCard;
