import {BadRequestException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Metric} from './metric.entity';
import {MetricPaginationDto} from './metric-pagination.dto';
import {PaginationCommand} from './pagination.command';
import {MetricConverter} from './metric.converter';

@Injectable()
export class MetricService {
    constructor(
        @InjectRepository(Metric) private readonly metricRepository: Repository<Metric>,
        private readonly metricConverter: MetricConverter
    ) {}

    async create(metric: Metric):Promise<Metric> {
        return this.metricRepository.save(metric);
    }

    async findAll(): Promise<Metric[]> {
        return this.metricRepository.find();
    }

    async findAllPaginated(pagination: PaginationCommand): Promise<MetricPaginationDto> {
        const startIndex = pagination ? (pagination.pageNumber - 1) * pagination.pageSize : 0;
        const [metrics, totalNbItems] = await this.metricRepository.findAndCount({
            order: this.getOrder(pagination),
            skip: startIndex,
            take: pagination?.pageSize || 10,
        });
        return new MetricPaginationDto(
            metrics.map(metric => this.metricConverter.convert(metric)),
            totalNbItems);
    }

    private getOrder(pagination: PaginationCommand) {
        if(!pagination || !pagination.sortedColumn || (!pagination.sortDirection && pagination.sortedColumn !== 'date')) {
            return null;
        } else if(!pagination.sortDirection) {
            return {[pagination.sortedColumn]: 'DESC'};
        }
        return {[pagination.sortedColumn] : pagination.sortDirection.toUpperCase()};
    }

}
