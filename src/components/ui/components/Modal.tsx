import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ModalProps = {
	title?: string;
	description?: string;
	children?: ReactNode;
	openModal: boolean;
	modalStyles?: string;

	setOpenModal: () => void;
};

export function Modal({
	title,
	description,
	children,
	openModal,
	modalStyles,
	setOpenModal,
}: ModalProps) {
	return (
		<AlertDialog open={openModal} onOpenChange={setOpenModal}>
			{/* we will trigger the opening of the dialog somewhere else */}

			<AlertDialogContent
				className={cn(
					"shad-alert-dialog scrollbar-thin mx-auto grid max-h-[580px] min-h-[300px] max-w-lg items-center !overflow-y-auto rounded-xl pt-2 pb-1 px-0 shadow-lg max-sm:w-[85%] sm:min-w-[300px]",
					modalStyles
				)}
			>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-xl capitalize sm:text-2xl">
						{title}
					</AlertDialogTitle>

					<AlertDialogDescription className="text-center">
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>

				{children}
			</AlertDialogContent>
		</AlertDialog>
	);
}
