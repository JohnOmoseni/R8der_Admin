import AuthProvider from "./context/AuthContext";
import Provider from "./providers/Provider";
import AppRouter from "./AppRouter";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import "@/styles/globals.css";
import "@/styles/index.css";
import "@/styles/utils.css";

const AppWrapper = () => {
	const navigate = useNavigate();

	return (
		<AuthProvider navigate={navigate}>
			<Provider>
				<AppRouter />
			</Provider>
		</AuthProvider>
	);
};

function App() {
	return (
		<ErrorBoundary
			fallback={
				<div className="relative h-svh grid place-items-center">
					<p className="text-center">
						Something went wrong. Please refresh the page.
					</p>
				</div>
			}
		>
			<Router>
				<AppWrapper />
			</Router>
		</ErrorBoundary>
	);
}

export default App;
