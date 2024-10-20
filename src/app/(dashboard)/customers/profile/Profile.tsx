import { cn } from "@/lib/utils";
import { GetRiderByIdResponse } from "@/types/server";

function Profile({ profileInfo }: { profileInfo?: GetRiderByIdResponse }) {
	const profile = [
		{
			label: "First name",
			value: profileInfo?.fullName?.split(" ")[0],
		},
		{
			label: "Last name",
			value: profileInfo?.fullName?.split(" ")[-1] || "",
		},
		{
			label: "Email address",
			value: profileInfo?.emailAddress,
		},
		{
			label: "Phone number",
			value: profileInfo?.phoneNumber,
		},
	];

	const trips = [
		{
			label: "Total trips",
			value: profileInfo?.totalTrips,
		},
		{
			label: "Total amount paid",
			value: profileInfo?.totalAmountPaid,
		},
	];

	return (
		<div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
			<div className="rounded-lg border border-border-100 text-base">
				<div className="row-flex-btwn w-full gap-4 px-3 py-3 border-b border-border-100">
					<p className="font-semibold">Profile</p>
				</div>

				{profile?.map((info, idx) => (
					<div
						key={idx}
						className="row-flex-btwn group w-full gap-4 px-3 py-2.5"
					>
						<p className="flex-1 font-light text-foreground-100">
							{info?.label}
						</p>
						<p className={cn("font-semibold")}>{info?.value || "-"}</p>
					</div>
				))}
			</div>

			{/* TRIPS */}
			<div className="rounded-lg border border-border-100 text-base">
				<div className="row-flex-btwn w-full gap-4 px-3 py-3 border-b border-border-100">
					<p className="font-semibold">Trips</p>
				</div>

				{trips?.map((trip, idx) => (
					<div
						key={idx}
						className="row-flex-btwn group w-full gap-4 px-3 py-2.5"
					>
						<p className="flex-1 font-light ">{trip?.label}</p>

						<p className={cn("font-semibold")}>{trip.value || "-"}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Profile;
