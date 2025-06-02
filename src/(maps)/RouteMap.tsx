import { Source, Layer } from "react-map-gl/mapbox";
import { Feature, LineString, GeoJsonProperties } from "geojson";

interface MapBoxRouteProps {
	coordinates: [number, number][];
}

function MapBoxRoute({ coordinates }: MapBoxRouteProps) {
	const geojson: Feature<LineString, GeoJsonProperties> = {
		type: "Feature",
		geometry: {
			type: "LineString",
			coordinates,
		},
		properties: {},
	};

	return (
		<Source type="geojson" data={geojson}>
			<Layer
				type="line"
				layout={{ "line-join": "round", "line-cap": "round" }}
				paint={{ "line-color": "#0462d4", "line-width": 5 }}
			/>
		</Source>
	);
}

export default MapBoxRoute;
