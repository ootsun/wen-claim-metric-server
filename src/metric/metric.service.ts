import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Metric} from './metric.entity';

@Injectable()
export class MetricService {
    constructor(
        @InjectRepository(Metric) private readonly metricRepository: Repository<Metric>
    ) {}

    async create(metric: Metric):Promise<Metric> {
        return this.metricRepository.save(metric);
    }

    async findAll(): Promise<Metric[]> {
        return this.metricRepository.find();
    }
}
