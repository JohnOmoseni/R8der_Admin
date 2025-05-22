import { useEffect, useRef, useState } from "react";
import {
	FullscreenControl,
	GeolocateControl,
	Map,
	MapRef,
	NavigationControl,
	ScaleControl,
	LogoControl,
} from "@vis.gl/react-maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
	useGetRideById,
	useGetRideByIdDetails,
	useGetRouteWithMapLibre,
} from "@/hook/useShareRideQueries";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { TripDrawer } from "../TripDrawer";
import { Modal } from "@/components/ui/components/Modal";
import Markers from "./MarkersLibre";
import InfoModal from "../InfoModal";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import MapLibreRoute from "./RouteMapLibre";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

function MaplibreMap() {
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
		searchParams.get("tripId") || "e0d4e961-ab08-4890-acf7-b43a274135c1";

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
	// Fetch route data
	const { data: directionData, error: routeError } = useGetRouteWithMapLibre({
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

	useEffect(() => {
		// Center map on route
		if (directionData?.coordinates && mapRef.current) {
			const coords = directionData.coordinates;
			const bounds = coords.reduce(
				(bounds: any, coord: [number, number]) => bounds.extend(coord),
				new maplibregl.LngLatBounds(coords[0], coords[0])
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

	console.log("RIDE DETAILS", rideData, rideDetails, directionData);

	return (
		<>
			<div className="flex-column relative h-svh w-full">
				<div className="absolute top-[20px] z-20 left-[50%] -translate-x-[50%] ">
					<h3 className="rounded-full px-3 pt-2 pb-1.5 bg-background-100 shadow drop-shadow-md">
						Ride Tracking
					</h3>
				</div>

				{routeError && (
					<div className="absolute bottom-[20px] left-6 z-20 rounded px-3 pt-2 pb-1.5 bg-background-100 shadow drop-shadow-md ">
						<p className="text-red-500 font-semibold text-sm text-center">
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
						attributionControl={false}
						mapStyle="https://tiles.openfreemap.org/styles/liberty"
					>
						{rideDetails && (
							<>
								<Markers
									source={rideDetails.source}
									destination={rideDetails.destination}
									currentLocation={
										rideData?.coords ?? {
											lat: rideDetails?.source.lat,
											lng: rideDetails?.source.lng,
										}
									}
								/>
								{directionData?.coordinates && (
									<MapLibreRoute coordinates={directionData.coordinates} />
								)}
							</>
						)}

						<NavigationControl position="bottom-right" />
						<GeolocateControl />
						<FullscreenControl />
						<ScaleControl position="top-left" />
						<LogoControl style={{ display: "none" }} />
					</Map>

					<div className="absolute bottom-[20px] z-20 right-[50%] translate-x-[50%]">
						<TripDrawer
							distance={directionData?.distance}
							duration={directionData?.duration}
							rideDetails={rideDetails}
							rideDetailsError={rideDetailsError}
							isLoading={isFetchingRideDetails}
						/>
					</div>

					{directionData?.distance && (
						<div className="absolute bottom-0 left-0 z-20 rounded-tr-md px-3.5 py-2.5 shadow drop-shadow-sm bg-background-100 flex-column lg:row-flex-start gap-y-1 gap-x-2">
							<h3 className="font-semibold text-center">
								Distance:{" "}
								<span className="font-semibold ml-1 text-sm">
									{(directionData.distance * 0.000621371192).toFixed(2)} Miles
								</span>
							</h3>

							<h3 className="font-semibold ">
								Duration:{" "}
								<span className="font-semibold ml-1 text-sm">
									{(directionData.duration * 60).toFixed(0)} Min
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

export default MaplibreMap;

// {
// 	rideData && (
// 		<>
// 			<Markers
// 				source={rideData.source}
// 				destination={rideData.destination}
// 				currentLocation={rideData.currentLocation}
// 			/>
// 			{directionData?.coordinates && (
// 				<MapBoxRoute coordinates={directionData.coordinates} />
// 			)}
// 		</>
// 	);
// }

// {
// 	directionData?.distance && directionData?.duration && (
// 		<div className="absolute bottom-[40px] z-20 right-[20px]">
// 			<TripDrawer
// 				distance={directionData.distance}
// 				duration={directionData.duration}
// 			/>
// 		</div>
// 	);
// }
// <UserPosition />;
