import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricService } from './metric.service';
import { MetricController } from './metric.controller';
import {Metric} from './metric.entity';
import {MetricFactory} from './metric.factory';
import {MetricConverter} from './metric.converter';

@Module({
    imports: [TypeOrmModule.forFeature([Metric])],
    providers: [MetricService, MetricFactory, MetricConverter],
    controllers: [MetricController],
})
export class MetricModule {}
