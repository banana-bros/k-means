import { Metric } from '../metric/Metric';
import { CentroidCalculator } from '../centroid_calculator/_index';
import { Vector } from './Vector';
import { Matrix } from './Matrix';

export enum CentroidSelection {
    RANDOM,
    PREDEFINED,
    KMEANSPLUSPLUS
}

export interface Options {
    metric?: Metric;
    centroidCalculator?: CentroidCalculator;
    clusterCount?: number;
    maxIterations?: number;
    centroidSelection?: CentroidSelection;
    centroids?: Vector[] | Matrix;
}
