import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    return {
      context: ({ req, res }) => ({ req, res }),
      installSubscriptionHandlers: true,
      resolverValidationOptions: {
        requireResolversForResolveType: 'ignore',
      },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      introspection: true,
      playground: true,
      cors: false,
      fieldResolverEnhancers: ['guards'],
    };
  }
}
