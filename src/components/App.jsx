import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Workspace from "./list/Workspace";

export default function App() {
	const sampleTasks = ["Thing 1", "Thing 2", "Thing 3"];
	const [tasks, setTasks] = React.useState(sampleTasks);

	function setTask(idx, task) {
		if (idx == -1) {
			setTasks((prevTasks) => [...prevTasks, task]);
		} else {
			setTasks((prevTasks) => [
				...prevTasks.slice(0, idx),
				task,
				...prevTasks.slice(idx + 1),
			]);
		}
	}

	return (
		<div className="app">
			<Sidebar name="Dhvan" />
			<Workspace tasks={tasks} setTask={setTask} />
		</div>
	);
}
