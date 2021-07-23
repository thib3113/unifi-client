export interface INetworkStatus {
    average_satisfaction: number;
    health: string;
    historical_satisfaction: [number, number, number, number, number, number, number, number, number, number, number, number];
    reasons: Array<unknown>;
}
