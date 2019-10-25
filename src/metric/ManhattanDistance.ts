import { Metric } from './Metric';
import { Vector } from '../type/Vector';

export class ManhattanDistance implements Metric {
    public calculate(vectorA: Vector, vectorB: Vector): number {
        if (vectorA == null || vectorB == null || vectorA.length !== vectorB.length) {
            throw new Error();
        }

        let sum = 0;

        for (let i = 0; i < vectorA.length; i++) {
            sum += Math.abs(vectorA[i] - vectorB[i]);
        }
        return sum;
    }
}
