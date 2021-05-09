import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaService } from './prisma/prisma.service';
import { RestaurantsModule } from './restaurant/restaurant.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    RestaurantsModule,
    UsersModule,
    GraphQLModule.forRoot({
      debug: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
