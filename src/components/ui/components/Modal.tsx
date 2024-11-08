import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Close } from "@/constants/icons";

type ModalProps = {
	title?: string;
	description?: string;
	children?: ReactNode;
	openModal: boolean;
	modalStyles?: string;
	setOpenModal: () => void;
	hideClose?: boolean;
};

export function Modal({
	title,
	description,
	children,
	openModal,
	modalStyles,
	setOpenModal,
	hideClose,
}: ModalProps) {
	return (
		<AlertDialog open={openModal} onOpenChange={setOpenModal}>
			{/* we will trigger the opening of the dialog somewhere else */}

			<AlertDialogContent
				className={cn(
					"shad-alert-dialog block scrollbar-thin mx-auto max-h-[600px] min-h-[200px] max-w-lg overflow-y-auto rounded-2xl p-4 shadow-lg max-sm:w-[90%] sm:min-w-[400px] sm:p-6 sm:px-5",
					modalStyles
				)}
			>
				{!hideClose && (
					<span
						className="icon-div !size-7 !bg-background-100 group absolute right-4 top-3 active:scale-95"
						onClick={setOpenModal}
						title="close"
					>
						<Close
							size="18"
							className="z-[1000] text-grey transition-colors group-hover:text-foreground"
						/>
					</span>
				)}

				<AlertDialogHeader>
					<AlertDialogTitle className="text-xl font-bold capitalize">
						{title}
					</AlertDialogTitle>

					<AlertDialogDescription className="text-foreground-100 leading-4 mt-1">
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>

				{children}
			</AlertDialogContent>
		</AlertDialog>
	);
}
