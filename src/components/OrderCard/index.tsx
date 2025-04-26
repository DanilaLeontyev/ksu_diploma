import { useDispatch, useSelector } from 'react-redux';
import { Order } from '../../types';
import { RootState } from '../../store/store';
import styles from './orderCard.module.css';

interface OrderCardProps {
  order: Order;
}

function OrderCard(props: OrderCardProps) {
  const { order } = props;
  const { product, paid, productUID } = order;
  const { name, price, image } = product;
  const dispatch = useDispatch();
  const productUIDs = useSelector((state: RootState) => state.cart.productUIDs);

  const isChecked = productUIDs.includes(productUID);

  return (
    <div className={styles.card}>
      <div className={styles.cover}>
        <img src={image} alt={name} className={styles.image} />
      </div>

      <h3 className={styles.cardTitle}>{name}</h3>

      <div className={styles.cardFooter}>
        <span className={styles.price}>{price.toFixed(2)} ₽</span>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={isChecked}
            disabled={paid}
            className={styles.checkboxInput}
          />
          <span className={styles.checkboxCustom} />
        </label>
      </div>
      <div>
        <span className={styles.price}>{price.toFixed(2)} ₽</span>
        <span>{paid.toString()}</span>
        <Checkbox
          disabled={paid}
          checked={isChecked}
          onChange={() => {
            dispatch(checkedForPaymentsIds(productUID));
          }}
        />
      </div>
    </div>
  );
}

export default OrderCard;
