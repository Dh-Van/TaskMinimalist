import React from "react";
import Sidebar from "./sidebar/Sidebar";
import List from "./list/List";

export default function App() {
	return (
		<div className="app">
			<Sidebar name="Dhvan" />
			<List />
		</div>
	);
}
