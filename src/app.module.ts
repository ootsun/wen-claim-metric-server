import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Metric} from './metric/metric.entity';
import {MetricModule} from './metric/metric.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

let connectionString = process.env.DB_PROTOCOL + "://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST;
if(Number.parseInt(process.env.DB_PORT) > 0) {
  connectionString += ":" + process.env.DB_PORT;
}
connectionString += "/" + process.env.DB_DATABASE_NAME;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: connectionString,
      useUnifiedTopology: true,
      entities: [Metric],
      synchronize: true,
    }),
    MetricModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
