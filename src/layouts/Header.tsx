import { ReactNode, useCallback, useEffect, useState } from "react";
import { ArrowRight, Bell, Menu } from "@/constants/icons";
import { setOpenMenu } from "@/redux/features/appSlice";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";
import { PopoverWrapper } from "@/components/ui/components/PopoverWrapper";
import { SOCKET_URL } from "@/server/apiUrls";
import useWebSocket from "react-use-websocket";

type NotificationType = {
	message: string;
	read: boolean;
	timestamp: Date | string;
};

type Notifications = NotificationType[];

function Header({
	title,
	customContent,
}: {
	title?: string;
	customContent?: () => ReactNode;
}) {
	const dispatch = useDispatch();
	const [hasUnread, setHasUnread] = useState(false);
	const [notifications, setNotifications] = useState<Notifications>([]);
	const { lastJsonMessage } = useWebSocket(SOCKET_URL);

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		const simulatedNotification: NotificationType = {
	// 			message: "You have a new notification",
	// 			read: false,
	// 			timestamp: new Date().toISOString(),
	// 		};
	// 		setNotifications((prev) => [simulatedNotification, ...prev]);
	// 		setHasUnread(true);
	// 	}, 2000);

	// 	return () => clearInterval(interval);
	// }, [setHasUnread]);

	return (
		<div className="flex-column relative z-10 sm:min-h-[60px] w-full justify-center border-b border-border-100 px-3.5 sm:px-6 py-3">
			<div className="row-flex-btwn gap-6">
				<h2 className="capitalize">{title || "Overview"}</h2>

				<div className="row-flex gap-3">
					{customContent && customContent()}

					<div
						className={cn("place-items-center grid", customContent && "pl-2")}
					>
						<PopoverWrapper
							containerStyles="rounded-xl border-border-100 min-w-[320px] max-sm:mr-1 max-h-[540px] py-6 scrollbar-thin overflow-y-auto"
							trigger={
								<span
									className="icon-div !bg-background-100 relative"
									title="Notification"
								>
									<Bell className="size-4" />

									{hasUnread && (
										<span className="absolute size-1.5 bg-red-500 rounded-full right-[0.52rem] top-[0.35rem]"></span>
									)}
								</span>
							}
						>
							<Notification
								setHasUnread={setHasUnread}
								notifications={notifications}
								setNotifications={setNotifications}
								lastJsonMessage={lastJsonMessage}
							/>
						</PopoverWrapper>
					</div>

					<div
						className="row-flex group cursor-pointer md:hidden"
						onClick={() => dispatch(setOpenMenu(true))}
					>
						<Menu className="size-6 transition-all group-hover:scale-95" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;

const Notification = ({
	setHasUnread,
	notifications,
	setNotifications,
	lastJsonMessage,
}: {
	notifications: Notifications;
	lastJsonMessage: any;
	setHasUnread: React.Dispatch<React.SetStateAction<boolean>>;
	setNotifications: React.Dispatch<React.SetStateAction<Notifications>>;
}) => {
	const [expanded, setExpanded] = useState(false);

	useEffect(() => {
		if (lastJsonMessage) {
			const newNotification: NotificationType = {
				...lastJsonMessage,
				read: false,
				timestamp: new Date().toISOString(),
			};
			setNotifications((prev) => [newNotification, ...prev]);
			setHasUnread(true);
		}
	}, [lastJsonMessage, setHasUnread]);

	const handleMarkAllAsRead = useCallback(() => {
		setHasUnread(false);
		setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
	}, [setHasUnread]);

	const toggleViewAll = () => setExpanded((prev) => !prev);

	const renderNotificationItem = (
		notification: NotificationType,
		index: number
	) => (
		<li key={index} className="grid grid-cols-[max-content_1fr] gap-3 py-2">
			<span
				className={cn(
					"size-3 mt-1 rounded-full clip-circle",
					notification.read ? "bg-grey-200" : "bg-secondary"
				)}
			/>
			<div className="flex-column pr-1">
				<h4 className="font-semibold">
					{notification.message || "New Notification"}
				</h4>
				<p className="grey-text !font-light line-clamp-2 break-all">
					{notification.message}
				</p>
				<span className="text-[0.7rem] mt-1 text-grey-200 tracking-wide">
					{new Date(notification.timestamp).toLocaleString()}
				</span>
			</div>
		</li>
	);

	return (
		<div className="flex-column gap-3 px-1">
			<div className="row-flex-btwn gap-4">
				<h3 className="font-semibold text-[1.05rem]">Notifications</h3>
				<span
					onClick={handleMarkAllAsRead}
					className="text-sm text-secondary cursor-pointer font-semibold active:scale-95 transition"
				>
					Mark all as read
				</span>
			</div>

			<ul className="px-0.5 mt-4 not-first-of-type:border-t">
				{notifications.length > 0 ? (
					notifications
						.slice(0, expanded ? notifications.length : 5)
						.map(renderNotificationItem)
				) : (
					<li className="w-full text-center mb-4">No new notification</li>
				)}
			</ul>

			<div
				onClick={toggleViewAll}
				className="cursor-pointer transition active:scale-95 text-base row-flex px-4 mt-auto text-secondary font-semibold"
			>
				{expanded ? "View Less" : "View More"}
				<ArrowRight className="size-4 ml-1" />
			</div>
		</div>
	);
};
