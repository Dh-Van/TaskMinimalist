import React from "react";
import { getKeyBindingsConfig, generateKeyCombo } from "../../assets/utils";

export default function List(props) {
	const [items, setItems] = React.useState([]);
	const itemRefs = React.useRef([]);
	const [focus, setFocus] = React.useState(props.items.length - 1);

	const keyBindings = getKeyBindingsConfig();

	React.useEffect(() => {
		itemRefs.current = [];
		setItems(
			props.items.map((item, idx) =>
				React.cloneElement(item, {
					parameters: {
						onClick: (event) => handleClick(idx, event),
						handleChange: (event) => handleChange(idx, event),
						handleKeyDown: (event) => handleKeyDown(idx, event),
						addRef: (element) => addItemRef(element),
					},
				})
			)
		);
	}, [props.items]);

	React.useEffect(() => {
		itemRefs.current[focus] && itemRefs.current[focus].focus();
	}, [items, focus]);

	function addItemRef(element) {
		if (element && !itemRefs.current.includes(element)) {
			itemRefs.current.push(element);
		}
	}

	function handleChange(id, event) {
		setValue(id, "text", event.target.value);
	}

	function setValue(id, key, value) {
		props.setListItems((prevItems) => [
			...prevItems.slice(0, id),
			{ ...prevItems[id], [key]: value },
			...prevItems.slice(id + 1),
		]);
	}

	function handleClick(id, event) {
		setFocus(id);
	}

	function handleKeyDown(id, event) {
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

			const actionString = binding.Action;
			let functionName = actionString;

			const parameters = [id];
			const comIndex = actionString.indexOf(",");

			if (comIndex > 0) {
				parameters.push(Number(actionString.slice(comIndex + 1)));
				functionName = actionString.slice(0, comIndex);
			}

			let functionString = `${functionName}(${parameters.map(
				(param) => `${param}`
			)})`;

			try {
				eval(functionString);
			} catch (error) {
				props.customHandler(functionString);
			}
		}
	}

	function addItem(id) {
		props.setListItems((prevItems) => [
			...prevItems.slice(0, id + 1),
			{ ...props.emptyItem, id: id },
			...prevItems.slice(id + 1),
		]);
		resetId();

		setFocus(id + 1);
	}

	function deleteItem(id) {
		props.setListItems((prevItems) => [
			...prevItems.slice(0, id),
			...prevItems.slice(id + 1),
		]);
		resetId();

		const size = props.items.length - 1;
		setFocus((prevFocus) => {
			return prevFocus >= size ? size - 1 : prevFocus;
		});
	}

	function resetId() {
		props.setListItems((prevItems) =>
			prevItems.map((item, idx) => ({ ...item, id: idx }))
		);
	}

	function stepFocus(idx, step) {
		setFocus((prevFocus) => {
			const newFocus = prevFocus + step;
			return Math.max(0, Math.min(newFocus, props.items.length - 1));
		});
	}

	function edgeFocus(idx, direction) {
		if (direction == -1) {
			direction = props.items.length - 1;
		}

		setFocus(direction);
	}

	return <div className="list">{items}</div>;
}
