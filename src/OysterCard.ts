import { Station, T, fares } from "./constants";
import Transport from "./Transport"

const range = (start: number, end: number) => {
    let len = end - start + 1, arr = Array(len);
    return arr.fill(0).map((_, idx) => start + idx)
};
export default class {

    private _wallet: number;
    private chargedFare: number;
    private journey: Station[];

    constructor(amount = 0) {
        this._wallet = amount;
        this.chargedFare = 0;
        this.journey = [];
    }

    set Wallet(amt: number) {
        this._wallet = amt;
    }
    get Wallet(): number {
        return this._wallet;
    }

    SwipeIn(station: Station, mode: Transport) {
        this.chargedFare = mode.type === T.BUS ? fares.ANY_BUS_TRIP: fares.MAX_FARE;
        if (this.Wallet < this.chargedFare) {
            return "Wallet doesn't meet minimum balance";
        }
        this.Wallet = this.Wallet - this.chargedFare;

        if (mode.type !== T.BUS) {
            this.journey[0] = station;
        }
    }

    SwipeOut(station: Station, mode: Transport) {
        if(mode.type === T.BUS) {
            console.log(`${station.name} via BUS`);
            return;//exit it Transport is BUS
        }

        this.journey[1] = station;
        // calculate tube fare after getting Zones Passed through
        this.chargedFare = this.calculateTubeFare(this.setZonesTravelled(), this.journey);

        //set wallet balance
        this.Wallet = (this.Wallet + fares.MAX_FARE) - this.chargedFare;
    }

    setZonesTravelled(): number {
        console.log(`${this.journey[0].name} to ${this.journey[1].name}`);
        return this.getZonesTravelledCount(this.journey[0].zone, this.journey[1].zone);
    }
    getZonesTravelledCount(from: number[], to: number[]): number {
        let count;
        from.forEach(function(fromZone){
            to.forEach(function(toZone){
                count = Math.abs(fromZone - toZone) + 1;
            });
        });
        return count;
    }

    calculateTubeFare(zonesTravelled: number, journey: Station[]): number {
        const from = journey[0].zone, to = journey[1].zone;

        if (zonesTravelled === 2 && !from.includes(1) && to.includes(1)) {
            return fares.ANYWHERE_IN_ZONE1;
        }
        if (zonesTravelled === 2 && from.includes(1) && !to.includes(1)) {
            return fares.ONE_ZONE_OUTSIDE_ZONE1;
        }
        if (zonesTravelled === 2 && from.includes(1) && to.includes(1)) {
            return fares.TWO_ZONE_INCLUDING_ZONE1;
        }
        if (zonesTravelled === 2 && !from.includes(1) && !to.includes(1)) {
            return fares.TWO_ZONE_EXCLUDING_ZONE1;
        }
        if (zonesTravelled === 3) {
            return fares.THREE_ZONES;
        }

        //default to
        return fares.MAX_FARE;
    }

}
