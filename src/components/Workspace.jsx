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
			edit={props.taskEdit}
			focus={currentFocus - 1 === idx}
			submit={handleSubmit}
			move={move}
			handleClick={taskClick}
			unfocus={unfocus}
		/>
	));

	function handleSubmit() {
		if (currentFocus !== props.tasks.length) {
			return;
		}
		props.add();
		setCurrentFocus((prevState) => prevState + 1);
		setShowAdd(false);
	}

	function taskClick(event, id) {
		setCurrentFocus(id + 1);
	}

	function handleClick() {
		setShowAdd(false);
		props.add();
		setCurrentFocus((prevState) => prevState - 1);
	}

	function move(direction) {
		setCurrentFocus((prevState) =>
			prevState + direction > 0 &&
			prevState + direction <= props.tasks.length
				? prevState + direction
				: prevState
		);
	}

	function unfocus() {
		setShowAdd(true);
		setCurrentFocus((prevState) => prevState + 1);
	}

	return (
		<div className="workspace">
			<h1 className="workspace--inbox">Inbox</h1>
			{taskElements}
			{showAdd && (
				<button className="workspace--add-button" onClick={handleClick}>
					+ Add Task
				</button>
			)}
			<div className="workspace--blank" onClick={unfocus}></div>
		</div>
	);
}
