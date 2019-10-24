import { Vector } from '../type/Vector';

export interface Metric {
    calculate(vectorA: Vector, vectorB: Vector): number;
}
