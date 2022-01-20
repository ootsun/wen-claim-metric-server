import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Metric} from './metric.entity';
import {MetricDto} from './metric.dto';

@Injectable()
export class MetricService {
    constructor(
        @InjectRepository(Metric)
        private readonly metricRepository: Repository<Metric>,
    ) {}

    async create(metricDto: MetricDto):Promise<Metric> {
        return this.metricRepository.save(metricDto);
    }

    async findAll(): Promise<Metric[]> {
        return this.metricRepository.find();
    }
}
