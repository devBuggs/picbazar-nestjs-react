import type { Author } from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import invariant from 'tiny-invariant';
import { addApolloState, initializeApollo } from './client';
import { PRODUCTS_PER_PAGE } from './client/variables';
import {
  AuthorDocument,
  AuthorQuery,
  AuthorsDocument,
  AuthorsQuery,
} from './gql/authors.graphql';
import { ProductsDocument } from './gql/products.graphql';
import { SettingsDocument } from './gql/settings.graphql';
import { getProducts } from './utils/products';

// This function gets called at build time
type ParsedQueryParams = {
  author: string;
};
// @ts-ignore
export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async ({
  locales,
}) => {
  invariant(locales, 'locales is not defined');
  const apolloClient = initializeApollo();
  const {
    data: { authors },
  } = await apolloClient.query<AuthorsQuery>({
    query: AuthorsDocument,
    variables: {
      first: 100,
    },
  });
  invariant(authors, 'authors is not defined');
  const paths = authors?.data.flatMap((shop) =>
    locales?.map((locale) => ({ params: { author: shop.slug }, locale }))
  );
  return {
    paths,
    fallback: 'blocking',
  };
};
type PageProps = {
  author: Author;
};
export const getStaticProps: GetStaticProps<
  PageProps,
  ParsedQueryParams
> = async ({ params, locale }) => {
  const apolloClient = initializeApollo();
  const { author } = params!;
  await apolloClient.query({
    query: SettingsDocument,
    variables: {
      language: locale
    }
  });
  const { data } = await apolloClient.query<AuthorQuery>({
    query: AuthorDocument,
    variables: { 
      slug: author, 
      language: locale 
    },
  });

  const productVariables = {
    limit: PRODUCTS_PER_PAGE,
    author,
    language: locale
  }

  await apolloClient.query({
    query: ProductsDocument,
    variables: getProducts(productVariables),
  });

  if (!data?.author) {
    return {
      notFound: true,
    };
  }
  return addApolloState(apolloClient, {
    props: {
      author: data.author,
      variables: {
        limit: PRODUCTS_PER_PAGE,
        author,
      },
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    revalidate: 60,
  });
};
