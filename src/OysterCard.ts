import { Station, T } from "./constants";
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
        this.chargedFare = mode.type === T.BUS ? 1.80: 3.20;
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
            return;//exit it Transport is BUS
        }

        this.journey[1] = station;
        // calculate tube fare after getting Zones Passed through
        //this.chargedFare = 
        console.log("zone: ", `${this.journey[0].name} to ${this.journey[1].name}`);
        console.log("zone travelled", this.getZonesTravelledCount(this.journey[0].zone, this.journey[1].zone));


        //set wallet balance
        this.Wallet = (this.Wallet + 3.20) - this.chargedFare;
    }

    getZonesTravelledCount(from: number[], to: number[]): number {
        let count;
        from.forEach(function(fromZone){
            to.forEach(function(toZone){
                var zonesVisited = Math.abs(fromZone - toZone) + 1;
                count = zonesVisited;
            });
        });
        return count;
    }

}
