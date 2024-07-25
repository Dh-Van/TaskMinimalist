import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Workspace from "./list/Workspace";

export default function App() {
	return (
		<div className="app">
			<Sidebar />
			<Workspace />
		</div>
	);
}
