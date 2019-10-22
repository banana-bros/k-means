import { expect } from 'chai';
import { Cluster } from '../../src/type/Cluster';

describe('Cluster', () => {
    beforeEach(() => {
    });

    it('should be created', () => {
        let cluster = new Cluster();
        expect(cluster).to.be.ok;
        expect(cluster.lastCentroid).not.to.be.ok;
        expect(cluster.centroid).not.to.be.ok;
    });

    it('should be created with an initial centroid', () => {
        let cluster = new Cluster([1, 5, 4]);
        expect(cluster).to.be.ok;
        expect(cluster.lastCentroid).not.to.be.ok;
        expect(cluster.centroid).to.be.eql([1, 5, 4]);
    });

    it('should add a vector to the existing vectors', () => {
        let cluster = new Cluster();
        cluster.addVector([1, 2, 3]);
        expect(cluster.vectors).to.eql([[1, 2, 3]]);
        cluster.addVector([4, 5, 6]);
        expect(cluster.vectors).to.eql([[1, 2, 3], [4, 5, 6]]);
    });

    it('should remove a vector to the existing vectors', () => {
        let cluster = new Cluster();
        cluster['_vectors'] = [[1, 2, 3], [4, 5, 6]];
        cluster.removeVector(cluster.vectors[0]);
        expect(cluster.vectors).to.eql([[4, 5, 6]]);
    });

    it('should init a centroid without touching the lastCentroid', () => {
        let cluster = new Cluster();
        expect(cluster.lastCentroid).not.to.be.ok;
        cluster.initCentroid([1, 2, 5]);
        expect(cluster.centroid).to.be.eql([1, 2, 5]);
        expect(cluster.lastCentroid).not.to.be.ok;
    });

    it('should not contain any vectors after reset', () => {
        let cluster = new Cluster();
        cluster['_vectors'] = [[1, 2, 3], [4, 5, 6]];
        cluster.reset();
        expect(cluster.vectors).to.be.eql([]);
        expect(cluster.lastCentroid).not.to.be.ok;
    });

    it('should correctly determine if the centroid has not changed', () => {
        let cluster = new Cluster();
        cluster['_centroid'] = [1, 2, 3];
        cluster['_lastCentroid'] = [1, 2, 3];
        expect(cluster.centroidHasChanged()).to.be.false;
    });

    it('should correctly determine if the centroid has changed', () => {
        let cluster = new Cluster();
        cluster['_centroid'] = [1, 2, 4];
        cluster['_lastCentroid'] = [1, 2, 3];
        expect(cluster.centroidHasChanged()).to.be.true;
    });

    it('should correctly determine if the centroid has changed in size aswell', () => {
        let cluster = new Cluster();
        cluster['_centroid'] = [1, 2, 4];
        cluster['_lastCentroid'] = [1, 2];
        expect(cluster.centroidHasChanged()).to.be.true;
    });

    it('should correctly determine if the last centroid has changed in size aswell', () => {
        let cluster = new Cluster();
        cluster['_centroid'] = [1, 2];
        cluster['_lastCentroid'] = [1, 2, 4];
        expect(cluster.centroidHasChanged()).to.be.true;
    });

    it('should correctly determine if the centroid has changed if only the centroid is null', () => {
        let cluster = new Cluster();
        cluster['_centroid'] = null;
        cluster['_lastCentroid'] = [1, 2, 4];
        expect(cluster.centroidHasChanged()).to.be.true;
    });

    it('should correctly determine if the centroid has changed if only the last centroid is null', () => {
        let cluster = new Cluster();
        cluster['_centroid'] = [1, 2, 4];
        cluster['_lastCentroid'] = null;
        expect(cluster.centroidHasChanged()).to.be.true;
    });

    it('should correctly determine if the centroid has changed if both centroids are null', () => {
        let cluster = new Cluster();
        cluster['_centroid'] = null;
        cluster['_lastCentroid'] = null;
        expect(cluster.centroidHasChanged()).to.be.false;
    });

    it('should correctly determine if the centroid has changed if both centroids are null', () => {
        let cluster = new Cluster();
        cluster['_centroid'] = null;
        cluster['_lastCentroid'] = null;
        expect(cluster.centroidHasChanged()).to.be.false;
    });

    it('should return the centroid', () => {
        let cluster = new Cluster();
        cluster['_centroid'] = [1, 2, 3, 4];
        expect(cluster.centroid).to.be.eql([1, 2, 3, 4]);
    });

    it('should set the centroid and update the last centroid', () => {
        let cluster = new Cluster();
        cluster['_centroid'] = [1, 2, 3, 4];
        cluster.centroid = [1, 2, 3];
        expect(cluster['_centroid']).to.be.eql([1, 2, 3]);
        expect(cluster['_lastCentroid']).to.be.eql([1, 2, 3, 4]);
    });

    it('should return the last centroid', () => {
        let cluster = new Cluster();
        cluster['_lastCentroid'] = [1, 2, 3, 4];
        expect(cluster.lastCentroid).to.be.eql([1, 2, 3, 4]);
    });

    it('should return the vectors', () => {
        let cluster = new Cluster();
        cluster['_vectors'] = [[1, 2, 3, 4], [5, 6, 7, 8]];
        expect(cluster.vectors).to.be.eql([[1, 2, 3, 4], [5, 6, 7, 8]]);
    });
});
