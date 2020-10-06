import findMultiples from '../client/gameplay/findMultiplesInHand.js';

const input = [
    '3S', '3D', '4H', '5C',
    '6S', '9S', '9C', '9D', 
    '9H', '10S', 'JS', 'JD', 'JH'
];

describe('find multiples in a hand', () => {
    it('return an object with the count of each card value', () => {
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
            'pair': [['3S', '3D']],
            'triple': [['JS', 'JD', 'JH']],
            'quad': [['9S', '9C', '9D', '9H']]
        };
    
        expect(findMultiples(input)).toEqual(combos);
    });
});