import {Body, Controller, Get, Post} from '@nestjs/common';
import {MetricService} from './metric.service';
import {Metric} from './metric.entity';
import {MetricDto} from './metric.dto';

@Controller()
export class MetricController {
    constructor(private readonly metricService: MetricService) {
    }

    @Post()
    async create(@Body() metricDto: MetricDto) {
        await this.metricService.create(metricDto);
    }

    @Get()
    findAll(): Promise<Metric[]> {
        return this.metricService.findAll();
    }
}
