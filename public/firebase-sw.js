importScripts(
	"https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js"
);
importScripts(
	"https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
	apiKey: "YOUR_API_KEY",
	authDomain: "YOUR_AUTH_DOMAIN",
	projectId: "YOUR_PROJECT_ID",
	storageBucket: "YOUR_STORAGE_BUCKET",
	messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
	appId: "YOUR_APP_ID",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log("Received background message", payload);
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: "/firebase-logo.png", // Change to your app logo
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
