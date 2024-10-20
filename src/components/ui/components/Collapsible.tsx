import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../accordion";

type AccordionProps = {
	trigger: ReactNode;
	triggerStyles?: string;
	content: () => ReactNode;
};

const Collapsible = ({ trigger, triggerStyles, content }: AccordionProps) => {
	return (
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem value={`item-1`} className="">
				<AccordionTrigger className={cn("", triggerStyles)}>
					{trigger}
				</AccordionTrigger>
				<AccordionContent className="">{content()}</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default Collapsible;
