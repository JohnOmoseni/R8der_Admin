type Props = {};

export function DashboardSkeletonLoader({}: Props) {
	return (
		<div className="flex-column gap-6">
			{Array.from({ length: 3 })?.map((_, index) => (
				<div key={index}>
					{/* Skeleton Loader for Trips Section */}
					<div className="row-flex-start gap-3">
						<div className="!w-[150px] skeleton"></div>

						{index === 0 && <div className="skeleton" />}
					</div>

					<div className="card card-inner">
						{Array.from({ length: 3 })?.map((_, idx) => (
							<div key={idx} className="flex-column gap-3.5">
								<div className="row-flex-btwn !items-start gap-4">
									<div className="flex-column gap-1.5">
										<span className="skeleton"></span>
										<p className="skeleton !h-2.5 !w-9" />
									</div>
									<div className="size-5 rounded-full bg-background-skeleton text-grey" />
								</div>

								{index === 0 && (
									<>
										<div className="">
											<p className="skeleton !w-[80px] !h-3"></p>
											<p className="skeleton mt-1 !h-2.5 !w-9" />
										</div>
										<div className="">
											<p className="skeleton !w-[80px] !h-3"></p>
											<p className="skeleton mt-1 !h-2.5 !w-9" />
										</div>
									</>
								)}
							</div>
						))}
					</div>
				</div>
			))}

			{/* Skeleton Loader for Performance Chart */}
			<div className="card h-[300px]">
				<div className="flex-column w-full gap-6 px-4 my-3.5">
					<div className="row-flex-start gap-3">
						<div className="!w-[150px] skeleton"></div>
						<div className="skeleton"></div>
					</div>
					<div className="!h-[220px] !w-full skeleton"></div>
				</div>
			</div>
		</div>
	);
}

export function SkeletonLoader({}: Props) {
	return (
		<div className="flex-column gap-6">
			{Array.from({ length: 1 })?.map((_, index) => (
				<div key={index}>
					{/* Skeleton Loader for customers tab */}

					<div className="card card-inner">
						{Array.from({ length: 3 })?.map((_, idx) => (
							<div key={idx} className="flex-column gap-3.5">
								<div className="row-flex-btwn !items-start gap-4">
									<div className="flex-column gap-1.5">
										<span className="skeleton"></span>
										<p className="skeleton !h-2.5 !w-9" />
									</div>
									<div className="size-5 rounded-full bg-background-skeleton text-grey" />
								</div>
							</div>
						))}
					</div>
				</div>
			))}

			<div className="skeleton !w-[150px] !h-5" />

			{/* Skeleton Loader for table */}
			<div className="card h-[300px]">
				<div className="flex-column w-full gap-6 px-4">
					<div className="row-flex-start gap-3">
						<div className="!w-[150px] skeleton"></div>
						<div className="skeleton"></div>
					</div>
					<div className="!h-[220px] !w-full skeleton"></div>
				</div>
			</div>
		</div>
	);
}

export function ProfileSkeletonLoader({}: Props) {
	return (
		<div className="flex-column gap-6">
			<div className="skeleton !w-[150px] !h-6" />

			{/* Skeleton Loader for table */}
			<div className="card h-[300px]">
				<div className="flex-column w-full gap-6 px-4 my-3.5">
					<div className="row-flex-start gap-3">
						<div className="!w-[150px] skeleton"></div>
						<div className="skeleton"></div>
					</div>
					<div className="!h-[220px] !w-full skeleton"></div>
				</div>
			</div>
		</div>
	);
}
