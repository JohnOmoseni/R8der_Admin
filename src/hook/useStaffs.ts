import { GetAllEmployeesType } from "@/types/server";
import { useQuery } from "@tanstack/react-query";
import { staffApi } from "@/server/actions/staffs";
import { AddStaffParams, UpdateRoleParams, SELECTEDTYPE } from "@/types/server";
import {
	useMutation,
	UseMutationResult,
	useQueryClient,
} from "@tanstack/react-query";

// STAFFS ----------------------------------------------------------------
// GET ALL STAFFS

export const useGetStaffs = () => {
	return useQuery({
		queryKey: ["getStaffsAndAdmins"],
		queryFn: () => staffApi.getAllEmployee(),

		select: (data) => {
			const res: GetAllEmployeesType[] = data.data;

			const employees = res?.map((item) => ({
				...item,
				roleName: item?.roleName === "admin-user" ? "Admin" : "Staff",
			}));

			return employees;
		},
	});
};

// STAFFS MUTATION
// ACTIVATE STAFF
export const useActivateStaff = (): UseMutationResult<
	any,
	unknown,
	SELECTEDTYPE,
	unknown
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (selectedIds: SELECTEDTYPE) =>
			staffApi.activateStaff(selectedIds),
		onError: (error) => console.error("[Activate Staff Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getStaffsAndAdmins"] });
		},
	});
};

// DEACTIVATE STAFF
export const useDeactivateStaff = (): UseMutationResult<
	any,
	unknown,
	SELECTEDTYPE,
	unknown
> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (selectedIds: SELECTEDTYPE) =>
			staffApi.deactivateStaff(selectedIds),
		onError: (error) => console.error("[Deactivate Staff Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getStaffsAndAdmins"] });
		},
	});
};

// DELETE STAFF
export const useDeleteStaff = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (selectedIds: SELECTEDTYPE) =>
			staffApi.deleteStaff(selectedIds),
		onError: (error) => console.error("[Error deleting Staff]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getStaffsAndAdmins"] });
		},
	});
};

// ADD STAFF
export const useAddStaff = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: AddStaffParams) => staffApi.addStaffPost(data),
		onError: (error) => console.error("[Adding Staff Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getStaffsAndAdmins"] });
		},
	});
};

// UPDATE ROLE
export const useUpdateRole = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: UpdateRoleParams) => staffApi.updateRole(data),
		onError: (error) => console.error("[Updating User Role Error]", error),
		onSuccess: (_values) => {
			queryClient.invalidateQueries({ queryKey: ["getStaffsAndAdmins"] });
		},
	});
};
