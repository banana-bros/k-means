import { Vector } from './Vector';

export class Cluster {
    private _vectors: Vector[] = [];
    private _lastCentroid: Vector = null;
    private _centroid: Vector;

    constructor(centroid: Vector = null) {
        this.centroid = centroid;
    }

    public addVector(vector: Vector): void {
        this._vectors.push(vector);
    }

    public removeVector(vector: Vector): Vector {
        const index = this._vectors.indexOf(vector);
        let vectorToRemove: Vector = null;

        if (index > -1) {
            vectorToRemove = this._vectors[index];
            this._vectors.splice(index, 1);
        }

        return vectorToRemove;
    }

    public initCentroid(centroid: Vector): void {
        this._centroid = centroid;
    }

    public reset() {
        this._vectors = [];
    }

    public centroidHasChanged(): boolean {
        if (this._centroid === this._lastCentroid) {
            return false;
        }

        if (this._centroid === null || this._lastCentroid === null || this._centroid.length !== this._lastCentroid.length) {
            return true;
        }

        let hasChanged = false;

        for (let i = 0; i < this._centroid.length; i++) {
            if (this._centroid[i] !== this.lastCentroid[i]) {
                hasChanged = true;
                break;
            }
        }
        return hasChanged;
    }

    get centroid(): Vector {
        return this._centroid;
    }

    set centroid(centroid: Vector) {
        this._lastCentroid = this._centroid;
        this._centroid = centroid;
    }

    get lastCentroid(): Vector {
        return this._lastCentroid;
    }

    get vectors(): Vector[] {
        return this._vectors;
    }
}
