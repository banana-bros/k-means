import { expect } from 'chai';
import { ManhattanDistance } from '../../src';

describe('ManhattanDistance', () => {
    beforeEach(() => {});

    it('should be created', () => {
        const metric = new ManhattanDistance();
        expect(metric).to.be.ok;
    });

    it('should calcualte the distance of two 2D vectors', () => {
        const metric = new ManhattanDistance();
        expect(metric.calculate([0, 0], [3, 4])).to.equal(7);
        expect(metric.calculate([5, 2], [3, 4])).to.equal(4);
        expect(metric.calculate([-5, -2], [4, 3])).to.equal(14);
    });

    it('should calcualte the distance of two 4D vectors', () => {
        const metric = new ManhattanDistance();
        expect(metric.calculate([0, 0, 0, 0], [3, 4, 5, 6])).to.equal(18);
        expect(metric.calculate([7, 2, 9, 1], [3, 4, 5, 6])).to.equal(15);
        expect(metric.calculate([-7, 2, -9, 1], [-3, -4, 5, 6])).to.equal(29);
    });

    it('should not calcualte the distance of two vectors when vectorA is null', () => {
        const metric = new ManhattanDistance();
        const calculate = () => { metric.calculate(null, [3, 4]); };
        expect(calculate).to.throw();
    });

    it('should not calcualte the distance of two vectors when vectorB is null', () => {
        const metric = new ManhattanDistance();
        const calculate = () => { metric.calculate([3, 4], null); };
        expect(calculate).to.throw();
    });

    it('should not calcualte the distance of two vectors when both vectors are null', () => {
        const metric = new ManhattanDistance();
        const calculate = () => { metric.calculate(null, null); };
        expect(calculate).to.throw();
    });
});
