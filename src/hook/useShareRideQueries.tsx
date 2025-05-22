import { database } from "@/lib/firebase";
import { ref, onValue, off } from "firebase/database";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { tripsApi } from "@/server/actions/trips";

export interface Coordinates {
	lat: number;
	lng: number;
}

type TripStatusType = "IN_PROGRESS" | "START_TRIP" | "END_TRIP";
interface FirebaseTripDataType {
	TripStatus: TripStatusType;
	latitude: string;
	longitude: string;
	tripId: string;
	userId: string;
}

interface RideData {
	coords: Coordinates;
	tripId: string;
}

interface RouteData {
	coordinates: [number, number][];
	distance: number;
	duration: number;
}

export interface TripDataType {
	trip_status: TripStatusType;
	trip_date: string;
	driver_name: string;
	customer_name: string;
	pick_up: string;
	destination_address: string;
	car: string;
	car_color: string;
	plate_number: string;
	fare_amount: number;
	transaction_charge: number;
	vat: number;
	trip_id: string;
	avatar: string;
	source: Coordinates;
	destination: Coordinates;
}

export function useGetRideById({
	tripId,
	enabled = true,
}: {
	tripId: string;
	enabled?: boolean;
}) {
	const [data, setData] = useState<RideData | null>(null);
	const [tripStatus, setTripStatus] = useState<TripStatusType | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!tripId || !enabled) {
			setIsLoading(false);
			return;
		}

		const locationRef = ref(database, `UpdateLocation/${tripId}`);

		// Real-time listener setup
		const unsubscribe = onValue(
			locationRef,
			(snapshot) => {
				if (snapshot.exists()) {
					const currentLocationData: FirebaseTripDataType = snapshot.val();
					const trip_status = currentLocationData?.TripStatus;
					console.log("New location data:", currentLocationData);

					if (currentLocationData?.latitude && currentLocationData?.longitude) {
						const data: any = {
							coords: {
								lat: Number(currentLocationData.latitude),
								lng: Number(currentLocationData.longitude),
							},
							tripId: currentLocationData.tripId,
						};
						setData(data);
						setError(null);
					} else {
						setData(null);
						setError(null);
						// setError(new Error("Coordinates data not found"));
					}

					setTripStatus(trip_status);
				} else {
					setError(new Error("Ride not found"));
					setData(null);
					setTripStatus(null);
				}
				setIsLoading(false);
			},
			(err) => {
				setError(new Error("Failed to fetch ride data: " + err.message));
				setData(null);
				setIsLoading(false);
			}
		);

		// Clean up listener on unmount or when tripId/enabled changes
		return () => {
			off(locationRef);
			unsubscribe();
		};
	}, [tripId, enabled]);

	return { data, error, isLoading, tripStatus };
}

export function useGetRideByIdDetails({
	tripId,
	enabled = true,
}: {
	tripId: string;
	enabled?: boolean;
}) {
	return useQuery<any, Error>({
		queryKey: ["trip", tripId],
		queryFn: () => tripsApi.getTripById(tripId),
		select: (data) => {
			const response = data.data;
			const format_response: TripDataType = {
				trip_status: response?.trip_status,
				trip_date: response?.trip_date,
				driver_name: response?.driver_name || "Unknown",
				customer_name: response?.customer_name || "Unknown",
				pick_up: response?.pick_up || "Unknown",
				destination_address: response?.destination || "Unknown",
				car: response?.car || "Unknown",
				car_color: response?.car_colour || "Unknown",
				plate_number: response?.plate_number || "-",
				fare_amount: response.fare_amount || 0.0,
				transaction_charge: response?.transaction_charge || 0.0,
				vat: response?.vat || 0.0,
				trip_id: response?.trip_id || "",
				avatar: response?.driver_profile_picture || "",
				source: {
					lat: response?.pick_up_location
						? response?.pick_up_location?.split(",")[0]
						: 0.0,
					lng: response?.pick_up_location
						? response?.pick_up_location?.split(",")[1]
						: 0.0,
				},
				destination: {
					lat: response?.destination_location
						? response?.destination_location?.split(",")[0]
						: 0.0,
					lng: response?.pick_up_location
						? response?.pick_up_location?.split(",")[1]
						: 0.0,
				},
			};

			return format_response;
		},
		enabled: enabled,
		// refetchInterval: 5000, // Poll every 5 seconds
		retry: 3,
	});
}

export function useGetRoute({
	source,
	destination,
	enabled = true,
}: {
	source?: Coordinates;
	destination?: Coordinates;
	enabled?: boolean;
}) {
	return useQuery({
		queryKey: ["route", source, destination],
		queryFn: async () => {
			const response = await fetch(
				`https://api.mapbox.com/directions/v5/mapbox/driving/` +
					`${source!.lng},${source!.lat};${destination!.lng},${
						destination!.lat
					}?` +
					`access_token=${
						import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
					}&geometries=geojson`
			);
			const data = await response.json();
			if (!data.routes || data.routes.length === 0) {
				throw new Error("Route not found");
			}
			return data;
		},
		enabled: !!source && !!destination && enabled,
		retry: 1,
	});
}

export function useGetRouteWithMapLibre({
	source,
	destination,
	enabled = true,
}: {
	source?: Coordinates;
	destination?: Coordinates;
	enabled?: boolean;
}) {
	return useQuery<RouteData, Error>({
		queryKey: ["route", source, destination],
		queryFn: async () => {
			const response = await fetch(
				`https://api.openrouteservice.org/v2/directions/driving-car/geojson`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${
							import.meta.env.VITE_OPENROUTESERVICE_API_KEY
						}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						coordinates: [
							[source!.lng, source!.lat],
							[destination!.lng, destination!.lat],
						],
					}),
				}
			);
			const data = await response.json();
			if (!data.features || data.features.length === 0) {
				throw new Error("Route not found");
			}
			const coordinates = data.features[0].geometry.coordinates;
			const distance = data.features[0].properties.segments[0].distance; // Meters
			const duration = data.features[0].properties.segments[0].duration; // Seconds
			return { coordinates, distance, duration };
		},
		enabled: !!source && !!destination && enabled,
		retry: 1,
	});
}
