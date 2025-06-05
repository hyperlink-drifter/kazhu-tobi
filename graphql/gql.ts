/* eslint-disable */
import * as types from './graphql.js';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetProducts($skip: Int, $take: Int, $filter: ProductFilterParameter) {\n    products(options: { skip: $skip, take: $take, filter: $filter }) {\n      totalItems\n      items {\n        id\n        name\n        slug\n        description\n        featuredAsset {\n          id\n          source\n          preview\n        }\n        assets {\n          id\n          source\n          preview\n        }\n        translations {\n          id\n          slug\n          name\n          description\n          languageCode\n        }\n      }\n    }\n  }\n": typeof types.GetProductsDocument,
    "\n  query GetProduct($id: ID, $slug: String) {\n    product(id: $id, slug: $slug) {\n      id\n      name\n      slug\n      description\n      featuredAsset {\n        id\n        source\n        preview\n      }\n      assets {\n        id\n        source\n        preview\n      }\n      translations {\n        id\n        slug\n        name\n        description\n        languageCode\n      }\n      optionGroups {\n        id\n        code\n        translations {\n          languageCode\n          name\n        }\n        options {\n          id\n          code\n          translations {\n            languageCode\n            name\n          }\n        }\n      }\n      variants {\n        id\n        sku\n        options {\n          id\n          code\n          group {\n            id\n            code\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetProductDocument,
};
const documents: Documents = {
    "\n  query GetProducts($skip: Int, $take: Int, $filter: ProductFilterParameter) {\n    products(options: { skip: $skip, take: $take, filter: $filter }) {\n      totalItems\n      items {\n        id\n        name\n        slug\n        description\n        featuredAsset {\n          id\n          source\n          preview\n        }\n        assets {\n          id\n          source\n          preview\n        }\n        translations {\n          id\n          slug\n          name\n          description\n          languageCode\n        }\n      }\n    }\n  }\n": types.GetProductsDocument,
    "\n  query GetProduct($id: ID, $slug: String) {\n    product(id: $id, slug: $slug) {\n      id\n      name\n      slug\n      description\n      featuredAsset {\n        id\n        source\n        preview\n      }\n      assets {\n        id\n        source\n        preview\n      }\n      translations {\n        id\n        slug\n        name\n        description\n        languageCode\n      }\n      optionGroups {\n        id\n        code\n        translations {\n          languageCode\n          name\n        }\n        options {\n          id\n          code\n          translations {\n            languageCode\n            name\n          }\n        }\n      }\n      variants {\n        id\n        sku\n        options {\n          id\n          code\n          group {\n            id\n            code\n          }\n        }\n      }\n    }\n  }\n": types.GetProductDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProducts($skip: Int, $take: Int, $filter: ProductFilterParameter) {\n    products(options: { skip: $skip, take: $take, filter: $filter }) {\n      totalItems\n      items {\n        id\n        name\n        slug\n        description\n        featuredAsset {\n          id\n          source\n          preview\n        }\n        assets {\n          id\n          source\n          preview\n        }\n        translations {\n          id\n          slug\n          name\n          description\n          languageCode\n        }\n      }\n    }\n  }\n"): typeof import('./graphql.js').GetProductsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProduct($id: ID, $slug: String) {\n    product(id: $id, slug: $slug) {\n      id\n      name\n      slug\n      description\n      featuredAsset {\n        id\n        source\n        preview\n      }\n      assets {\n        id\n        source\n        preview\n      }\n      translations {\n        id\n        slug\n        name\n        description\n        languageCode\n      }\n      optionGroups {\n        id\n        code\n        translations {\n          languageCode\n          name\n        }\n        options {\n          id\n          code\n          translations {\n            languageCode\n            name\n          }\n        }\n      }\n      variants {\n        id\n        sku\n        options {\n          id\n          code\n          group {\n            id\n            code\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql.js').GetProductDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
