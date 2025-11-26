import React, { JSX } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles/Map.css";

import { iconsDef } from "../../assets/icons/iconsDef";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

type MapElement = {
    id: number;
    type: string;
    subtype?: string;
    name: string;
    position: [number, number];
};

const MapElements: MapElement[] = [
    {
        id: 1,
        type: "signal",
        subtype: "carre",
        name: "Signal A",
        position: [48.81, 2.37],
    },
    {
        id: 1,
        type: "signal",
        subtype: "arret",
        name: "Signal A",
        position: [48.8, 2.36],
    },
    {
        id: 1,
        type: "signal",
        subtype: "f",
        name: "Signal A",
        position: [48.79, 2.35],
    },
    { id: 2, type: "gare", name: "Gare B", position: [48.85, 2.38] },
    { id: 3, type: "pn", name: "Passage à niveau C", position: [48.83, 2.36] },
];

export default function AgentMap(): JSX.Element {
    const center: [number, number] = [48.8566, 2.3522];

    return (
        <div className="map-wrapper">
            {/* MENU OVERLAY */}
            <div className="map-menu">
                <h3>Menu</h3>
                <button>Action 1</button>
                <button>Action 2</button>
            </div>

            <MapContainer
                className="map-root"
                center={center}
                zoom={13}
                scrollWheelZoom
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {/* Affichage des markers avec icône dynamique */}
                {MapElements.map((el) => (
                    <Marker
                        key={el.id}
                        position={el.position}
                        icon={
                            iconsDef[`${el.type}:${el.subtype}`] ??
                            iconsDef[el.type]
                        }
                    >
                        <Popup>
                            <strong>{el.name}</strong>
                            <br />
                            Type : {el.type}
                            <br />
                            {el.subtype && <>Sous-type : {el.subtype}</>}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
