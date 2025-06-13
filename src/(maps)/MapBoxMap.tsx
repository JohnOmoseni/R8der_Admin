import { useEffect, useRef, useState } from "react";
import { TripDrawer } from "./TripDrawer";
import {
	Coordinates,
	useGetRideById,
	useGetRideByIdDetails,
	useGetRoute,
} from "@/hook/useShareRideQueries";
import { Modal } from "@/components/ui/components/Modal";

import Map, {
	FullscreenControl,
	GeolocateControl,
	NavigationControl,
	ScaleControl,
} from "react-map-gl/mapbox";
import type { MapRef } from "react-map-gl/mapbox";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "react-router-dom";

import InfoModal from "./InfoModal";
import Markers from "./Markers";
import MapBoxRoute from "./RouteMap";
import mapboxgl from "mapbox-gl";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import "mapbox-gl/dist/mapbox-gl.css";

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
	const { handleLogin, token, user } = useAuth();

	const [searchParams] = useSearchParams();
	const tripId =
		searchParams.get("tripId") || "aad75df5-f617-406c-8203-d7fc4cf640b0";

	const {
		data: rideData,
		error: rideError,
		isLoading,
		tripStatus,
	} = useGetRideById({
		tripId: tripId,
		enabled: !!tripId,
	});

	const {
		data: rideDetails,
		error: rideDetailsError,
		isLoading: isFetchingRideDetails,
	} = useGetRideByIdDetails({
		tripId: tripId,
		enabled: !!tripId && !!token,
	});

	// State for smooth interpolation and rotation
	const [animatedLocation, setAnimatedLocation] = useState<Coordinates | null>(
		null
	);
	const prevLocation = useRef<Coordinates | null>(null);

	// Fetch route data
	const { data: directionData, error: routeError } = useGetRoute({
		source: rideData?.coords || rideDetails?.source,
		destination: rideDetails?.destination,
		enabled: !!rideData?.coords && !!rideDetails?.destination,
	});

	// login user
	useEffect(() => {
		const loginUser = async () => {
			if (!ADMIN_EMAIL || !ADMIN_PASSWORD || token || user) return;
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

	// Trip status changes (e.g., show modal and zoom in on trip start)
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

		if (tripStatus === "START_TRIP" && rideData?.coords && mapRef.current) {
			mapRef.current.flyTo({
				center: [rideData.coords.lng, rideData.coords.lat],
				zoom: 14, // Zoom in to 14 when trip starts
				speed: 1.2,
				curve: 1,
				essential: true,
			});
		}
	}, [tripStatus]);

	// Center map on route initially
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

	// Smoothly animate marker position
	useEffect(() => {
		if (!rideData?.coords) return;

		const currentLocation = rideData.coords;

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
	}, [rideData?.coords]);

	// Dynamically follow car without resetting zoom unless necessary
	useEffect(() => {
		if (animatedLocation && mapRef.current) {
			const currentZoom = mapRef.current.getZoom();
			const targetZoom = 14; // Desired zoom level

			mapRef.current.flyTo({
				center: [animatedLocation.lng, animatedLocation.lat],
				zoom: currentZoom < targetZoom ? targetZoom : currentZoom,
				speed: 1.2, // Smooth transition speed
				curve: 1, // Smooth curve for zoom
				essential: true,
			});
		}
	}, [animatedLocation]);

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
						mapboxAccessToken={MAPBOX_TOKEN}
						attributionControl={false}
						interactiveLayerIds={["3d-buildings", "water"]}
						interactive={true}
						logoPosition="bottom-left"
					>
						{rideDetails && (
							<>
								<Markers
									source={rideDetails.source}
									destination={rideDetails.destination}
									currentLocation={
										animatedLocation ?? {
											lat: rideDetails?.source.lat,
											lng: rideDetails?.source.lng,
										}
									}
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
				</div>

				{directionData?.routes[0] && (
					<div className="fixed top-1/2 -translate-y-1/2 -left-[54px] rotate-[90deg] z-20 rounded-t-md shadow drop-shadow-sm w-[155px] h-[48px] overflow-hidden">
						<div className="size-full px-3 bg-background py-2 flex-column gap-y-1 gap-x-2">
							<h3 className="font-semibold truncate text-xs">
								Distance:{" "}
								<span className="font-semibold">
									{directionData.routes[0]?.distance
										? (
												directionData.routes[0]?.distance * 0.000621371192
										  ).toFixed(2)
										: "N/A"}{" "}
									Miles
								</span>
							</h3>

							<h3 className="font-semibold truncate text-xs">
								Duration:{" "}
								<span className="font-semibold">
									{(directionData.routes[0]?.duration / 60).toFixed(0)} Min
								</span>
							</h3>
						</div>
					</div>
				)}
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
