import { expect } from 'chai';
import { EuclidianDistance } from '../../src';

describe('EuclidianDistance', () => {
    beforeEach(() => {});

    it('should be created', () => {
        const metric = new EuclidianDistance();
        expect(metric).to.be.ok;
    });

    it('should calcualte the distance of two 2D vectors', () => {
        const metric = new EuclidianDistance();
        expect(metric.calculate([0, 0], [3, 4])).to.equal(5);
        expect(metric.calculate([5, 2], [3, 4])).to.equal(2.82842712474619009);
        expect(metric.calculate([-5, -2], [4, 3])).to.equal(10.2956301409870003);
    });

    it('should calcualte the distance of two 4D vectors', () => {
        const metric = new EuclidianDistance();
        expect(metric.calculate([0, 0, 0, 0], [3, 4, 5, 6])).to.equal(9.273618495495704);
        expect(metric.calculate([7, 2, 9, 1], [3, 4, 5, 6])).to.equal(7.810249675906654);
        expect(metric.calculate([-7, 2, -9, 1], [-3, -4, 5, 6])).to.equal(16.52271164185830606);
    });

    it('should not calcualte the distance of two vectors with different dimensions', () => {
        const metric = new EuclidianDistance();
        const calculate = () => { metric.calculate([0], [3, 4]); };
        expect(calculate).to.throw();
    });

    it('should not calcualte the distance of two vectors when vectorA is null', () => {
        const metric = new EuclidianDistance();
        const calculate = () => { metric.calculate(null, [3, 4]); };
        expect(calculate).to.throw();
    });

    it('should not calcualte the distance of two vectors when vectorB is null', () => {
        const metric = new EuclidianDistance();
        const calculate = () => { metric.calculate([3, 4], null); };
        expect(calculate).to.throw();
    });

    it('should not calcualte the distance of two vectors when both vectors are null', () => {
        const metric = new EuclidianDistance();
        const calculate = () => { metric.calculate(null, null); };
        expect(calculate).to.throw();
    });
});
