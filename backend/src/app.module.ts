import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaService } from './prisma/prisma.service';
import { RestaurantsModule } from './restaurant/restaurant.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ItemModule } from './item/item.module';
import { CategoryModule } from './category/category.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    RestaurantsModule,
    AuthModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      debug: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: 'schema.gql',
      formatError: (error) => {
        // Log the error for debugging
        console.error('GraphQL Error:', error);

        // Return a clean error response
        return {
          message: error.message,
          code: error.extensions?.code || 'INTERNAL_ERROR',
          path: error.path,
        };
      },
    }),
    UserModule,
    ItemModule,
    CategoryModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
