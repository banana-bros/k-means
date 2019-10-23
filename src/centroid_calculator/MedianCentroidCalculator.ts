import { CentroidCalculator } from './CentroidCalculator';
import { Vector } from '../type/Vector';
import { Matrix } from '../type/Matrix';

export class MedianCentroidCalculator extends CentroidCalculator {
    public calculate(vectors: Vector[] | Matrix): Vector {
        const parts: Matrix = this.createParts(vectors);

        this.transpose(parts, vectors);
        return this.calculateMean(parts);
    }

    private createParts(vectors: Vector[] | Matrix): Matrix {
        const parts: Matrix = [];

        for (let i = 0; i < vectors[0].length; i++) {
            parts[i] = [];
        }

        return parts;
    }

    private transpose(parts: Matrix, vectors: Vector[] | Matrix): void {
        for (let i = 0; i < vectors.length; i++) {
            const vector = vectors[i];

            for (let j = 0; j < vector.length; j++) {
                parts[j].push(vector[j]);
            }
        }
    }

    private calculateMean(parts: Matrix): Vector {
        const result: Vector = [];

        for (let i = 0; i < parts.length; i++) {
            parts[i] = parts[i].sort();
            let dataCount = parts[i].length;
            let index = (dataCount / 2) - 1;

            if (index % 1 > 0) {
                result[i] = parts[i][Math.ceil(index)];
            } else {
                result[i] = (parts[i][index] + parts[i][index + 1]) / 2;
            }
        }

        return result;
    }
}
