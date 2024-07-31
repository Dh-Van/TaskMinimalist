import React from "react";
import TaskContainer from "./TaskContainer";

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

	React.useEffect(() => {
		// deleteAllTasks();
		setTasks(getTasks());
	}, [props.global.workspace]);

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

	function deleteAllTasks() {
		setTasks([]);
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

	function setClickedTask(task) {
		props.setClickedTask(task);
	}

	function getTasks() {
		let localTasks = [];
		let id = 0;
		let localTask = localStorage.getItem(`${props.global.workspace}-${id}`);
		while (localTask) {
			localTasks.push(JSON.parse(localTask));
			localTask = localStorage.getItem(
				`${props.global.workspace}-${++id}`
			);
		}
		return localTasks;
	}

	function storeTasks() {
		clearTasks();
		tasks.map((task) =>
			localStorage.setItem(
				`${props.global.workspace}-${task.id}`,
				JSON.stringify(task)
			)
		);
	}

	function clearTasks() {
		let id = 0;
		let localTask = localStorage.getItem(`${props.global.workspace}-${id}`);
		while (localTask) {
			localStorage.removeItem(`${props.global.workspace}-${id}`);
			localTask = localStorage.getItem(
				`${props.global.workspace}-${++id}`
			);
		}
	}

	console.log(localStorage);

	return (
		<div className={`${props.global.className}--list`}>
			<TaskContainer
				global={props.global}
				tasks={tasks}
				setTask={setTask}
				setAllTasks={(tasks) => {
					setTasks(tasks);
					resetID();
				}}
				setClickedTask={setClickedTask}
				insertTask={insertTask}
				deleteTask={deleteTask}
			/>
		</div>
	);
}
