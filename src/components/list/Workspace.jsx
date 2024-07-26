import React from "react";
import Task from "./Task";
import InsertButton from "./InsertButton";
import {
	getKeyBindingsConfig,
	generateKeyCombo,
} from "../../assets/keyBindings";

export default function Workspace(props) {
	const [taskElements, setTaskElements] = React.useState([]);
	const taskRefs = React.useRef([]);
	const [focus, setFocus] = React.useState(props.tasks.length - 1);
	const keyBindings = getKeyBindingsConfig();

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
				handleKey={() => taskKey(event, idx)}
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

	function taskKey(event, idx) {
		switch (event.key) {
			case "Enter":
				insertTask();
				break;
			case "ArrowUp":
				setFocus((prevFocus) => Math.max(prevFocus - 1, 0));
				break;
			case "ArrowDown":
				setFocus((prevFocus) =>
					Math.min(prevFocus + 1, props.tasks.length - 1)
				);
				break;
		}

		handleCustomKeys(event, idx);
	}

	function insertTask() {
		props.setTask(-1, "");
		setFocus(props.tasks.length);
	}

	function deleteTask(idx) {
		props.deleteTask(idx);
		const size = props.tasks.length - 1;

		setFocus((prevFocus) => {
			return prevFocus >= size ? size - 1 : prevFocus;
		});
	}

	function handleCustomKeys(event, idx) {
		const {
			key,
			metaKey: META,
			shiftKey: SHIFT,
			altKey: ALT,
			ctrlKey: CTRL,
		} = event;

		const keyCombo = generateKeyCombo({ Key: key, META, SHIFT, ALT, CTRL });

		console.log(keyCombo, keyBindings);

		const binding = keyBindings[keyCombo];

		if (binding) {
			event.preventDefault();
			eval(`${binding.Action}(${idx})`);
		}
	}

	return (
		<div className="workspace">
			<h1 className="workspace--title">Inbox</h1>
			{taskElements}
			{taskElements.length == 0 && (
				<InsertButton handleClick={insertTask} />
			)}
		</div>
	);
}
