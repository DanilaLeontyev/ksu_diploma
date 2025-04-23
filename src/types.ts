export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  paid: boolean;
  product: Product;
  productUID: string;
}
export interface OrderBackend {
  id: string;
  paid: string;
  product: Product;
  productUID: string;
}
