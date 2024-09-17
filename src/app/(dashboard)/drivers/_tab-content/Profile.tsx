import { Useravatar as UserAvatar } from "@/constants/icons";
import Profile from "../../_sections/Profile";

function ProfileContent({
	profileInfo,
	type,
	headingTitle,
}: {
	profileInfo?: any;
	type: "customerInfo" | "driverInfo" | "vehicleInfo" | "documents";
	headingTitle: string;
}) {
	return (
		<div className="flex-column gap-8">
			{profileInfo?.img ? (
				<img
					src={profileInfo?.img}
					alt="Profile Picture"
					className="rounded-full h-32 w-32 border border-border object-cover"
				/>
			) : (
				<UserAvatar className="w-fit" />
			)}

			<Profile
				type={type}
				profileInfo={profileInfo}
				headingTitle={headingTitle}
			/>
		</div>
	);
}

export default ProfileContent;
