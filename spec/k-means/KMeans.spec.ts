import { expect, use, spy } from 'chai';
import * as spies from 'chai-spies';
import { KMeans, Cluster, ManhattanDistance } from '../../src';
import { Vector } from '../../src/type/Vector';
import { CentroidSelection, EmptyAction } from '../../src/type/Options';
import { kMaxLength } from 'buffer';

use(spies);

/* Methods to test
public fit(vectors: Vector[] | Matrix): Result {
public predict(vectors: Vector[] | Matrix): number[] {
private prepareIteration(vectors: Vector[] | Matrix): void {
private iterate(): number {
private generateNextCluster(): Vector {
private centroidsHaveChanged(): boolean {
private next(): void {
private recalculateClusterCentroids(): void {
private getNearestCluster(vector: Vector): Cluster {
*/

describe('KMeans', () => {
    beforeEach(() => {
    });

    it('should be created', () => {
        const kMeans = new KMeans();
        expect(kMeans).to.be.ok;
    });

    it('should call generateStartingClustersByRandomCentroids() when setting centroid selection to random', () => {
        const kMeans = new KMeans({
            centroidSelection: CentroidSelection.RANDOM
        });

        const spyFn = spy.on(kMeans, 'generateStartingClustersByRandomCentroids', () => {});

        kMeans['generateStartingClustersByRandomCentroids']();

        expect(spyFn).to.have.been.called;
    });

    it('should call generateStartingClustersByGivenCentroids() when setting centroid selection to predefined', () => {
        const kMeans = new KMeans({
            centroidSelection: CentroidSelection.PREDEFINED
        });

        const spyFn = spy.on(kMeans, 'generateStartingClustersByGivenCentroids', () => {});

        kMeans['generateStartingClustersByGivenCentroids']();

        expect(spyFn).to.have.been.called;
    });

    it('should call generateStartingClustersByKMeansPlusPlus() when setting centroid selection to kmeansplusplus', () => {
        const kMeans = new KMeans({
            centroidSelection: CentroidSelection.KMEANSPLUSPLUS
        });

        const spyFn = spy.on(kMeans, 'generateStartingClustersByGivenCentroids', () => {});

        kMeans['generateStartingClustersByGivenCentroids']();

        expect(spyFn).to.have.been.called;
    });

    it('should throw an error when calling generateStartingClustersByGivenCentroids() without a valid centroid selection option', () => {
        const kMeans = new KMeans({
            centroidSelection: 'something' as any
        });

        const errorFn = () => {
            kMeans['generateStartingClustersByGivenCentroids']();
        };

        expect(errorFn).to.throw;
    });

    it('should calculate mean squared error correctly when metric is EuclidianDistance', () => {
        const kMeans = new KMeans();
        const cluster0 = new Cluster([0, 0]);
        const cluster1 = new Cluster([-1, 1]);

        cluster0['_vectors'] = [
            [1, 1],
            [2, 3],
            [-1, 0]
        ];

        cluster1['_vectors'] = [
            [-2, 5],
            [7, 7],
            [3, 0]
        ];

        kMeans['_clusters'] = [
            cluster0,
            cluster1
        ];

        kMeans['calculateMeanSquaredError']();

        expect(kMeans.meanSquaredError).to.equal(25);
    });

    it('should generate starting clusters by random centroids correctly', () => {
        const kMeans = new KMeans({
            clusterCount: 2
        });

        kMeans['_vectors'] = [
            [1, 1],
            [0, 0]
        ];

        kMeans['generateStartingClustersByRandomCentroids']();

        let cluster0 = kMeans.clusters[0];
        let cluster1 = kMeans.clusters[1];

        if (cluster0.centroid[0] < cluster1.centroid[0]) {
            const tempCluster = cluster0;
            cluster0 = cluster1;
            cluster1 = tempCluster;
        }

        expect(cluster0.centroid).to.eql([1, 1]);
        expect(cluster1.centroid).to.eql([0, 0]);
    });

    it('should throw an error when generating starting clusters by random with not enough vectors', () => {
        const kMeans = new KMeans({
            clusterCount: 2
        });

        const errorFn = () => kMeans['generateStartingClustersByRandomCentroids']();

        kMeans['_vectors'] = [
            [1, 1]
        ];

        expect(errorFn).to.throw;
    });

    it('should throw an error when generating starting clusters by random with no vectors', () => {
        const kMeans = new KMeans({
            clusterCount: 2
        });

        const errorFn = () => kMeans['generateStartingClustersByRandomCentroids']();

        kMeans['_vectors'] = [];

        expect(errorFn).to.throw;
    });

    it('should throw an error when generating starting clusters by random with null vectors', () => {
        const kMeans = new KMeans({
            clusterCount: 2
        });

        const errorFn = () => kMeans['generateStartingClustersByRandomCentroids']();

        kMeans['_vectors'] = [];

        expect(errorFn).to.throw;
    });

    it('should generate starting clusters by given centroids', () => {
        const kMeans = new KMeans({
            clusterCount: 2,
            centroids: [
                [0, 0],
                [1, 1]
            ]
        });

        kMeans['generateStartingClustersByGivenCentroids']();

        let cluster0 = kMeans.clusters[0];
        let cluster1 = kMeans.clusters[1];

        if (cluster0.centroid[0] < cluster1.centroid[0]) {
            const tempCluster = cluster0;
            cluster0 = cluster1;
            cluster1 = tempCluster;
        }

        expect(cluster0.centroid).to.eql([1, 1]);
        expect(cluster1.centroid).to.eql([0, 0]);
    });

    it('should throw when generating starting clusters by given centroids with not enough centroids', () => {
        const kMeans = new KMeans({
            clusterCount: 2,
            centroids: [
                [0, 0]
            ]
        });

        const errorFn = () => kMeans['generateStartingClustersByGivenCentroids']();

        expect(errorFn).to.throw;
    });

    it('should throw when generating starting clusters by given centroids with too many centroids', () => {
        const kMeans = new KMeans({
            clusterCount: 1,
            centroids: [
                [0, 0],
                [1, 1]
            ]
        });

        const errorFn = () => kMeans['generateStartingClustersByGivenCentroids']();

        expect(errorFn).to.throw;
    });

    it('should throw when generating starting clusters by given centroids with no centroids', () => {
        const kMeans = new KMeans({
            clusterCount: 1,
            centroids: []
        });

        const errorFn = () => kMeans['generateStartingClustersByGivenCentroids']();

        expect(errorFn).to.throw;
    });

    it('should throw when generating starting clusters by given centroids with empty centroids', () => {
        const kMeans = new KMeans({
            clusterCount: 1,
            centroids: null
        });

        const errorFn = () => kMeans['generateStartingClustersByGivenCentroids']();

        expect(errorFn).to.throw;
    });

    it('should generate starting clusters by k-means++ correctly', () => {
        const kMeans = new KMeans({
            clusterCount: 2
        });

        kMeans['_vectors'] = [
            [0, 0],
            [1, 1],
            [2, 2],
            [3, 3]
        ];

        kMeans['_clusters'] = [ new Cluster([0, 0]) ];

        kMeans['generateStartingClustersByKMeansPlusPlus']();

        let cluster0 = kMeans.clusters[0];
        let cluster1 = kMeans.clusters[1];

        expect(cluster0.centroid).to.eql([0, 0]);
        expect(cluster1.centroid).to.eql([3, 3]);
    });

    it('should throw when generating starting clusters by k-means++ with not enough vectors', () => {
        const kMeans = new KMeans({
            clusterCount: 2
        });

        kMeans['_vectors'] = [
            [0, 0]
        ];

        const errorFn = () => kMeans['generateStartingClustersByKMeansPlusPlus']();

        expect(errorFn).to.throw;
    });

    it('should throw when generating starting clusters by k-means++ with no vectors', () => {
        const kMeans = new KMeans({
            clusterCount: 2
        });

        kMeans['_vectors'] = [];

        const errorFn = () => kMeans['generateStartingClustersByKMeansPlusPlus']();

        expect(errorFn).to.throw;
    });

    it('should throw when generating starting clusters by k-means++ with null vectors', () => {
        const kMeans = new KMeans({
            clusterCount: 2
        });

        kMeans['_vectors'] = null;

        const errorFn = () => kMeans['generateStartingClustersByKMeansPlusPlus']();

        expect(errorFn).to.throw;
    });

    it('should get unique random index correctly', () => {
        const kMeans = new KMeans();

        kMeans['_vectors'] = [
            [0, 0]
        ];

        expect(kMeans['getUniqueRandomIndex']([])).to.equal(0);
    });

    it('should get unique random index correctly and not reuse any', () => {
        const kMeans = new KMeans();
        const taken = [];

        kMeans['_vectors'] = [
            [0, 0],
            [1, 1]
        ];

        let index0 = kMeans['getUniqueRandomIndex'](taken);
        let index1 = kMeans['getUniqueRandomIndex'](taken);

        if (index0 > index1) {
            const tempIndex = index0;
            index0 = index1;
            index1 = tempIndex;
        }

        expect(index0).to.equal(0);
        expect(index1).to.equal(1);
    });

    it('should fillup taken parameter when calling get unique random index', () => {
        const kMeans = new KMeans();
        const taken = [];

        kMeans['_vectors'] = [
            [0, 0]
        ];

        kMeans['getUniqueRandomIndex'](taken);

        expect(taken).to.eql([ 0 ]);
    });

    it('should throw when trying to get a random index without any vectors', () => {
        const kMeans = new KMeans();

        kMeans['_vectors'] = [];

        const errorFn = () => kMeans['getUniqueRandomIndex']([]);

        expect(errorFn).to.throw;
    });

    it('should throw when trying to get a random index when all indizes are taken', () => {
        const kMeans = new KMeans();
        const taken = [0, 1];

        kMeans['_vectors'] = [
            [0, 0],
            [1, 1]
        ];

        const errorFn = () => kMeans['getUniqueRandomIndex'](taken);

        expect(errorFn).to.throw;
    });

    it('should throw when trying to get a random index when all indizes are taken', () => {
        const kMeans = new KMeans();
        const taken = [0, 1];

        kMeans['_vectors'] = [
            [0, 0],
            [1, 1]
        ];

        const errorFn = () => kMeans['getUniqueRandomIndex'](taken);

        expect(errorFn).to.throw;
    });

    it('should calculate mean squared error correctly when metric is ManhattanDistance', () => {
        const kMeans = new KMeans({
            metric: new ManhattanDistance()
        });
        const cluster0 = new Cluster([0, 0]);
        const cluster1 = new Cluster([-1, 1]);

        cluster0['_vectors'] = [
            [1, 1],
            [2, 3],
            [-1, 0]
        ];

        cluster1['_vectors'] = [
            [-2, 5],
            [7, 7],
            [3, 0]
        ];

        kMeans['_clusters'] = [
            cluster0,
            cluster1
        ];

        kMeans['calculateMeanSquaredError']();

        expect(kMeans.meanSquaredError).to.equal(46);
    });


    it('should remove an empty cluster when EmptyAction.DROP is selected', () => {
        const kMeans = new KMeans({
            emptyAction: EmptyAction.DROP
        });


        const okCluster = new Cluster([0, 0]);
        const emptyCluster = new Cluster([1, 1]);

        kMeans['_clusters'] = [
            okCluster,
            emptyCluster
        ];

        kMeans['handleEmptyCluster'](emptyCluster);

        expect(kMeans.clusters.length).to.equal(1);
        expect(kMeans.clusters[0].centroid).to.eql([0, 0]);
    });

    it('should throw when trying to remove an empty cluster when the cluster is not part of k-means', () => {
        const kMeans = new KMeans({
            emptyAction: EmptyAction.DROP
        });


        const okCluster = new Cluster([0, 0]);
        const emptyCluster = new Cluster([1, 1]);

        kMeans['_clusters'] = [
            okCluster
        ];

        const errorFn = () => kMeans['handleEmptyCluster'](new Cluster([1, 1]));

        expect(errorFn).to.throw;
    });

    it('should throw when removing an empty cluster when EmptyAction.ERROR is selected', () => {
        const kMeans = new KMeans({
            emptyAction: EmptyAction.ERROR
        });


        const okCluster = new Cluster([0, 0]);
        const emptyCluster = new Cluster([1, 1]);

        kMeans['_clusters'] = [
            okCluster,
            emptyCluster
        ];

        const errorFn = () => kMeans['handleEmptyCluster'](emptyCluster);

        expect(errorFn).to.throw;
    });

    it('shuld return vectors correctly', () => {
        const kMeans = new KMeans();

        kMeans['_vectors'] = [ [0, 0], [1, 1] ];

        expect(kMeans.vectors).to.eql([ [0, 0], [1, 1] ]);
    });

    it('shuld return clusters correctly', () => {
        const kMeans = new KMeans();

        kMeans['_clusters'] = [
            new Cluster([0, 0]),
            new Cluster([1, 1])
        ];

        expect(kMeans.clusters[0].centroid).to.eql([0, 0]);
        expect(kMeans.clusters[1].centroid).to.eql([1, 1]);
    });

    it('shuld return meanSquaredError correctly', () => {
        const kMeans = new KMeans();

        kMeans['_meanSquaredError'] = 42;

        expect(kMeans.meanSquaredError).to.equal(42);
    });

    it('should calculate k-Means with defined centers correctly', () => {
        const testPoints: Vector[] = [
            [1, 1],
            [1.5, 2],
            [3, 4],
            [5, 7],
            [3.5, 5],
            [4.5, 5],
            [3.5, 4.5],
        ];
        const kMeans: KMeans = new KMeans({
            clusterCount: 2,
            centroids: [[1, 1], [5, 7]],
            centroidSelection: CentroidSelection.PREDEFINED
        });

        const result = kMeans.fit(testPoints);

        let clusterA: Cluster = result.clusters[0];
        let clusterB: Cluster = result.clusters[1];
        let hasChanged = false;

        if (result.clusters[0].centroid[0] < 3) {
            clusterA = result.clusters[1];
            clusterB = result.clusters[0];
            hasChanged = true;
        }

        expect(result.iterations).to.be.within(1, 4);
        expect(result.clusters).to.have.lengthOf(2);
        expect(clusterA.centroid).to.eql([3.9, 5.1]);
        expect(clusterA.vectors).to.eql([
            [3, 4],
            [5, 7],
            [3.5, 5],
            [4.5, 5],
            [3.5, 4.5]
        ]);
        expect(clusterB.centroid).to.eql([1.25, 1.5]);
        expect(clusterB.vectors).to.eql([
            [1, 1],
            [1.5, 2]
        ]);

        if (hasChanged) {
            expect(result.clusterIndices).to.eql([0, 0, 1, 1, 1, 1, 1]);
        } else {
            expect(result.clusterIndices).to.eql([1, 1, 0, 0, 0, 0, 0]);
        }
    });
});
