import { Marker } from "react-map-gl/mapbox";
import { Coordinates } from "@/hook/useShareRideQueries";
import { CarIcon, DestinationIcon } from "@/constants/icons";

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
					{/* <Pin size={30} /> */}
					<CarIcon className="w-[25px]" />
				</Marker>
			)}
		</>
	);
}

export default Markers;
