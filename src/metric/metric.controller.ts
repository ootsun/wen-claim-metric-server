import {Body, Controller, Get, Post} from '@nestjs/common';
import {MetricService} from './metric.service';
import {Metric} from './metric.entity';
import {MetricDto} from './metric.dto';
import {MetricCommand} from './metric.command';
import {MetricConverter} from './metric.converter';
import {MetricFactory} from './metric.factory';

@Controller("/metrics")
export class MetricController {
    constructor(
        private readonly metricService: MetricService,
        private readonly metricFactory: MetricFactory,
        private readonly metricConverter: MetricConverter) {
    }

    @Post()
    async create(@Body() metricCommand: MetricCommand) {
        await this.metricService.create(this.metricFactory.create(metricCommand));
    }

    @Get()
    async findAll(): Promise<MetricDto[]> {
        const metrics = await this.metricService.findAll()
        return metrics.map(metric => this.metricConverter.convert(metric));
    }
}
