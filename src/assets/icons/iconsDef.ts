import L from "leaflet";
import carre from "./CARRE.png";
import f from "./F.png";
import arret from "./ARRET.png";
import gare from "./gare_v1.webp";
import pn from "./passage_a_niveau_v1.png";

export const iconsDef: Record<string, L.Icon> = {
    // Signalisation :

    "signal:carre": L.icon({
        iconUrl: carre,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
    }),
    "signal:arret": L.icon({
        iconUrl: arret,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
    }),
    "signal:f": L.icon({
        iconUrl: f,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
    }),

    gare: L.icon({
        iconUrl: gare,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
    }),
    pn: L.icon({
        iconUrl: pn,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    }),
};
