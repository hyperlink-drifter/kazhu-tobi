import type { GetProductQuery, GetProductsQuery } from '#gql';

// Product
export type VendureProduct = GetProductQuery['product'];
export type VendureProducts = GetProductsQuery['products'];
