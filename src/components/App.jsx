import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Workspace from "./workspace/Workspace";

export default function App() {
	const [currentWorkspace, setCurrentWorkspace] = React.useState("Inbox");

	function setWorkspace(workspace) {
		setCurrentWorkspace(workspace);
	}

	return (
		<div className="app">
			{/* <Sidebar name="Dhvan" /> */}
			<Sidebar
				title="Dhvan"
				className="sidebar"
				workspace={currentWorkspace}
				setWorkspace={setWorkspace}
			/>
			<Workspace
				title="Inbox"
				className="workspace"
				workspace={currentWorkspace}
			/>
		</div>
	);
}
