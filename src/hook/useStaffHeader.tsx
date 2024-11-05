import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { PopoverWrapper } from "@/components/ui/components/PopoverWrapper";
import { Plus, Setting } from "@/constants/icons";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { useUpdateRole } from "./useStaffs";

type Props = Dispatch<SetStateAction<boolean>>;

const rolesDropdown = [
	{
		label: "Admin",
		desc: "Can manage everything on the platform",
		role: "admin-user",
	},
	{
		label: "Staff",
		desc: "Can only view items on the platform",
		role: "staff-user",
	},
];

export default function useStaffHeader(setShowModal: Props, refetch: any) {
	const { user } = useAuth();
	const updateRoleMutation = useUpdateRole();

	const topAction = "badge small-text min-w-[125px] gap-2 !pl-2.5 !pr-3";

	const [loadingStates, setLoadingStates] = useState<boolean[]>(
		rolesDropdown!?.map(() => false)
	);

	const onClickHandlers: {
		[index: number]: (
			role: "admin-user" | "staff-user"
		) => Promise<void> | null;
	} = {
		0: (role: "admin-user" | "staff-user") => handleRoles(role),
		1: (role: "admin-user" | "staff-user") => handleRoles(role),
	};

	const handleItemClick = async (idx: number, role: string) => {
		if (!onClickHandlers || typeof onClickHandlers[idx] !== "function") return;

		setLoadingStates((prev) => {
			const newStates = [...prev];
			newStates[idx] = true;
			return newStates;
		});

		try {
			await onClickHandlers[idx](role as "admin-user" | "staff-user");
		} finally {
			setLoadingStates((prev) => {
				const newStates = [...prev];
				newStates[idx] = false;
				return newStates;
			});
		}
	};

	const handleRoles = async (role: "admin-user" | "staff-user") => {
		try {
			const data = {
				email: user?.email!,
				newRoleName: role,
			};

			await updateRoleMutation.mutateAsync(data);
			toast.success("User role updated successfully");
			refetch();
		} catch {
			console.log("Something went wrong");
		}
	};

	let headerContent;
	headerContent = (
		<div className="max-[450px]:hidden row-flex-start gap-3 md:border-r border-border-100 md:pr-4">
			<PopoverWrapper
				trigger={
					<div className={cn("badge-long", "sm:!px-4")}>
						<Setting className="size-4" />
						<p className="mt-0.5 font-semibold text-base">Manage Roles</p>
					</div>
				}
				list={rolesDropdown}
				containerStyles="w-44"
				renderItem={({ label, desc, role }, index) => {
					return (
						<>
							<div
								className="row-flex-btwn w-full gap-2 first:mb-2 cursor-pointer"
								onClick={() => handleItemClick(index, role)}
							>
								<div className="">
									<p className="font-semibold">{label}</p>
									<p className="mt-1 text-xs">{desc}</p>
								</div>
								{loadingStates[index] && (
									<div className="flex-1 w-full">
										<BtnLoader isLoading={loadingStates[index]} />
									</div>
								)}
							</div>
						</>
					);
				}}
			/>

			<div
				className={cn(
					topAction,
					"!border-border-variant !bg-secondary !text-secondary-foreground"
				)}
				onClick={() => setShowModal(true)}
			>
				<Plus className="size-4 text-secondary-foreground" />
				<p className="mt-0.5 font-semibold">Add Staff</p>
			</div>
		</div>
	);

	return headerContent;
}
