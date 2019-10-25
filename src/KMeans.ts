import { Cluster } from './type/Cluster';
import { EuclidianDistance } from './metric/EuclidianDistance';
import { MeanCentroidCalculator } from './centroid_calculator/MeanCentroidCalculator';
import { Vector } from './type/Vector';
import { Matrix } from './type/Matrix';
import { Result } from './type/Result';
import { Options, CentroidSelection, EmptyAction } from './type/Options';

export class KMeans {
    private _vectors: Vector[] | Matrix = [];
    private _clusters: Cluster[] = [];
    private _meanSquaredError: number;
    private options: Options = {
        metric: new EuclidianDistance(),
        centroidCalculator: new MeanCentroidCalculator(),
        clusterCount: 1,
        maxIterations: 100,
        centroidSelection: CentroidSelection.RANDOM,
        centroids: null,
        emptyAction: EmptyAction.DROP
    };

    constructor(options: Options = {}) {
        this.options = { ...this.options, ...options };
    }

    public fit(vectors: Vector[] | Matrix): Result {
        this.prepareIteration(vectors);
        const iterations = this.iterate();
        this.calculateMeanSquaredError();

        return {
            clusters: this.clusters,
            iterations: iterations,
            meanSquaredError: this.meanSquaredError
        };
    }

    public predict(vectors: Vector[] | Matrix): number[] {
        let result: number[] = [];

        for (const vector of vectors) {
            const nearestCluster = this.getNearestCluster(vector);
            result.push(this.clusters.indexOf(nearestCluster));
        }

        return result;
    }

    private prepareIteration(vectors: Vector[] | Matrix): void {
        this._vectors = vectors;
        this._clusters = [];
        this.generateStartingClusters();
    }

    private iterate(): number {
        let centroidsHaveChanged = true;
        let iterations = 0;

        while (iterations < this.options.maxIterations && centroidsHaveChanged) {
            this.next();
            iterations++;
            centroidsHaveChanged = this.centroidsHaveChanged();
        }

        return iterations;
    }

    private generateStartingClusters() {
        switch (this.options.centroidSelection) {
            case CentroidSelection.RANDOM:
                this.generateStartingClustersByRandomCentroids();
                break;
            case CentroidSelection.PREDEFINED:
                this.generateStartingClustersByGivenCentroids();
                break;
            case CentroidSelection.KMEANSPLUSPLUS:
                this.generateStartingClustersByKMeansPlusPlus();
                break;
            default:
                throw new Error(`${this.options.centroidSelection} is not a valid centroid selection.`);
        }
    }

    private generateStartingClustersByRandomCentroids() {
        for (let i = 0; i < this.options.clusterCount; i++) {
            const index = Math.round(Math.random() * this.vectors.length - 1);
            const centroid = this.vectors[index];
            this.clusters.push(new Cluster(centroid));
        }
    }

    private generateStartingClustersByGivenCentroids() {
        if (this.options.centroids === null || this.options.centroids.length !== this.options.clusterCount) {
            throw new Error(`Number of centroids must equal ${this.options.clusterCount}`);
        }

        for (let i = 0; i < this.options.clusterCount; i++) {
            const cluster = new Cluster();

            cluster.centroid = this.options.centroids[i];
            this.clusters.push(cluster);
        }
    }

    private generateStartingClustersByKMeansPlusPlus() {
        const randomIndex = Math.round(Math.random() * this.vectors.length - 1);
        let newCluster = new Cluster(this.vectors[randomIndex]);

        this.clusters.push(newCluster);

        for (let i = 1; i < this.options.clusterCount; i++) {
            const res = this.generateNextCluster();

            newCluster = new Cluster();
            newCluster.centroid = res;
            this.clusters.push(newCluster);
        }
    }

    private generateNextCluster(): Vector {
        let res: Vector;
        let high = -Infinity;

        for (const vector of this.vectors) {
            const nearest = this.getNearestCluster(vector);
            let dist = this.options.metric.calculate(vector, nearest.centroid);

            if (dist > high) {
                res = vector;
                high = dist;
            }
        }

        return res;
    }

    private calculateMeanSquaredError() {
        this._meanSquaredError = 0;

        for (const cluster of this.clusters) {
            for (const vector of cluster.vectors) {
                const distance = this.options.metric.calculate(vector, cluster.centroid);
                this._meanSquaredError += Math.pow(distance, 2);
            }
        }

        this._meanSquaredError /= this.vectors.length;
    }

    private centroidsHaveChanged(): boolean {
        let centroidsHaveChanged = false;

        for (const cluster of this.clusters) {
            centroidsHaveChanged = centroidsHaveChanged || cluster.centroidHasChanged();
        }

        return centroidsHaveChanged;
    }

    private next(): void {
        for (const cluster of this.clusters) {
            cluster.reset();
        }

        for (const vector of this.vectors) {
            const nearestCluster = this.getNearestCluster(vector);
            nearestCluster.addVector(vector);
        }

        this.recalculateClusterCentroids();
    }

    private recalculateClusterCentroids(): void {
        for (const cluster of this.clusters) {
            if (cluster.vectors && cluster.vectors.length > 0) {
                const newCentroid = this.options.centroidCalculator.calculate(cluster.vectors);
                cluster.centroid = newCentroid;
            } else {
                this.handleEmptyCluster(cluster);
            }
        }
    }

    private handleEmptyCluster(cluster: Cluster): void {
        switch (this.options.emptyAction) {
            case EmptyAction.DROP:
                this._clusters.splice(this._clusters.indexOf(cluster), 1);
                break;
            case EmptyAction.ERROR:
            default:
                throw new Error();
        }
    }

    private getNearestCluster(vector: Vector): Cluster {
        let currentCluster = this.clusters[0];

        for (let i = 1; i < this.clusters.length; i++) {
            const cluster = this.clusters[i];
            const newDistance = this.options.metric.calculate(vector, cluster.centroid);
            const currentDistance = this.options.metric.calculate(vector, currentCluster.centroid);

            if (newDistance <= currentDistance) {
                currentCluster = cluster;
            }
        }

        return currentCluster;
    }

    get vectors(): Vector[] | Matrix {
        return this._vectors;
    }

    get clusters(): Cluster[] {
        return this._clusters;
    }

    get meanSquaredError(): number {
        return this._meanSquaredError;
    }
}
