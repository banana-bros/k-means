import { CentroidCalculator } from './CentroidCalculator';
import { Vector } from '../type/Vector';
import { Matrix } from '../type/Matrix';

export class MeanCentroidCalculator extends CentroidCalculator {
    public calculate(vectors: Vector[] | Matrix): Vector {
        const result: Vector = [];

        for (let i = 0; i < vectors.length; i++) {
            this.sumUpVectors(result, vectors[i]);
        }

        for (let k = 0; k < result.length; k++) {
            result[k] /= vectors.length;
        }

        return result;
    }

    private sumUpVectors(result: Vector, vector: Vector): void {
        for (let j = 0; j < vector.length; j++) {
            if (!result[j]) {
                result[j] = 0;
            }
            result[j] += vector[j];
        }
    }
}
