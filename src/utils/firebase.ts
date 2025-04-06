import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "YOUR_API_KEY",
	authDomain: "YOUR_AUTH_DOMAIN",
	projectId: "YOUR_PROJECT_ID",
	storageBucket: "YOUR_STORAGE_BUCKET",
	messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
	appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const listenForNotifications = (callback: (data: any) => void) => {
	const notificationsRef = collection(db, "notifications");
	onSnapshot(notificationsRef, (snapshot) => {
		const notifications = snapshot.docs.map((doc) => doc.data());
		console.log("New notifications:", notifications);
		callback(notifications);
	});
};
