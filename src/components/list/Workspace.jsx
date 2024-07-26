import React from "react";
import Task from "./Task";

export default function Workspace(props) {
	const [taskElements, setTaskElements] = React.useState([]);
	const taskRefs = React.useRef([]);
	const [focus, setFocus] = React.useState(props.tasks.length - 1);

	React.useEffect(() => {
		setTaskElements(getTaskElements());
	}, [props.tasks, focus]);

	React.useEffect(() => {
		taskRefs.current[focus] && taskRefs.current[focus].focus();
	}, [taskElements, focus]);

	function getTaskElements() {
		taskRefs.current = [];
		return props.tasks.map((task, idx) => (
			<Task
				key={idx}
				id={idx}
				addRef={addTaskRef}
				text={task}
				handleChange={(event) => taskInput(idx, event)}
				handleKey={taskKey}
				handleClick={(event) => taskClick(idx, event)}
				deleteTask={() => deleteTask(idx)}
			/>
		));
	}

	function addTaskRef(element) {
		if (element && !taskRefs.current.includes(element)) {
			taskRefs.current.push(element);
		}
	}

	function taskInput(idx, event) {
		props.setTask(idx, event.target.value);
	}

	function taskClick(idx, event) {
		event.target.id.includes("task") && setFocus(idx);
	}

	function taskKey(event) {
		switch (event.key) {
			case "Enter":
				insertTask();
				break;
			case "ArrowUp":
				setFocus((prevFocus) =>
					prevFocus > 0 ? prevFocus - 1 : prevFocus
				);
				break;
			case "ArrowDown":
				setFocus((prevFocus) =>
					prevFocus < props.tasks.length - 1
						? prevFocus + 1
						: prevFocus
				);
				break;
		}
	}

	function insertTask() {
		props.setTask(-1, "");
		setFocus(props.tasks.length);
	}

	function deleteTask(idx) {
		props.deleteTask(idx);
		setFocus((prevFocus) => {
			if (prevFocus >= props.tasks.length - 1) {
				return props.tasks.length - 2; // Move focus to the last task if the last one was deleted
			} else {
				return prevFocus;
			}
		});
		taskRefs.current.splice(idx, 1); // Remove the ref for the deleted task
	}

	return (
		<div className="workspace">
			<h1 className="workspace--title">Inbox</h1>
			{taskElements}
		</div>
	);
}
