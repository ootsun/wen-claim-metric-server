import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Metric} from './metric/metric.entity';
import {MetricModule} from './metric/metric.module';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {User} from './user/user.entity';

function buildConnectionString(configService: ConfigService) {
    let connectionString = configService.get('DB_PROTOCOL') + '://' + configService.get('DB_USERNAME')
        + ':' + configService.get('DB_PASSWORD') + '@' + configService.get('DB_HOST');
    if (Number.parseInt(configService.get('DB_PORT')) > 0) {
        connectionString += ':' + configService.get('DB_PORT');
    }
    connectionString += '/' + configService.get('DB_DATABASE_NAME');
    return connectionString;
}

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'mongodb',
                url: buildConnectionString(configService),
                useUnifiedTopology: true,
                entities: [Metric, User],
                synchronize: true,
            })
        }),
        MetricModule,
        UserModule,
        AuthModule
    ],
})
export class AppModule {
}
