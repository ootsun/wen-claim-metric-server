import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {MetricService} from './metric.service';
import {MetricDto} from './metric.dto';
import {MetricCommand} from './metric.command';
import {MetricConverter} from './metric.converter';
import {MetricFactory} from './metric.factory';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';

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

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<MetricDto[]> {
        const metrics = await this.metricService.findAll()
        return metrics.map(metric => this.metricConverter.convert(metric));
    }
}
