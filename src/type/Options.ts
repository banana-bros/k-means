import { Metric } from '../metric/Metric';
import { CentroidCalculator } from '../centroid_calculator/_index';
import { Vector } from './Vector';
import { Matrix } from './Matrix';

export interface Options {
    metric?: Metric;
    centroidCalculator?: CentroidCalculator;
    clusterCount?: number;
    maxIterations?: number;
    centroids?: Vector[] | Matrix;
}
