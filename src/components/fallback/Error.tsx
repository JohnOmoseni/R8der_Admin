import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/CustomButton";
import { Logo } from "@/constants/icons";

export default function ErrorBoundary({ error }: { error: any }) {
	const navigate = useNavigate();

	return (
		<div className="fixed left-0 top-0 z-[9999] grid min-h-screen w-full place-items-center bg-background">
			<div className="group absolute left-3 top-3 transition hover:scale-95 sm:left-5 sm:top-5">
				<Link to="/" className="row-flex">
					<Logo className="h-fit w-36 object-contain max-md:mx-auto" />
				</Link>
			</div>

			<div className="flex-column !items-center gap-10 px-3">
				<h3 className="line-clamp-5 max-w-[45ch] text-center text-2xl font-medium sm:text-3xl">
					Error | {error?.message ?? "Something went wrong"}.
				</h3>

				<Button
					title="Try again"
					onClick={() => {
						// reset();
						navigate("/"); // Navigate back to homepage or any other path
					}}
					className="max-w-max !px-14 !py-8 !text-lg"
				/>
			</div>
		</div>
	);
}
