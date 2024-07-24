import React from "react";

export default function Task(props) {
	const inputRef = React.useRef(null);

	if (props.focus && inputRef.current) {
		inputRef.current.focus();
	}

	function handleChange(event) {
		props.edit(event.target.value, props.id);
	}

	function handleKey(event) {
		if (event.key === "Enter") {
			document.activeElement.blur();
			props.submit();
		}

		if (event.key === "ArrowUp") {
			props.move(-1);
		}

		if (event.key === "ArrowDown") {
			props.move(1);
		}
	}

	const styles = {
		taskContainer: {
			background: props.focus ? "#282828" : "transparent",
		},
	};

	return (
		<div className="task" style={styles.taskContainer}>
			<input className="task--checkbox" type="checkbox" />
			<input
				autoFocus={props.focus}
				className="task--text"
				type="text"
				value={props.text}
				onChange={handleChange}
				onKeyDown={handleKey}
				onClick={(event) => props.handleClick(event, props.id)}
				ref={inputRef}
			/>
		</div>
	);
}
