import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/modules/auth.module';
import { UsersModule } from './user/modules/user.module';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import * as mongoosePopulate from 'mongoose-autopopulate';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(process.env.DATABASE_HOST, {
      connectionFactory: (connection) => {
        // applies plugin to all schema
        connection.plugin(mongoosePaginate);
        connection.plugin(mongoosePopulate);
        return connection;
      },
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
