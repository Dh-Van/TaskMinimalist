import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Workspace from "./workspace/Workspace";

export default function App() {
	return (
		<div className="app">
			{/* <Sidebar name="Dhvan" /> */}
			<Sidebar title="Dhvan" className="sidebar" />
			<Workspace title="Inbox" className="workspace" />
		</div>
	);
}
