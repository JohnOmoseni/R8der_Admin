import { Marker } from "react-map-gl/mapbox";
import { Coordinates } from "@/hook/useShareRideQueries";
import { DestinationIcon } from "@/constants/icons";
import Pin from "./Pin";

interface MarkersProps {
	source?: Coordinates;
	destination?: Coordinates;
	currentLocation?: Coordinates;
}

function Markers({ source, destination, currentLocation }: MarkersProps) {
	return (
		<>
			{source && (
				<Marker
					longitude={source.lng}
					latitude={source.lat}
					anchor="bottom"
				></Marker>
			)}
			{destination && (
				<Marker
					longitude={destination.lng}
					latitude={destination.lat}
					anchor="bottom"
				>
					<DestinationIcon className="size-10" />
				</Marker>
			)}
			{currentLocation && (
				<Marker
					longitude={currentLocation.lng}
					latitude={currentLocation.lat}
					anchor="bottom-left"
				>
					<Pin size={30} />
				</Marker>
			)}
		</>
	);
}

export default Markers;
