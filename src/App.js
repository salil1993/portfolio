import { useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";
import Homepage from "./pages/homepage";
import { TRACKING_ID } from "./data/tracking";
import "./App.css";

function App() {
	useEffect(() => {
		if (TRACKING_ID !== "") {
			ReactGA.initialize(TRACKING_ID);
		}
	}, []);

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/about" element={<Navigate to="/#about" replace />} />
				<Route path="/projects" element={<Navigate to="/#projects" replace />} />
				<Route path="/contact" element={<Navigate to="/#contact" replace />} />
				<Route path="/articles" element={<Navigate to="/" replace />} />
				<Route path="/article/:slug" element={<Navigate to="/" replace />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</div>
	);
}

export default App;
