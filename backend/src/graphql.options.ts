import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      context: ({ req, res }) => ({ req, res }),
      subscriptions: {
        'graphql-ws': true, // For modern clients
        'subscriptions-transport-ws': true, // For legacy clients
      },
      resolverValidationOptions: {
        requireResolversForResolveType: 'ignore',
      },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      introspection: true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      fieldResolverEnhancers: ['guards'],
      driver: ApolloDriver,
    };
  }
}
