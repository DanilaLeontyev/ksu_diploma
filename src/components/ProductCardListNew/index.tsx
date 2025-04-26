import React from 'react';
import { useDispatch } from 'react-redux';
import { useGetAllProductsQuery } from '../../store/api/productApi';
import ProductCard from '../ProductCardNew';
import { addToCart, deleteFromCart } from '../../store/cartSlice';
import styles from './productCardList.module.css';
import Loader from '../Loader';

const ProductCardList: React.FC = () => {
  const { data, error, isLoading } = useGetAllProductsQuery(undefined);
  const dispatch = useDispatch();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  if (data) {
    return (
      <div className={styles.productCardList}>
        {data.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={product => dispatch(addToCart(product))}
            onDeleteFromCart={product => dispatch(deleteFromCart(product))}
          />
        ))}
      </div>
    );
  }
};

export default ProductCardList;
