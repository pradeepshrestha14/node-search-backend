import { Product } from "../types";
import productsData from "../data/products.json";

/**
 * Repository layer: interacts with data source (for now manipulation and fetching from static JSON).
 * Functional, stateless, and easily mockable.
 */
export const getAllProducts = async (): Promise<Product[]> => {
  return productsData as Product[];
};

export const findProductsByQuery = async (query: string): Promise<Product[]> => {
  const lowerQ = query.toLowerCase();
  const all = productsData as Product[];
  return all.filter(
    (p) => p.title.toLowerCase().includes(lowerQ) || p.description?.toLowerCase().includes(lowerQ),
  );
};
