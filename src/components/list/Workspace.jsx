import React from "react";
import Task from "./Task";
import InsertButton from "./InsertButton";

export default function Workspace(props) {
	const [addingTask, setAddingTask] = React.useState(false);

	const taskElements = props.tasks.map((task, idx) => (
		<Task key={idx} id={idx} text={task} handleChange={textInput} />
	));

	function insertTask() {
		// setAddingTask(true);
		props.setTask(-1, "");
	}

	function textInput(id, event) {
		props.setTask(id, event.target.value);
	}

	return (
		<div className="workspace">
			<h1 className="workspace--title">Inbox</h1>
			{taskElements}
			<InsertButton show={!addingTask} handleClick={insertTask} />
		</div>
	);
}
