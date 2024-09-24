import AuthProvider from "./context/AuthContext";
import Provider from "./providers/Provider";
import AppRouter from "./AppRouter";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

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
		<Router>
			<AppWrapper />
		</Router>
	);
}

export default App;