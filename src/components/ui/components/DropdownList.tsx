import { User } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThreeDots } from "@/constants/icons";
import { ReactNode } from "react";

type Props = {
	trigger?: ReactNode;
	list?: { label: string; value: string }[];
};

export function DropdownList({ trigger, list }: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				{trigger ? (
					trigger
				) : (
					<div className="icon-div">
						<ThreeDots size={20} className="" />
					</div>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="right-0 w-44">
				{list?.map((item, idx) => (
					<DropdownMenuItem key={idx}>
						<User className="mr-2 h-4 w-4" />
						<span>{item.label}</span>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
