export class MetricDto {
    readonly id: number;
    date: Date;
    readonly sessionId: string;
    readonly amount: number;
    readonly apr: number;
    readonly cost: number;
}
