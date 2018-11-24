import OysterCard from "./OysterCard";
import {T} from "./constants";
import Transport from "./Transport";
import STATIONS from "./Stations";

const trip = new OysterCard(30);
const BUS = new Transport(T.BUS);
const TUBE = new Transport(T.TUBE);

trip.SwipeIn(STATIONS.HOLBORN, TUBE);
trip.SwipeOut(STATIONS.EARLS_COURT, TUBE);


trip.SwipeIn(STATIONS.EARLS_COURT, BUS);
trip.SwipeOut(STATIONS.HAMMERSMITH, BUS);

trip.SwipeIn(STATIONS.HAMMERSMITH, TUBE);
trip.SwipeOut(STATIONS.WIMBLEDON, TUBE);

trip.SwipeIn(STATIONS.HOLBORN, TUBE);
trip.SwipeOut(STATIONS.WIMBLEDON, TUBE);

console.log("Wallet balance: ", trip.Wallet);