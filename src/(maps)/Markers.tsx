import { Marker } from "react-map-gl/mapbox";
import { Coordinates } from "@/hook/useShareRideQueries";
import { SourceIcon } from "@/constants/icons";
interface MarkersProps {
	source?: Coordinates;
	destination?: Coordinates;
	currentLocation?: Coordinates;
}

const CarIcon = () => (
	<svg
		width="30"
		height="30"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		style={{
			transition: "transform 0.3s ease-in-out",
		}}
	>
		<path
			d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.29 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM6.5 16C5.67 16 5 15.33 5 14.5C5 13.67 5.67 13 6.5 13C7.33 13 8 13.67 8 14.5C8 15.33 7.33 16 6.5 16ZM17.5 16C16.67 16 16 15.33 16 14.5C16 13.67 16.67 13 17.5 13C18.33 13 19 13.67 19 14.5C19 15.33 18.33 16 17.5 16ZM5 11L6.5 6.5H17.5L19 11H5Z"
			fill="#6a76f7"
		/>
	</svg>
);

function Markers({ source, destination, currentLocation }: MarkersProps) {
	return (
		<>
			{source && (
				<Marker longitude={source.lng} latitude={source.lat} anchor="bottom">
					<SourceIcon className="w-fit h-9" />
				</Marker>
			)}
			{destination && (
				<Marker longitude={destination.lng} latitude={destination.lat} />
			)}

			{currentLocation && (
				<Marker
					longitude={currentLocation.lng}
					latitude={currentLocation.lat}
					anchor="center" // Center the car icon for better rotation
				>
					<div
						style={{
							transition: "all 0.1s linear", // Smooth movement
						}}
					>
						<CarIcon />
					</div>
				</Marker>
			)}
		</>
	);
}

export default Markers;
