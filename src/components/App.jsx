import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Workspace from "./list/Workspace";

export default function App() {
	const sampleTasks = ["Thing 1", "Thing 2", "Thing 3"];
	const [tasks, setTasks] = React.useState(sampleTasks);

	function setTask(idx, task) {
		if (idx == -1) {
			console.log("in edge case");
			setTasks((prevTasks) => [...prevTasks, task]);
			return;
		}

		setTasks((prevTasks) => [
			...prevTasks.slice(0, idx),
			task,
			...prevTasks.slice(idx + 1),
		]);
	}

	function addTask() {
		setTasks((prevTasks) => [...prevTasks, ""]);
	}

	return (
		<div className="app">
			<Sidebar name="Dhvan" />
			<Workspace tasks={tasks} setTask={setTask} />
		</div>
	);
}
