import React from "react";
import Sidebar from "./Sidebar";
import Workspace from "./Workspace";

export default function App() {
	const sampleData = ["test", "task 1", "task 2", "test 2"];
	const [tasks, setTasks] = React.useState(sampleData);
	const [clickedElement, setClickedElement] = React.useState(null);

	function handleSubmit(val) {
		setTasks((prevState) => [...prevState, val]);
	}

	function editTask(val, idx) {
		console.log(idx, tasks.length);
		if (idx >= tasks.length) {
			setTasks((prevState) => [...prevState, val]);
		}
		setTasks((prevState) => prevState.with(idx, val));
	}

	function addEmptyTask() {
		setTasks((prevState) => [...prevState, ""]);
	}

	// console.log(tasks);

	return (
		<div className="app" onClick={(e) => setClickedElement(e.target)}>
			<Sidebar />
			<Workspace
				tasks={tasks}
				enter={handleSubmit}
				editTask={editTask}
				addEmptyTask={addEmptyTask}
				clickedElement={clickedElement}
			/>
		</div>
	);
}
