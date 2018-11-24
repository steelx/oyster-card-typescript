export const T = {
    BUS: "BUS",
    TUBE: "TUBE",
};

export const fares = {
    MAX_FARE: 3.20,
    ANYWHERE_IN_ZONE1: 2.50,
    ONE_ZONE_OUTSIDE_ZONE1: 2.00,
    TWO_ZONE_INCLUDING_ZONE1: 3.00,
    TWO_ZONE_EXCLUDING_ZONE1: 2.25,
    THREE_ZONES: 3.20,
    ANY_BUS_TRIP: 1.80,
};
export interface Station {
    name: string, zone: number[]
};
