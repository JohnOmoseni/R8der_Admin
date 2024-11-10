import AddStaffForm from "@/components/forms/AddStaffForm";
import { Close } from "@/constants/icons";

function AddStaff({ setOpenModal }: { setOpenModal: () => void }) {
	return (
		<>
			<div className="pb-3.5 sm:pb-4">
				<div className="badge" onClick={setOpenModal}>
					<Close className="icon size-4" />
					<p className="mt-[1px] text-sm font-medium capitalize transition">
						Close
					</p>
				</div>
			</div>

			<div className="flex-1 border-t border-border pt-4 sm:px-1.5 sm:pt-6">
				<h3 className="">Add staff</h3>
				<AddStaffForm />
			</div>
		</>
	);
}

export default AddStaff;
