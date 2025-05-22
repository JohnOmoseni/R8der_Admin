import { Source, Layer } from "@vis.gl/react-maplibre";
import { Feature, LineString, GeoJsonProperties } from "geojson";

interface MapBoxRouteProps {
	coordinates: [number, number][];
}

function MapLibreRoute({ coordinates }: MapBoxRouteProps) {
	const geojson: Feature<LineString, GeoJsonProperties> = {
		type: "Feature",
		geometry: {
			type: "LineString",
			coordinates,
		},
		properties: {},
		// { name: "Route", id: "route1" }
	};

	return (
		<Source type="geojson" data={geojson}>
			<Layer
				type="line"
				layout={{ "line-join": "round", "line-cap": "square" }}
				paint={{ "line-color": "#0462d4", "line-width": 3 }}
			/>
		</Source>
	);
}

export default MapLibreRoute;
