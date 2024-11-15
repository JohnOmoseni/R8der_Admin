import { ReactNode, useCallback, useEffect, useState } from "react";
import { ArrowRight, Bell, Menu } from "@/constants/icons";
import { setOpenMenu } from "@/redux/features/appSlice";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";
import { PopoverWrapper } from "@/components/ui/components/PopoverWrapper";
import { SOCKET_URL } from "@/server/apiUrls";
import { io, Socket } from "socket.io-client";

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

	useEffect(() => {
		const socket: Socket = io(SOCKET_URL, {
			transports: ["websocket"], // Required for v2 compatibility
			upgrade: false, // Ensures connection only uses WebSocket
		});

		// Listen for events from the server
		socket.on("connect", () => {
			console.log("[Connected to socket]");
		});

		socket.on("AdminNotification", (message: any) => {
			console.log("[New Notification:]", message);

			const newNotification: NotificationType = {
				message: message,
				read: false,
				timestamp: new Date().toISOString(),
			};
			setNotifications((prev) => [newNotification, ...prev]);
			setHasUnread(true);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

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
							containerStyles="max-w-sm rounded-xl border-border-100 min-w-[320px] mr-1 max-h-[540px] py-6 scrollbar-thin overflow-y-auto"
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
}: {
	notifications: Notifications;
	setHasUnread: React.Dispatch<React.SetStateAction<boolean>>;
	setNotifications: React.Dispatch<React.SetStateAction<Notifications>>;
}) => {
	const [expanded, setExpanded] = useState(false);

	const handleMarkAllAsRead = useCallback(() => {
		setHasUnread(false);
		setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
	}, [setHasUnread]);

	const toggleViewAll = () => setExpanded((prev) => !prev);

	const renderNotificationItem = (
		notification: NotificationType,
		index: number
	) => (
		<li key={index} className="grid grid-cols-[max-content_1fr] gap-2.5 py-2">
			<span
				className={cn(
					"size-2.5 mt-[5px] rounded-full clip-circle",
					notification.read ? "bg-grey-200" : "bg-secondary"
				)}
			/>
			<div className="flex-column pr-1">
				{!notification.read ? (
					<>
						<h4 className="font-semibold">New Notification</h4>
						<p
							title={notification.message || ""}
							className="text-sm my-0.5 text-foreground-100 max-w-[50ch] line-clamp-4"
						>
							{notification.message || <span className="">No message</span>}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel amet
							exercitationem alias pariatur atque perferendis necessitatibus?
							Eius aperiam recusandae voluptates rem quibusdam, eos debitis,
							vero aliquid temporibus aliquam autem assumenda.
						</p>
					</>
				) : (
					<p
						title={notification.message || ""}
						className="text-sm text-foreground-100 max-w-[50ch] line-clamp-4"
					>
						{notification.message || <span className="">No message</span>}
					</p>
				)}

				<span className="text-[0.7rem] mt-0.5 text-grey-200 font-medium tracking-wide">
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
