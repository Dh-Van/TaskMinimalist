import React from "react";
import Task from "./Task";
import InsertButton from "./InsertButton";
import { getKeyBindingsConfig, generateKeyCombo } from "../../assets/utils";
import config from "../../assets/config.json";

export default function TaskContainer(props) {
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
				className={props.className}
				key={idx}
				id={idx}
				addRef={addTaskRef}
				text={task.text}
				priority={task.priority}
				checked={task.checked}
				handleChange={(event) => taskInput(idx, event)}
				handleKey={(event) => taskKey(event, idx)}
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
		setTask(idx, { ...props.tasks[idx], text: event.target.value });
	}

	function setTask(idx, task) {
		props.setTask(idx, {
			id: idx,
			text: task.text,
			priority: task.priority,
			checked: task.checked,
		});
	}

	function taskClick(idx, event) {
		event.target.id.includes("task") && setFocus(idx);
	}

	function taskKey(event, idx) {
		const {
			key,
			metaKey: META,
			shiftKey: SHIFT,
			altKey: ALT,
			ctrlKey: CTRL,
		} = event;

		const binding =
			keyBindings[generateKeyCombo({ Key: key, META, SHIFT, ALT, CTRL })];

		if (binding) {
			event.preventDefault();
			if (binding.Action.includes("(")) {
				const paramOpenIndex = binding.Action.indexOf("(") + 1;
				const functionString =
					binding.Action.slice(0, paramOpenIndex) +
					`${idx}, ` +
					binding.Action.slice(paramOpenIndex);
				eval(functionString);
			} else {
				eval(`${binding.Action}(${idx})`);
			}
		}
	}

	function addTask(idx) {
		props.insertTask(idx);
		setFocus(idx + 1);
	}

	function deleteTask(idx) {
		props.deleteTask(idx);
		const size = props.tasks.length - 1;

		setFocus((prevFocus) => {
			return prevFocus >= size ? size - 1 : prevFocus;
		});
	}

	function focusTask(idx, direction) {
		if (direction == -1) {
			direction = props.tasks.length - 1;
		}

		setFocus(direction);
	}

	function check(idx) {
		setTask(idx, { ...props.tasks[idx], checked: true });
	}

	function stepFocus(idx, step) {
		setFocus((prevFocus) => {
			const newFocus = prevFocus + step;
			return Math.max(0, Math.min(newFocus, props.tasks.length - 1));
		});
	}

	function setPriority(idx, priority) {
		setTask(idx, { ...props.tasks[idx], priority: priority });
	}

	function sortTasks() {
		props.setAllTasks(
			[...props.tasks].sort(
				(a, b) => !a.priority - !b.priority || a.priority - b.priority
			)
		);
	}

	console.log(props);

	return (
		<div className={`${props.className}--task-container`}>
			<h1 className={`${props.className}--title`}>{props.title}</h1>
			{(config.alwaysShowAdd || props.tasks.length === 0) && (
				<InsertButton
					className={props.className}
					handleClick={() => addTask(props.tasks.length - 1)}
				/>
			)}
			{taskElements}
		</div>
	);
}
