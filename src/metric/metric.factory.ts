import {Injectable} from '@nestjs/common';
import {MetricCommand} from './metric.command';
import {Metric} from './metric.entity';

@Injectable()
export class MetricFactory {

    create(command: MetricCommand): Metric {
        const metric = new Metric();
        metric.date = new Date();
        metric.amount = command.amount;
        metric.apr = command.apr;
        metric.cost = command.cost;
        return metric;
    }
}
