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
		<>
			<Header
				title={headerTitle}
				customContent={() => customHeaderContent && customHeaderContent}
			/>

			<main
				className={cn(
					"min-h-[80vh] w-full overflow-y-auto py-3 pb-4",
					mainContainerStyles,
					!mainContainerStyles && "px-6 max-[430px]:px-3"
				)}
			>
				{children}
			</main>
		</>
	);
};

export default SectionWrapper;
