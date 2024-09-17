import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ThreeDots } from "@/constants/icons";
import { ReactNode } from "react";

type Props = {
  isPending?: boolean;
  trigger: ReactNode;
  onDeleteClick: () => void;
};

const ConfirmDelete = ({ onDeleteClick, isPending, trigger }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {trigger ? (
          trigger
        ) : (
          <span className="icon">
            <ThreeDots size={20} />
          </span>
        )}
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-background">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription className="">
            This action is irreversible
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => null}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white"
            onClick={onDeleteClick}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDelete;
