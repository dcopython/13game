// find point value of a single card
export default checkCardValue = (card) => {
    const faceValue = {
        "3": 30,
        "4": 40,
        "5": 50,
        "6": 60,
        "7": 70,
        "8": 80,
        "9": 90,
        "10": 100,
        "J": 110,
        "Q": 120,
        "K": 130,
        "A": 140,
        "2": 150,
    }

    const suitValue = {
        "S": 1,
        "C": 2,
        "D": 3,
        "H": 4,
    }
    
    // calculate face points
    let points = 0;

    if (card.length === 3) { // need to account for 10 cards
        const facePoints = faceValue[card.slice(0, 2)];
        points += facePoints;

        const suitPoints = suitValue[card.slice(2)];
        points += suitPoints;
    } else {
        const facePoints = faceValue[card.slice(0, 1)];
        points += facePoints;

        const suitPoints = suitValue[card.slice(1)];
        points += suitPoints;
    }

    return points;
}