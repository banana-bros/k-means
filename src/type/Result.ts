import { Cluster } from './Cluster';

export interface Result {
    clusters: Cluster[];
    iterations: number;
    meanSquaredError: number;
    clusterIndices: number[];
}
