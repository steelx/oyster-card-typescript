import OysterCard from './OysterCard';
import STATIONS from './Stations';
import Transport from './Transport';
import { T } from './constants';

describe('OysterCard class', () => {

    const BUS = new Transport(T.BUS);
    const TUBE = new Transport(T.TUBE);

    it('should set initial balance to 30', () => {
        const trip = new OysterCard(30);
        expect(trip.Wallet).toEqual(30);
    });

    it('should deduct MAX FARE on SwipeIn', () => {
        const trip = new OysterCard(30);

        trip.SwipeIn(STATIONS.HOLBORN, TUBE);
        expect(trip.Wallet).toEqual(26.8);
    });

    it('should deduct BUS FARE on SwipeIn/Out', () => {
        const trip = new OysterCard(30);

        trip.SwipeIn(STATIONS.EARLS_COURT, BUS);
        trip.SwipeOut(STATIONS.HAMMERSMITH, BUS);
        expect(trip.Wallet).toEqual(28.2);
    });

    it('should call ZONES Travelled on SwipeOut', () => {
        const trip = new OysterCard(30);
        spyOn(trip, 'getZonesTravelledCount');

        trip.SwipeIn(STATIONS.HAMMERSMITH, TUBE);
        trip.SwipeOut(STATIONS.HOLBORN, TUBE);
        expect(trip.getZonesTravelledCount).toHaveBeenCalled();
        expect(trip.getZonesTravelledCount).toHaveBeenCalledWith(STATIONS.HAMMERSMITH.zone, STATIONS.HOLBORN.zone);

        trip.SwipeIn(STATIONS.HOLBORN, TUBE);
        trip.SwipeOut(STATIONS.WIMBLEDON, TUBE);
        expect(trip.getZonesTravelledCount).toHaveBeenCalledWith(STATIONS.HOLBORN.zone, STATIONS.WIMBLEDON.zone);
    });

    it('should calculate Zones Traveled count', () => {
        const trip = new OysterCard(30);
        let count = trip.getZonesTravelledCount(STATIONS.HAMMERSMITH.zone, STATIONS.HOLBORN.zone);
        expect(count).toEqual(2);

        count = trip.getZonesTravelledCount(STATIONS.HOLBORN.zone, STATIONS.WIMBLEDON.zone);
        expect(count).toEqual(3);
    });

    it('Anywhere in Zone 1', () => {
        const trip = new OysterCard(30);
        trip.SwipeIn(STATIONS.WIMBLEDON, TUBE);
        trip.SwipeOut(STATIONS.EARLS_COURT, TUBE);

        expect(trip.Wallet).toEqual(27.5);
    });

    it('Any one zone outside zone 1', () => {
        const trip = new OysterCard(30);
        trip.SwipeIn(STATIONS.EARLS_COURT, TUBE);
        trip.SwipeOut(STATIONS.WIMBLEDON, TUBE);

        expect(trip.Wallet).toEqual(28);
    });

    it('Two zones including zone 1', () => {
        const trip = new OysterCard(30);
        trip.SwipeIn(STATIONS.HOLBORN, TUBE);
        trip.SwipeOut(STATIONS.EARLS_COURT, TUBE);

        expect(trip.Wallet).toEqual(27);
    });

    it('Two zones excluding zone 1', () => {
        const trip = new OysterCard(30);
        trip.SwipeIn(STATIONS.WIMBLEDON, TUBE);
        trip.SwipeOut(STATIONS.HAMMERSMITH, TUBE);

        expect(trip.Wallet).toEqual(27.75);
    });

    it('Any three zones', () => {
        const trip = new OysterCard(30);
        trip.SwipeIn(STATIONS.HOLBORN, TUBE);
        trip.SwipeOut(STATIONS.WIMBLEDON, TUBE);

        expect(trip.Wallet).toEqual(26.8);
    });

    it('Any BUS journey', () => {
        const trip = new OysterCard(30);
        trip.SwipeIn(STATIONS.HOLBORN, BUS);
        trip.SwipeOut(STATIONS.WIMBLEDON, BUS);

        expect(trip.Wallet).toEqual(28.2);
    });
});
