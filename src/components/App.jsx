import React from "react";
import Sidebar from "./Sidebar";
import Workspace from "./Workspace";

export default function App() {
	const sampleData = ["test", "task 1", "task 2", "test 2"];
	const [tasks, setTasks] = React.useState(sampleData);

	function enter(val) {
		setTasks((prevState) => [...prevState, val]);
	}

	function taskEdit(val, idx) {
		console.log(idx, tasks.length);
		if (idx >= tasks.length) {
			setTasks((prevState) => [...prevState, val]);
		}
		setTasks((prevState) => prevState.with(idx, val));
	}

	function add() {
		setTasks((prevState) => [...prevState, ""]);
	}

	console.log(tasks);

	return (
		<div className="app">
			<Sidebar />
			<Workspace
				tasks={tasks}
				enter={enter}
				taskEdit={taskEdit}
				add={add}
			/>
		</div>
	);
}
