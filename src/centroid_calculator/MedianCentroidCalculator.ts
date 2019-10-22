import { CentroidCalculator } from './CentroidCalculator';
import { Vector } from '../type/Vector';
import { Matrix } from '../type/Matrix';

export class MedianCentroidCalculator extends CentroidCalculator {
    public calculate(vectors: Vector[] | Matrix): Vector {
        const parts: Matrix = [];
        const result: Vector = [];

        for (let i = 0; i < vectors[0].length; i++) {
            parts[i] = [];
        }

        for (let i = 0; i < vectors.length; i++) {
            const vector = vectors[i];

            for (let j = 0; j < vector.length; j++) {
                parts[j].push(vector[j]);
            }
        }

        for (let i = 0; i < parts.length; i++) {
            parts[i] = parts[i].sort();
            let dataCount = parts[i].length;
            let index = (dataCount * 50 / 100) - 1;

            if (index % 0 > 1) {
                result[i] = (parts[i][index] + parts[i][index + 1]) / 2;
            } else {
                result[i] = parts[i][Math.ceil(index)];
            }
        }

        return result;
    }
}
