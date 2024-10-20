import { Button } from "@/components/ui/button";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
	trigger?: ReactNode;
	header?: ReactNode;
	content: ReactNode;
};

export function SheetMenu({ trigger, header, content }: Props) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				{trigger ? trigger : <Button variant="outline">Open</Button>}
			</SheetTrigger>
			<SheetContent aria-describedby={undefined}>
				<SheetHeader>
					<>
						<VisuallyHidden.Root>
							<SheetTitle className={cn("hidden", header && "block")}>
								Menu
							</SheetTitle>
						</VisuallyHidden.Root>
						<VisuallyHidden.Root>
							<SheetDescription className="hidden"></SheetDescription>
						</VisuallyHidden.Root>
					</>
				</SheetHeader>
				{content}
			</SheetContent>
		</Sheet>
	);
}
