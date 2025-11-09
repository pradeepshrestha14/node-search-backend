import { getAllProducts, findProductsByQuery } from "../repositories/productRepository";

interface SearchParams {
  query?: string;
  page: number;
  limit: number;
}

export const getProducts = async ({ query, page, limit }: SearchParams) => {
  const allProducts = await getAllProducts();

  let filtered = allProducts;
  if (query) {
    filtered = await findProductsByQuery(query);
  }

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return {
    total: filtered.length,
    page,
    limit,
    products: paginated,
  };
};
