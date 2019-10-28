import { expect, use, spy } from 'chai';
import * as spies from 'chai-spies';
import { KMeans, Cluster } from '../src';
import { Vector } from '../src/type/Vector';
import { CentroidSelection } from '../src/type/Options';

use(spies);

/* Methods to test
public fit(vectors: Vector[] | Matrix): Result {
public predict(vectors: Vector[] | Matrix): number[] {
private prepareIteration(vectors: Vector[] | Matrix): void {
private iterate(): number {
private generateStartingClustersByRandomCentroids() {
private generateStartingClustersByGivenCentroids() {
private generateStartingClustersByKMeansPlusPlus() {
private generateNextCluster(): Vector {
private centroidsHaveChanged(): boolean {
private next(): void {
private recalculateClusterCentroids(): void {
private handleEmptyCluster(cluster: Cluster): void {
private getNearestCluster(vector: Vector): Cluster {
get vectors(): Vector[] | Matrix {
get clusters(): Cluster[] {
get meanSquaredError(): number {
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

    it('should calculate mean squared error correctly', () => {
        const kMeans = new KMeans();
        const cluster1 = new Cluster([0, 0]);
        const cluster2 = new Cluster([-1, 1]);

        cluster1['_vectors'] = [
            [1, 1],
            [2, 3],
            [-1, 0]
        ];

        cluster2['_vectors'] = [
            [-2, 5],
            [7, 7],
            [3, 0]
        ];

        kMeans['_clusters'] = [
            cluster1,
            cluster2
        ];

        kMeans['calculateMeanSquaredError']();

        expect(kMeans.meanSquaredError).to.equal(25);
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

        if (result.clusters[0].centroid[0] < 3) {
            clusterA = result.clusters[1];
            clusterB = result.clusters[0];
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
    });
});
