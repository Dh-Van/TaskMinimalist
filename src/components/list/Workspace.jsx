import React from "react";
import Task from "./Task";
import InsertButton from "./InsertButton";

export default function Workspace(props) {
	const [addingTask, setAddingTask] = React.useState(false);
	const [focus, setFocus] = React.useState(props.tasks.length - 1);
	const taskRefs = React.useRef([]);
	const [taskElements, setTaskElements] = React.useState([]);

	React.useEffect(() => {
		setTaskElements(getTaskElements());

		if (taskRefs.current[focus]) {
			taskRefs.current[focus].focus();
		}
	}, [0]);

	React.useEffect(() => {
		const tE = getTaskElements();
		// console.log(tE);
		setTaskElements(tE);

		console.log(taskRefs.current);

		if (taskRefs.current[focus]) {
			taskRefs.current[focus].focus();
		}
	}, [focus, props.tasks]);

	function getTaskElements() {
		return props.tasks.map((task, idx) => (
			<Task
				key={idx}
				id={idx}
				addRef={addInputRef}
				text={task}
				handleChange={textInput}
				handleKey={taskKey}
				handleClick={taskClick}
				deleteTask={() => deleteTask(idx)}
			/>
		));
	}

	function taskClick(event) {
		setAddingTask(true);
		const idStr = event.target.id;
		if (idStr) {
			setFocus(Number(idStr.substring(idStr.lastIndexOf("-") + 1)));
		}
	}

	function insertTask() {
		setAddingTask(true);
		props.setTask(-1, "");
		setFocus(props.tasks.length);
	}

	function deleteTask(idx) {
		props.deleteTask(idx, idx);
	}

	function addInputRef(element) {
		if (element && !taskRefs.current.includes(element)) {
			taskRefs.current.push(element);
		}
	}

	function textInput(id, event) {
		props.setTask(id, event.target.value);
	}

	function taskKey(event) {
		switch (event.key) {
			case "Enter":
				insertTask();
				break;
			case "ArrowUp":
				setFocus((prevFocus) => prevFocus - 1);
				break;
			case "ArrowDown":
				setFocus((prevFocus) => prevFocus + 1);
				break;
		}
	}

	function idle() {
		setAddingTask(false);
	}

	return (
		<div className="workspace" onClick={idle}>
			<h1 className="workspace--title">Inbox</h1>
			{taskElements}
			<InsertButton show={!addingTask} handleClick={insertTask} />
		</div>
	);
}
