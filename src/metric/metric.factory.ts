import {BadRequestException, Injectable} from '@nestjs/common';
import {MetricCommand} from './metric.command';
import {Metric} from './metric.entity';

@Injectable()
export class MetricFactory {

    create(command: MetricCommand): Metric {
        if(!command || !command.sessionId || !command.amount || !command.apr || !command.cost) {
            throw new BadRequestException();
        }
        const metric = new Metric();
        metric.date = new Date();
        metric.sessionId = command.sessionId;
        metric.amount = command.amount;
        metric.apr = command.apr;
        metric.cost = command.cost;
        return metric;
    }
}
