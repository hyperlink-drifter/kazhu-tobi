import { graphql } from '@@/graphql';

export const GetProducts = graphql(`
  query GetProducts($skip: Int, $take: Int, $filter: ProductFilterParameter) {
    products(options: { skip: $skip, take: $take, filter: $filter }) {
      totalItems
      items {
        id
        name
        slug
        description
        featuredAsset {
          id
          source
          preview
        }
        assets {
          id
          source
          preview
        }
        translations {
          id
          slug
          name
          description
          languageCode
        }
      }
    }
  }
`);

export const GetProduct = graphql(`
  query GetProduct($id: ID, $slug: String) {
    product(id: $id, slug: $slug) {
      id
      name
      slug
      description
      featuredAsset {
        id
        source
        preview
      }
      assets {
        id
        source
        preview
      }
      translations {
        id
        slug
        name
        description
        languageCode
      }
      optionGroups {
        id
        code
        translations {
          languageCode
          name
        }
        options {
          id
          code
          translations {
            languageCode
            name
          }
        }
      }
      variants {
        id
        sku
        options {
          id
          code
          group {
            id
            code
          }
        }
      }
    }
  }
`);
