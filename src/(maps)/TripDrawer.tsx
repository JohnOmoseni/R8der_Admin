import FallbackLoader from "@/components/fallback/FallbackLoader";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { EndCircle, StartCircle, Useravatar } from "@/constants/icons";
import { TripDataType } from "@/hook/useShareRideQueries";
import { useMemo } from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

interface DistanceTimeProps {
	distance?: number;
	duration?: number;
	rideDetails: TripDataType;
	rideDetailsError: any;
	isLoading: boolean;
}

export function TripDrawer({
	distance,
	duration,
	rideDetails,
	rideDetailsError,
	isLoading,
}: DistanceTimeProps) {
	const info = useMemo(() => {
		if (!rideDetails) return {};
		return {
			trip_status: rideDetails.trip_status,
			driver_name: rideDetails.driver_name,
			customer_name: rideDetails.customer_name,
			avatar: rideDetails.avatar,
			plate_number: rideDetails.plate_number,
			car_color: rideDetails.car_color,
			car: rideDetails.car,
			time: rideDetails.trip_date
				? dayjs(rideDetails.trip_date).format("h:mm A")
				: "-",
			pickup_address: rideDetails.pick_up,
			destination_address: rideDetails.destination_address,
		};
	}, [rideDetails]);

	const distance_value = distance ? (distance / 1000).toFixed(2) : 0;
	const eta_value = duration ? (duration / 60).toFixed(0) : 0;

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button
					variant="outline"
					className="font-semibold pt-2 pb-1.5 shadow drop-shadow-md"
				>
					View Ride Details
				</Button>
			</DrawerTrigger>

			<DrawerContent>
				{isLoading ? (
					<div className="loader-container ">
						<FallbackLoader />
					</div>
				) : rideDetailsError ? (
					<>
						<DrawerHeader>
							<DrawerTitle>Error fetching Trip details</DrawerTitle>
							<DrawerDescription className="text-grey">
								{rideDetailsError?.message}
							</DrawerDescription>
						</DrawerHeader>

						<div className="h-[140px]" />

						<DrawerFooter>
							<DrawerClose asChild>
								<Button variant="outline">Cancel</Button>
							</DrawerClose>
						</DrawerFooter>
					</>
				) : (
					<div className="mx-auto w-full max-w-md">
						<DrawerHeader>
							<DrawerTitle>
								{eta_value}min {distance_value}km
							</DrawerTitle>
							<DrawerDescription className="text-grey">
								<span className="capitalize">{info.customer_name}</span> was
								picked up at <span className="font-semibold">{info.time}</span>
							</DrawerDescription>
						</DrawerHeader>
						<div className="pt-4 pb-0 flex-column gap-6 md:gap-8">
							<div className="bg-white border rounded-xl relative p-4 shadow-sm items-center grid">
								<div className="row-flex-btwn gap-4">
									<div className="row-flex-start gap-3 flex-1">
										{info.avatar ? (
											<img
												src={info.avatar}
												alt="Profile Picture"
												className="rounded-full size-[64px] border border-border object-cover"
											/>
										) : (
											<Useravatar className="w-12" />
										)}

										<h3 className="text-lg font-bold capitalize tracking-tighter">
											{info.driver_name}
										</h3>
									</div>

									<div className="flex-column items-end gap-2">
										<div className="badge-long !text-[1rem] !border-input !py-1.5 !px-3.5">
											{info.plate_number}
										</div>

										<p className="text-base mr-1">{info.car_color}</p>
									</div>
								</div>
							</div>

							<div className="bg-white border rounded-xl relative px-4 py-6 shadow-md items-center grid">
								<div className="absolute left-6 h-full flex-column items-center justify-center">
									<StartCircle className="size-3" />
									<div className="w-px rounded-full h-[calc(100%-100px)] -ml-px bg-gray-300 min-h-5 my-1.5" />
									<EndCircle className="size-3" />
								</div>

								<div className="flex-column gap-4 ml-10 mr-5">
									<p className="leading-5 line-clamp-3">
										{info.pickup_address}
									</p>

									<p className="leading-5 line-clamp-3">
										{info.destination_address}
									</p>
								</div>
							</div>

							<div className="h-[30px]"></div>
						</div>
						<DrawerFooter>
							<DrawerClose asChild>
								<Button variant="outline">Cancel</Button>
							</DrawerClose>
						</DrawerFooter>
					</div>
				)}
			</DrawerContent>
		</Drawer>
	);
}
