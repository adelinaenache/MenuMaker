import { useMemo } from 'react';
import merge from 'deepmerge';
import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ACCESS_TOKEN, getToken } from '@/utils/token';

export const APOLLO_STATE_PROPERTY_NAME = '__APOLLO_STATE__';
export const COOKIES_TOKEN_NAME = 'jwt';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/graphql';

interface PageProps {
  props?: Record<string, any>;
  [APOLLO_STATE_PROPERTY_NAME]?: any;
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: API_URL,
    // credentials: "include",
  });

  const authLink = setContext((_, { headers }) => {
    // Get the authentication token from cookies
    const token = getToken(ACCESS_TOKEN);

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
  const client = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = client.extract();

    // Merge the existing cache into data passed from
    // getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    client.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return client;
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = client;
  }

  return client;
}

export function addApolloState(client: ApolloClient<NormalizedCacheObject>, pageProps: PageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROPERTY_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: PageProps) {
  const state = pageProps[APOLLO_STATE_PROPERTY_NAME];
  return useMemo(() => initializeApollo(state), [state]);
}
