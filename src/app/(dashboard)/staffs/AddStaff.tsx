import AddStaffForm from "@/components/forms/AddStaffForm";
import { Close } from "@/constants/icons";

function AddStaff({ setOpenModal }: { setOpenModal: () => void }) {
	return (
		<div className="">
			<div className=" px-4 pb-4">
				<div className="badge" onClick={setOpenModal}>
					<Close className="icon size-4" />
					<p className="mt-[1px] text-sm font-medium capitalize transition">
						Close
					</p>
				</div>
			</div>

			<div className="flex-1 border-t border-border px-6 pb-6 pt-8">
				<h3 className="">Add staff</h3>
				<AddStaffForm />
			</div>
		</div>
	);
}

export default AddStaff;
