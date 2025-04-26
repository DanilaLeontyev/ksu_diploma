import React from 'react';
import { useSelector } from 'react-redux';
import { Product } from '../../types';
import { RootState } from '../../store/store';
import styles from './productCard.module.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onDeleteFromCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onDeleteFromCart,
}) => {
  const { name, description, price, image, id } = product;
  const cart = useSelector((state: RootState) => state.cart.cart);
  const currentItem = cart.find(item => item.id === id);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img alt={name} src={image} className={styles.image} />
      </div>

      <div className={styles.content}>
        <div>
          <h3 className={styles.title}>{name}</h3>
          <p>{description}</p>
        </div>

        <div className={styles.actions}>
          <span className={styles.price}>{price.toFixed(2)} ₽</span>

          {currentItem?.quantity ? (
            <div className={styles.quantityControls}>
              <button
                className={`${styles.button} ${styles.quantityButton}`}
                onClick={() => onDeleteFromCart(product)}
              >
                -
              </button>
              <span className={styles.quantity}>{currentItem.quantity}</span>
              <button
                className={`${styles.button} ${styles.quantityButton}`}
                onClick={() => onAddToCart(product)}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className={`${styles.button} ${styles.primaryButton}`}
              onClick={() => onAddToCart(product)}
            >
              Добавить
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
