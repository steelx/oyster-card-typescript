import OysterCard from './OysterCard';

describe('OysterCard class', () => {
    beforeAll(() => console.log('Before all'));
    afterAll(() => console.log('After all'));

    it('should set initial balance to 30', () => {
        const trip = new OysterCard(30);
        expect(trip.Wallet).toEqual(30);
    });
});
