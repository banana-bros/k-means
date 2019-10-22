import { expect } from 'chai';
import { KMeans, Cluster } from '../src';
import { Vector } from '../src/type/Vector';

describe('KMeans', () => {
    beforeEach(() => {
    });

    it('should be created', () => {
        const kMeans = new KMeans();
        expect(kMeans).to.be.ok;
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
            centroids: [[1, 1], [5, 7]]
        });
        const result = kMeans.fit(testPoints);

        expect(result.iterations).to.be.within(1, 4);

        expect(result.clusters).to.have.lengthOf(2);

        let clusterA: Cluster = result.clusters[0];
        let clusterB: Cluster = result.clusters[1];

        if (result.clusters[0].centroid[0] < 3) {
            clusterA = result.clusters[1];
            clusterB = result.clusters[0];
        }
        expect(clusterA.centroid[0]).to.equal(3.9);
        expect(clusterA.centroid[1]).to.equal(5.1);

        expect(clusterB.centroid[0]).to.equal(1.25);
        expect(clusterB.centroid[1]).to.equal(1.5);

        expect(clusterA.vectors).to.have.lengthOf(5);
        expect(clusterB.vectors).to.have.lengthOf(2);

        expect(clusterA.vectors[0][0]).to.equal(3);
        expect(clusterA.vectors[0][1]).to.equal(4);

        expect(clusterA.vectors[1][0]).to.equal(5);
        expect(clusterA.vectors[1][1]).to.equal(7);

        expect(clusterA.vectors[2][0]).to.equal(3.5);
        expect(clusterA.vectors[2][1]).to.equal(5);

        expect(clusterA.vectors[3][0]).to.equal(4.5);
        expect(clusterA.vectors[3][1]).to.equal(5);

        expect(clusterA.vectors[4][0]).to.equal(3.5);
        expect(clusterA.vectors[4][1]).to.equal(4.5);

        expect(clusterB.vectors[0][0]).to.equal(1);
        expect(clusterB.vectors[0][1]).to.equal(1);

        expect(clusterB.vectors[1][0]).to.equal(1.5);
        expect(clusterB.vectors[1][1]).to.equal(2);
    });

/*
const training_data_set: Vector[] = JSON.parse(fs.readFileSync('training_data_set.json').toString());
const kMeanstraining_data_set = new KMeans(training_data_set, 20);
kMeanstraining_data_set.setCentroidCalculator(new MedianCentroidCalculator());
const exportertraining_data_set = new KMeansExporter('training_data_set.m', kMeanstraining_data_set);
kMeanstraining_data_set.start();
exportertraining_data_set.export();

const data: Vector[] = JSON.parse(fs.readFileSync('data.json').toString());
const kMeansdata = new KMeans(data, 15);
kMeansdata.setCentroidCalculator(new MedianCentroidCalculator());
const exporterdata = new KMeansExporter('data.m', kMeansdata);
kMeansdata.start();
exporterdata.export();

const data2: Vector[] = JSON.parse(fs.readFileSync('data2.json').toString());
const kMeansdata2 = new KMeans(data2, 4);
kMeansdata2.setCentroidCalculator(new MedianCentroidCalculator());
const exporterdata2 = new KMeansExporter('data2.m', kMeansdata2);
kMeansdata2.start();
exporterdata2.export();

const training_data_set: Vector[] = JSON.parse(fs.readFileSync('training_data_set.json').toString());
    const kMeanstraining_data_set = new KMeans(training_data_set, 20);
    const exportertraining_data_set = new KMeansExporter('training_data_set.m', kMeanstraining_data_set);
    kMeanstraining_data_set.start();
    exportertraining_data_set.export();

    const data: Vector[] = JSON.parse(fs.readFileSync('data.json').toString());
    const kMeansdata = new KMeans(data, 15);
    const exporterdata = new KMeansExporter('data.m', kMeansdata);
    kMeansdata.start();
    exporterdata.export();

    const data2: Vector[] = JSON.parse(fs.readFileSync('data2.json').toString());
    const kMeansdata2 = new KMeans(data2, 4);
    const exporterdata2 = new KMeansExporter('data2.m', kMeansdata2);
    kMeansdata2.start();
    exporterdata2.export();

    /**/
});
