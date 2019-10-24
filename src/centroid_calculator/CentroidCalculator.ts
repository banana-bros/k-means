import { Vector } from '../type/Vector';

export interface CentroidCalculator {
    calculate(vectors: Vector[]): Vector;
}
