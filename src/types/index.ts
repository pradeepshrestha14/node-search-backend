export interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  rating?: number;
  category?: string;
  thumbnail?: string;
  brand?: string;
}

export interface SearchParams {
  query?: string;
  page: number;
  limit: number;
}
