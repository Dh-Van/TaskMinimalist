import React from "react";
import Task from "./Task";

export default function Workspace(props) {
	const [showAdd, setShowAdd] = React.useState(true);
	const [currentFocus, setCurrentFocus] = React.useState(props.tasks.length);

	const taskElements = props.tasks.map((e, idx) => (
		<Task
			key={idx}
			id={idx}
			text={e}
			editTask={props.editTask}
			focus={currentFocus - 1 === idx}
			submit={handleSubmit}
			stepFocus={stepFocus}
			handleClick={taskClick}
		/>
	));

	function handleSubmit() {
		if (currentFocus !== props.tasks.length) {
			return;
		}
		props.addEmptyTask();
		setCurrentFocus((prevState) => prevState + 1);
		setShowAdd(false);
	}

	function taskClick(event, id) {
		setCurrentFocus(id + 1);
	}

	function handleClick() {
		setShowAdd(false);
		props.addEmptyTask();
		setCurrentFocus(props.tasks.length + 1);
	}

	function stepFocus(step) {
		setCurrentFocus((prevState) =>
			prevState + step > 0 && prevState + step <= props.tasks.length
				? prevState + step
				: prevState
		);
	}

	if (
		currentFocus <= props.tasks.length &&
		props.clickedElement &&
		!props.clickedElement.attributes.shouldfocus
	) {
		setShowAdd(true);
		setCurrentFocus((prevState) => prevState + 1);
	}

	return (
		<div className="workspace">
			<h1 className="workspace--inbox">Inbox</h1>
			{taskElements}
			{showAdd && (
				<button
					className="workspace--add-button"
					onClick={handleClick}
					id={1}
					shouldfocus=""
				>
					+ Add Task
				</button>
			)}
		</div>
	);
}
