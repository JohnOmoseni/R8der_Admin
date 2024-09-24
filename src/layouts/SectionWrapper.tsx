import Header from "./Header";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
	children: ReactNode;
	headerTitle: string;
	mainContainerStyles?: string;
	customHeaderContent?: ReactNode;
};

const SectionWrapper = ({
	children,
	headerTitle,
	customHeaderContent,
	mainContainerStyles,
}: Props) => {
	return (
		<div className={cn("")}>
			<Header
				title={headerTitle}
				customContent={() => customHeaderContent && customHeaderContent}
			/>

			<main
				className={cn(
					"h-full w-full overflow-y-auto py-3",
					mainContainerStyles,
					!mainContainerStyles && "px-6 max-[430px]:px-3"
				)}
			>
				{children}
			</main>
		</div>
	);
};

export default SectionWrapper;
