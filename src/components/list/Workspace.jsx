import React from "react";
import Task from "./Task";
import InsertButton from "./InsertButton";

export default function Workspace(props) {
	const [addingTask, setAddingTask] = React.useState(false);
	const [focus, setFocus] = React.useState(props.tasks.length - 1);
	const taskRefs = React.useRef([]);

	React.useEffect(() => {
		if (taskRefs.current[focus]) {
			taskRefs.current[focus].focus();
		}
	}, [focus, props.tasks]);

	function taskClick(event) {
		setAddingTask(true);
		const idStr = event.target.id;
		if (idStr) {
			setFocus(Number(idStr.substring(idStr.lastIndexOf("-") + 1)));
		}
	}

	function stepFocus(step) {
		setFocus((prevFocus) => prevFocus + step);
	}

	function insertTask() {
		setAddingTask(true);
		props.setTask(-1, "");
		setFocus(props.tasks.length);
	}

	function addInputRef(element) {
		if (element && !taskRefs.current.includes(element)) {
			taskRefs.current.push(element);
		}
	}

	const taskElements = props.tasks.map((task, idx) => (
		<Task
			key={idx}
			id={idx}
			addRef={addInputRef}
			text={task}
			handleChange={textInput}
			handleKey={taskKey}
			handleClick={taskClick}
		/>
	));

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

	return (
		<div className="workspace" onClick={() => setAddingTask(false)}>
			<h1 className="workspace--title">Inbox</h1>
			{taskElements}
			<InsertButton show={!addingTask} handleClick={insertTask} />
		</div>
	);
}
