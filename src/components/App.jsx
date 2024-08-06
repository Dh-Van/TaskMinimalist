import React from "react";
import Workspace from "./workspace/Workspace";
import Sidebar from "./sidebar/Sidebar";

export default function App() {
	const [workspace, setWorkspace] = React.useState(null);

	return (
		<div className="app">
			<Sidebar setWorkspace={setWorkspace} />
			<Workspace name={workspace} />
		</div>
	);
}
