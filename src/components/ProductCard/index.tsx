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
  const count = currentItem?.quantity || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteFromCart(product);
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img alt={name} src={image} className={styles.image} loading="lazy" />
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          <h3 className={styles.title}>{name}</h3>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.actions}>
          <span className={styles.price}>{price.toFixed(2)} ₽</span>

          {count > 0 ? (
            <div className={styles.countControls}>
              <button
                className={styles.countButton}
                onClick={handleRemoveFromCart}
              >
                −
              </button>
              <span className={styles.count}>{count}</span>
              <button className={styles.countButton} onClick={handleAddToCart}>
                +
              </button>
            </div>
          ) : (
            <button className={styles.primaryButton} onClick={handleAddToCart}>
              Добавить
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
