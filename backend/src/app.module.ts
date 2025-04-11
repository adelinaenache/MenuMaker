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

@Module({
  imports: [
    RestaurantsModule,
    AuthModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      debug: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: 'schema.gql',
    }),
    UserModule,
    ItemModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
