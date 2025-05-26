import type {
  GetProductQuery,
  GetProductsQuery,
  GetActiveOrderQuery,
  GetTopLevelCollectionsQuery,
  GetCollectionQuery,
  GetCollectionProductsQuery,
} from '#graphql-operations';

type First<T extends any[]> = T[0];

// Product
export type VendureProduct = GetProductQuery['product'];
export type VendureProducts = GetProductsQuery['products'];
export type VendureProductProp =
  | VendureProduct
  | First<VendureProducts['items']>;

// Order
export type VendureActiveOrder = GetActiveOrderQuery['activeOrder'];

// Collection
export type VendureCollections = GetTopLevelCollectionsQuery['collections'];
export type VendureCollection = GetCollectionQuery['collection'];
export type VendureCollectionProducts = GetCollectionProductsQuery['search'];
export type VendureCollectionProduct = First<
  VendureCollectionProducts['items']
>;
