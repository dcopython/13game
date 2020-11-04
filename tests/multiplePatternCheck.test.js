import multiplePatternCheck from '../client/gameplay/multiplePatternCheck.js';

describe('1 card', () => {
    it('returns single for a single card', () => {
        const input = ['9S'];
        expect(multiplePatternCheck(input)).toEqual('single');
    });
});

describe('2 cards', () => {
    it('returns pair for matching pairs', () => {
        const input = ['9S', '9H'];
        expect(multiplePatternCheck(input)).toEqual('pair');
    });

    it('returns false for mismatched pairs', () => {
        const input = ['9S', '5H'];
        expect(multiplePatternCheck(input)).toEqual(false);
    });
});

describe('3 cards', () => {
    it('returns triple for matching triple', () => {
        const input = ['3S', '3H', '3D'];
        expect(multiplePatternCheck(input)).toEqual('triple');
    });

    it('returns straight for valid three card straight', () => {
        const input = ['3S', '4H', '5C'];
        expect(multiplePatternCheck(input)).toEqual('straight');
    });

    it('returns false for mismatched three card straight', () => {
        const input = ['6C', '9H', 'KC'];
        expect(multiplePatternCheck(input)).toEqual(false);
    });
});

describe('4 or more cards', () => {
    it('returns quad for matching quad', () => {
        const input = ['3S', '3H', '3D', '3C'];
        expect(multiplePatternCheck(input)).toEqual('quad');
    });

    it('returns true for valid 3+ card straight', () => {
        const input = ['7S', '8H', '9C', '10D', 'JS'];
        expect(multiplePatternCheck(input)).toEqual('straight');
    });

    it('returns true for valid 3+ card straight', () => {
        const input = ['JH', '10C', '9C', '8C'];
        expect(multiplePatternCheck(input)).toEqual('straight');
    });

    it('returns false for mismatched 3+ card straight', () => {
        const input = ['3C', '4H', '5C', '7S', '8D'];
        expect(multiplePatternCheck(input)).toEqual(false);
    });
});