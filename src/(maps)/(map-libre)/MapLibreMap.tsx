import { useRef, useState } from "react";
import { Map } from "@vis.gl/react-maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
	useGetRideById,
	useGetRouteWithMapLibre,
} from "@/hook/useShareRideQueries";
import Markers from "./MarkersLibre";
import UserPosition from "./UserPosition";
import { TripDrawer } from "../TripDrawer";
import MapBoxRoute from "../RouteMap";

function MaplibreMap() {
	const mapRef = useRef<any>(null);
	const [viewState, setViewState] = useState({
		longitude: 8.6753, // Middle of Nigeria
		latitude: 9.082,
		zoom: 4,
	});

	const urlParams = new URLSearchParams(window.location.search);
	const rideId = urlParams.get("rideId");

	const {
		data: rideData,
		error: rideError,
		isLoading,
	} = useGetRideById({
		rideId: rideId || "",
		enabled: !!rideId,
	});

	// Fetch route data
	const { data: directionData, error: routeError } = useGetRouteWithMapLibre({
		source: rideData?.source,
		destination: rideData?.destination,
		enabled: !!rideData?.source && !!rideData?.destination,
	});

	// Center map on route
	if (directionData?.coordinates && mapRef.current) {
		const coords = directionData.coordinates;
		const bounds = coords.reduce(
			(bounds: any, coord: [number, number]) => bounds.extend(coord),
			new maplibregl.LngLatBounds(coords[0], coords[0])
		);
		mapRef.current.fitBounds(bounds, { padding: 50 });
	}

	if (isLoading) {
		return <p className="text-gray-500">Loading ride data...</p>;
	}

	if (rideError || routeError) {
		<p className="text-red-500">{rideError?.message || routeError?.message}</p>;
	}

	return (
		<div className="flex-column gap-6">
			<div className="h-[100svh] overflow-hidden relative">
				<Map
					ref={mapRef}
					{...viewState}
					onMove={(evt) => setViewState(evt.viewState)}
					// style={{ width: "100%", height: "100%", borderRadius: 10 }}
					style={{ width: "100%", height: "100%" }}
					mapStyle="https://tiles.openfreemap.org/styles/liberty"
				>
					{rideData && (
						<>
							<Markers
								source={rideData.source}
								destination={rideData.destination}
								currentLocation={rideData.currentLocation}
							/>
							{directionData?.coordinates && (
								<MapBoxRoute coordinates={directionData.coordinates} />
							)}
						</>
					)}
				</Map>
				{directionData?.distance && directionData?.duration && (
					<div className="absolute bottom-[40px] z-20 right-[20px]">
						<TripDrawer
							distance={directionData.distance}
							duration={directionData.duration}
						/>
					</div>
				)}
				<UserPosition />
			</div>
		</div>
	);
}

export default MaplibreMap;
