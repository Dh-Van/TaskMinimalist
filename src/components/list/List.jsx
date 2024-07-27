import React from "react";
import Workspace from "./Workspace";

export default function List(props) {
	const sampleTasks = [
		{ id: 0, text: "Thing 1", priority: 0, checked: false },
		{ id: 1, text: "Thing 2", priority: 0, checked: false },
		{ id: 2, text: "Thing 3", priority: 0, checked: false },
		{ id: 3, text: "Thing 4", priority: 0, checked: false },
	];

	const [tasks, setTasks] = React.useState(getTasks());

	React.useEffect(() => {
		storeTasks();
	}, [tasks]);

	function setTask(idx, task) {
		setTasks((prevTasks) => [
			...prevTasks.slice(0, idx),
			task,
			...prevTasks.slice(idx + 1),
		]);
		resetID();
	}

	function deleteTask(idx) {
		setTasks((prevTasks) => [
			...prevTasks.slice(0, idx),
			...prevTasks.slice(idx + 1),
		]);
		resetID();
	}

	function insertTask(idx) {
		setTasks((prevTasks) => [
			...prevTasks.slice(0, idx + 1),
			{ id: idx, text: "", priority: 0, checked: false },
			...prevTasks.slice(idx + 1),
		]);
		resetID();
	}

	function resetID() {
		setTasks((prevTasks) =>
			prevTasks.map((task, idx) => ({ ...task, id: idx }))
		);
	}

	function getTasks() {
		let localTasks = [];
		let id = 0;
		let localTask = localStorage.getItem(id);
		while (localTask) {
			localTasks.push(JSON.parse(localTask));
			localTask = localStorage.getItem(++id);
		}
		return localTasks;
	}

	function storeTasks() {
		localStorage.clear();
		tasks.map((task) =>
			localStorage.setItem(task.id, JSON.stringify(task))
		);
	}

	return (
		<div className="list">
			<Workspace
				tasks={tasks}
				setTask={setTask}
				setAllTasks={(tasks) => {
					setTasks(tasks);
					resetID();
				}}
				insertTask={insertTask}
				deleteTask={deleteTask}
			/>
		</div>
	);
}
