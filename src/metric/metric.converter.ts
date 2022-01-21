import {Injectable} from '@nestjs/common';
import {Metric} from './metric.entity';
import {MetricDto} from './metric.dto';

@Injectable()
export class MetricConverter {

    convert(entity: Metric) {
        return new MetricDto(
            entity.id,
            entity.date,
            entity.sessionId,
            entity.amount,
            entity.apr,
            entity.cost
        )
    }
}
