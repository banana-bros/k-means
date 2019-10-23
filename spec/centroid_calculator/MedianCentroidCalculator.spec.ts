import { expect } from 'chai';
import { MedianCentroidCalculator } from '../../src';

describe('MedianCentroidCalculator', () => {
    const metric: MedianCentroidCalculator = new MedianCentroidCalculator();

    beforeEach(() => {});

    it('should be created', () => {
        expect(metric).to.be.ok;
    });

    it('should calcualte the median centroid of two 2D vectors', () => {
        expect(metric.calculate([[0, 0], [2, 2]])).to.eql([1, 1]);
    });

    it('should calcualte the mean centroid of two 3D vectors', () => {
        expect(metric.calculate([[0, 1, 2], [2, 3, 4]])).to.eql([1, 2, 3]);
    });

    it('should calcualte the mean centroid of three 3D vectors', () => {
        expect(metric.calculate([[0, 1, 2], [2, 3, 4], [5, 6, 7]])).to.eql([2, 3, 4]);
    });
});
