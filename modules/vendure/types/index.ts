import type {
  GetProductQuery,
  GetProductsQuery,
  GetTopLevelCollectionsQuery,
} from '#gql';

// Product
export type VendureProduct = GetProductQuery['product'];
export type VendureProducts = GetProductsQuery['products'];

// Collection
export type VendureCollections = GetTopLevelCollectionsQuery['collections'];
