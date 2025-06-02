import { Marker } from "react-map-gl/mapbox";
import { Coordinates } from "@/hook/useShareRideQueries";
import { DestinationIcon } from "@/constants/icons";
import { useEffect, useRef, useState } from "react";

interface MarkersProps {
	source?: Coordinates;
	destination?: Coordinates;
	currentLocation?: Coordinates;
}

const CarIcon = ({ rotation }: { rotation: number }) => (
	<svg
		width="30"
		height="30"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		style={{
			transform: `rotate(${rotation}deg)`,
			transition: "transform 0.5s ease-in-out",
		}}
	>
		<path
			d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.29 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM6.5 16C5.67 16 5 15.33 5 14.5C5 13.67 5.67 13 6.5 13C7.33 13 8 13.67 8 14.5C8 15.33 7.33 16 6.5 16ZM17.5 16C16.67 16 16 15.33 16 14.5C16 13.67 16.67 13 17.5 13C18.33 13 19 13.67 19 14.5C19 15.33 18.33 16 17.5 16ZM5 11L6.5 6.5H17.5L19 11H5Z"
			fill="#FF5733"
		/>
	</svg>
);

function Markers({ source, destination, currentLocation }: MarkersProps) {
	// State for smooth interpolation and rotation
	const [animatedLocation, setAnimatedLocation] = useState<Coordinates | null>(
		currentLocation!
	);
	const [rotation, setRotation] = useState(0);
	const prevLocation = useRef<Coordinates | null>(null);

	// Smoothly animate marker position
	useEffect(() => {
		if (!currentLocation) return;

		// Calculate bearing (direction) for rotation
		if (prevLocation.current && currentLocation) {
			const bearing = calculateBearing(prevLocation.current, currentLocation);
			setRotation(bearing);
		}

		// Smooth transition using a simple interpolation
		const steps = 60; // Number of animation steps
		const start = animatedLocation || currentLocation;
		const deltaLat = (currentLocation.lat - start.lat) / steps;
		const deltaLng = (currentLocation.lng - start.lng) / steps;

		let step = 0;
		const interval = setInterval(() => {
			step++;
			if (step >= steps) {
				setAnimatedLocation(currentLocation);
				clearInterval(interval);
			} else {
				setAnimatedLocation({
					lat: start.lat + deltaLat * step,
					lng: start.lng + deltaLng * step,
				});
			}
		}, 16); // ~60 FPS (1000ms / 60 = 16ms per frame)

		prevLocation.current = currentLocation;
		return () => clearInterval(interval);
	}, [currentLocation]);

	// Calculate bearing between two points for car rotation
	const calculateBearing = (start: Coordinates, end: Coordinates) => {
		const toRadians = (deg: number) => (deg * Math.PI) / 180;
		const toDegrees = (rad: number) => (rad * 180) / Math.PI;

		const lat1 = toRadians(start.lat);
		const lng1 = toRadians(start.lng);
		const lat2 = toRadians(end.lat);
		const lng2 = toRadians(end.lng);

		const dLng = lng2 - lng1;
		const y = Math.sin(dLng) * Math.cos(lat2);
		const x =
			Math.cos(lat1) * Math.sin(lat2) -
			Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
		const bearing = toDegrees(Math.atan2(y, x));
		return (bearing + 360) % 360; // Normalize to 0-360 degrees
	};

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
				<Marker longitude={destination.lng} latitude={destination.lat}>
					<DestinationIcon className="size-9" />
				</Marker>
			)}
			{/* {currentLocation && (
				<Marker
					longitude={currentLocation.lng}
					latitude={currentLocation.lat}
					anchor="bottom-left"
				>
				</Marker>
 				)} 
 			*/}

			{animatedLocation && (
				<Marker
					longitude={animatedLocation.lng}
					latitude={animatedLocation.lat}
					anchor="center" // Center the car icon for better rotation
				>
					<div
						style={{
							transition: "all 0.1s linear", // Smooth movement
						}}
					>
						<CarIcon rotation={rotation} />
					</div>
				</Marker>
			)}
		</>
	);
}

export default Markers;
