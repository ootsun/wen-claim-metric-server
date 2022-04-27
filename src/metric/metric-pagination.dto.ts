import {Metric} from './metric.entity';
import {MetricDto} from './metric.dto';

export class MetricPaginationDto {

    constructor(
        public metrics: MetricDto[],
        public totalNbItems: number) {
    }

}
