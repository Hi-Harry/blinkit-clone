export interface Product {
  title: string;
  id: string;
  price: number;
  image: string;
  description: string;
  quantity?: number | undefined;
}