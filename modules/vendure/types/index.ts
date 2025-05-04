import type {
  GetProductQuery,
  GetProductsQuery,
  GetCollectionQuery,
  GetTopLevelCollectionsQuery,
  GetCollectionProductsQuery,
} from '#gql';

// Product
export type VendureProduct = GetProductQuery['product'];
export type VendureProducts = GetProductsQuery['products'];

// Collection
type First<T extends any[]> = T[0];
export type VendureCollections = GetTopLevelCollectionsQuery['collections'];
export type VendureCollection = GetCollectionQuery['collection'];
export type VendureCollectionProducts = GetCollectionProductsQuery['search'];
export type VendureCollectionProduct = First<
  VendureCollectionProducts['items']
>;
