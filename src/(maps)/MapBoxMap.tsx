import { useEffect, useRef, useState } from "react";
import { TripDrawer } from "./TripDrawer";
import {
	useGetRideById,
	useGetRideByIdDetails,
	useGetRoute,
} from "@/hook/useShareRideQueries";
import { Modal } from "@/components/ui/components/Modal";
import InfoModal from "./InfoModal";
import Markers from "./Markers";
import MapBoxRoute from "./RouteMap";
import mapboxgl from "mapbox-gl";
import FallbackLoader from "@/components/fallback/FallbackLoader";

import Map, {
	FullscreenControl,
	GeolocateControl,
	NavigationControl,
	ScaleControl,
} from "react-map-gl/mapbox";
import type { MapRef } from "react-map-gl/mapbox";
import { useAuth } from "@/context/AuthContext";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSearchParams } from "react-router-dom";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function MapboxMap() {
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<MapRef>(null);
	const [viewState, setViewState] = useState({
		longitude: 18.4241, // Default: Cape Town, South Africa
		latitude: -33.9249,
		zoom: 8,
	});

	const [isSigningUser, setIsSigningUser] = useState(false);
	const [openModal, setOpenModal] = useState<
		{ title: string; description: string; type: "alert" | "stop" } | false
	>(false);
	const { handleLogin, token } = useAuth();

	const [searchParams] = useSearchParams();
	const tripId =
		searchParams.get("tripId") || "aadc0087-25c9-4782-ad82-7c4906a9a4d3";

	const {
		data: rideData,
		error: rideError,
		isLoading,
		tripStatus,
	} = useGetRideById({
		tripId: tripId,
		enabled: !!tripId,
		// tripId: "aadc0087-25c9-4782-ad82-7c4906a9a4d3",
	});

	const {
		data: rideDetails,
		error: rideDetailsError,
		isLoading: isFetchingRideDetails,
	} = useGetRideByIdDetails({
		// tripId: rideData?.tripId || tripId,
		// enabled: !!rideData?.tripId,
		tripId: tripId,
		enabled: !!tripId,
	});

	// Fetch route data
	const { data: directionData, error: routeError } = useGetRoute({
		source: rideDetails?.source,
		destination: rideDetails?.destination,
		enabled: !!rideDetails?.source && !!rideDetails?.destination,
	});

	useEffect(() => {
		const loginUser = async () => {
			if (!ADMIN_EMAIL || !ADMIN_PASSWORD || token) return;
			setIsSigningUser(true);
			try {
				await handleLogin(ADMIN_EMAIL, ADMIN_PASSWORD, true);
			} catch (e) {
				console.log(e);
			} finally {
				setIsSigningUser(false);
			}
		};

		loginUser();
	}, []);

	useEffect(() => {
		if (tripStatus === "START_TRIP" || tripStatus === "END_TRIP") {
			const title = tripStatus === "START_TRIP" ? "Trip started" : "Trip ended";
			const description =
				tripStatus === "START_TRIP"
					? "Driver has started the trip"
					: "Trip has ended";
			const type = tripStatus === "START_TRIP" ? "alert" : "stop";
			setOpenModal({ title, description, type });
		}
	}, [tripStatus]);

	// Center map on route
	useEffect(() => {
		if (directionData?.routes?.[0] && mapRef.current) {
			const coords = directionData.routes[0].geometry.coordinates;
			const bounds = coords.reduce(
				(bounds: any, coord: [number, number]) => bounds.extend(coord),
				new mapboxgl.LngLatBounds(coords[0], coords[0])
			);
			mapRef.current.fitBounds(bounds, { padding: 50 });
		}
	}, [directionData]);

	if (isLoading || isSigningUser) {
		return (
			<div className="loader-full">
				<FallbackLoader loading />
			</div>
		);
	}
	if (rideError) {
		return (
			<div className="loader-full">
				<div className="">Error fetching trip info: {rideError.message}</div>
			</div>
		);
	}
	if (!tripId) {
		return (
			<div className="loader-full">
				<div className="">Unable to load trip</div>
			</div>
		);
	}

	console.log("RIDE DETAILS", rideData, rideDetails);
	return (
		<>
			<div className="flex-column relative h-svh w-full">
				<div className="absolute top-[20px] z-20 left-[50%] -translate-x-[50%] ">
					<h3 className="rounded-full px-3 pt-2 pb-1.5 bg-background-100 shadow drop-shadow-md">
						Ride Tracking
					</h3>
				</div>

				{routeError && (
					<div className="absolute bottom-[20px] z-20 left-6 rounded-full px-3 pt-2 pb-1.5 bg-background-100 shadow drop-shadow-md">
						<p className="text-red-500 text-center font-semibold text-sm">
							{routeError.message}
						</p>
					</div>
				)}

				<div
					ref={mapContainerRef}
					className="size-full overflow-hidden relative"
				>
					<Map
						ref={mapRef}
						{...viewState}
						onMove={(evt) => setViewState(evt.viewState)}
						style={{ width: "100%", height: "100%" }}
						mapStyle="mapbox://styles/mapbox/streets-v9"
						// mapStyle="mapbox://styles/mapbox/streets-v12"
						mapboxAccessToken={MAPBOX_TOKEN}
						attributionControl={false}
						interactiveLayerIds={["3d-buildings", "water"]}
						interactive={true}
					>
						{rideDetails && rideData && (
							<>
								<Markers
									source={rideDetails.source}
									destination={rideDetails.destination}
									currentLocation={rideData.coords}
								/>
								{directionData?.routes && (
									<MapBoxRoute
										coordinates={directionData.routes[0].geometry.coordinates}
									/>
								)}
							</>
						)}
						<NavigationControl position="bottom-right" />
						<GeolocateControl />
						<FullscreenControl />
						<ScaleControl position="top-left" />
					</Map>

					<div className="absolute bottom-[20px] z-20 right-[50%] translate-x-[50%]">
						<TripDrawer
							distance={directionData?.routes[0]?.distance}
							duration={directionData?.routes[0]?.duration}
							rideDetails={rideDetails}
							rideDetailsError={rideDetailsError}
							isLoading={isFetchingRideDetails}
						/>
					</div>

					{directionData?.routes[0] && (
						<div className="absolute bottom-0 left-0 z-20 rounded px-3.5 py-2.5 shadow drop-shadow-sm bg-background-100 flex-column lg:row-flex-start gap-y-1 gap-x-2">
							<h3 className="font-semibold text-center">
								Distance:{" "}
								<span className="font-semibold text-sm">
									{(directionData.routes[0]?.distance * 0.000621371192).toFixed(
										2
									)}{" "}
									Miles
								</span>
							</h3>

							<h3 className="font-semibold text-center">
								Duration:{" "}
								<span className="font-semibold text-sm">
									{(directionData.routes[0]?.duration / 60).toFixed(0)} Min
								</span>
							</h3>
						</div>
					)}
				</div>
			</div>

			{tripStatus && openModal && (
				<Modal
					openModal={Boolean(openModal)}
					setOpenModal={() => setOpenModal(false)}
					hideClose
					modalStyles="max-w-md flex-column gap-4"
				>
					<InfoModal
						title={openModal.title}
						description={openModal.description}
						type={openModal.type}
						onClick={() => setOpenModal(false)}
					/>
				</Modal>
			)}
		</>
	);
}

export default MapboxMap;
