import { Vector } from './Vector';

export class Cluster {
    private _vectors: Vector[] = [];
    private _lastCentroid: Vector = null;
    private _centroid: Vector = null;

    constructor() {}

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
        for (let i = 0; i < this._centroid.length; i++) {
            if (this._centroid[i] !== this.lastCentroid[i]) {
                return true;
            }
        }
        return false;
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
