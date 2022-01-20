import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricService } from './metric.service';
import { MetricController } from './metric.controller';
import {Metric} from './metric.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Metric])],
    providers: [MetricService],
    controllers: [MetricController],
})
export class MetricModule {}
