import { Vector } from '../type/Vector';

export abstract class Metric {
    public abstract calculate(vectorA: Vector, vectorB: Vector): number;
}
