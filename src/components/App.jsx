import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Workspace from "./list/Workspace";

export default function App() {
	const sampleTasks = [
		{ text: "Thing 1", priority: 0 },
		{ text: "Thing 2", priority: 0 },
		{ text: "Thing 3", priority: 0 },
		{ text: "Thing 4", priority: 0 },
	];

	const [tasks, setTasks] = React.useState(sampleTasks);

	function setTask(idx, task) {
		setTasks((prevTasks) => [
			...prevTasks.slice(0, idx),
			task,
			...prevTasks.slice(idx + 1),
		]);
	}

	function deleteTask(idx) {
		setTasks((prevTasks) => [
			...prevTasks.slice(0, idx),
			...prevTasks.slice(idx + 1),
		]);
	}

	function insertTask(idx) {
		setTasks((prevTasks) => [
			...prevTasks.slice(0, idx + 1),
			{ text: "", priority: 0 },
			...prevTasks.slice(idx + 1),
		]);
	}

	return (
		<div className="app">
			<Sidebar name="Dhvan" />
			<Workspace
				tasks={tasks}
				setTask={setTask}
				insertTask={insertTask}
				deleteTask={deleteTask}
			/>
		</div>
	);
}
