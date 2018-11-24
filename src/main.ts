import OysterCard from "./OysterCard";
import {T} from "./constants";
import Transport from "./Transport";
import STATIONS from "./Stations";

const trip = new OysterCard(30);
const BUS = new Transport(T.BUS);
const TUBE = new Transport(T.TUBE);

trip.SwipeIn(STATIONS.WIMBLEDON, TUBE);
trip.SwipeOut(STATIONS.EARLS_COURT, TUBE);

console.log("Wallet balance: ", trip.Wallet);