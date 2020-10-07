import findMultiples from '../client/gameplay/findMultiplesInHand.js';

const input = [
    '3S', '3D', '4H', '5C',
    '6S', '7H', '9S', '9C', '9D', 
    '9H', '10S', 'JS', 'JD',
    'JH', 'KS', 'KD'
];

const output = {
    '3': ['3S', '3D'],
    '4': ['4H'],
    '5': ['5C'],
    '6': ['6S'],
    '9': ['9S', '9C', '9D', '9H'],
    '10': ['10S'],
    'J': ['JS', 'JD', 'JH'],
};

const combos = {
    'single': ['4H', '5C', '6S', '10S'],
    'pair': [['3S', '3D'], ['KS', 'KD']],
    'triple': [['JS', 'JD', 'JH']],
    'quad': [['9S', '9C', '9D', '9H']]
};

describe('find multiples in a hand', () => {
    it('return an array with all pairs in a hand', () => {
        expect(findMultiples(input, 'pair')).toEqual(combos.pair);
    });

    it('return an array with all pairs in a hand', () => {
        expect(findMultiples(input, 'quad')).toEqual(combos.quad);
    });

    it('returns array with a better straight compared to last played straight', () => {
        const lastPlayed = ['3D', '4H', '5C', '6D'];
        const output = ['4H', '5C', '6S', '7H'];
        expect(findMultiples(input, 'straight', lastPlayed)).toEqual(output);
    });

    it('returns false if there is no better straight in current hand', () => {
        const lastPlayed = ['JD', 'QH', 'KC', 'AD'];
        expect(findMultiples(input, 'straight', lastPlayed)).toEqual(false);
    });
});