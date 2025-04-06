"use client";

import CustomButton from "@/components/reuseables/CustomButton";
import SectionWrapper from "@/layouts/SectionWrapper";
import { useEffect } from "react";
import { fetchToken, onMessageListener } from "../../../firebase";
import useFcmToken from "@/hooks/useFcmToken";

export default function Notifications() {
	const { token, notificationPermissionStatus } = useFcmToken();

	const requestNotificationPermission = async () => {
		const permission = await Notification.requestPermission();
		if (permission === "granted") {
			const token = await fetchToken();
			console.log("FCM Token:", token);
			return "granted";
		} else {
			console.log("Notification permission denied");
			return false;
		}
	};

	useEffect(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker
				.register("/firebase-messaging-sw.js")
				.then((registration) => {
					console.log("Service Worker registered:", registration);
				})
				.catch((error) => {
					console.error("Service Worker registration failed:", error);
				});
		}
	}, []);

	const handleNotification = async () => {
		const permission = await requestNotificationPermission();
		if (permission === "granted") {
			const token = await fetchToken();
			if (token) {
				new Notification("Location Update", {
					body: "A new location has been added!",
					icon: "/images/bundo-logo.png",
				});
			} else {
				console.log("No FCM token available");
				new Notification("Location Update", {
					body: "A new location has been added!",
					icon: "/images/bundo-logo.png",
				});
			}
		} else {
			console.log("Notification permission denied");
		}
	};

	const handleTestNotification = async () => {
		const response = await fetch("/send-notification", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: token,
				title: "Test Notification",
				message: "This is a test notification",
				link: "/contact",
			}),
		});

		const data = await response.json();
		console.log(data);
	};

	useEffect(() => {
		// requestNotificationPermission();

		onMessageListener().then((payload) => {
			console.log("Foreground Notification:", payload);
		});
	}, []);

	return (
		<SectionWrapper>
			<div className="flex-column gap-6">
				<h3>Notifications</h3>

				<div className="grid place-items-center">
					<CustomButton
						title="	Send Notification"
						onClick={handleNotification}
						className="bg-secondary-200 min-w-[160px]"
					/>
				</div>
			</div>
		</SectionWrapper>
	);
}
