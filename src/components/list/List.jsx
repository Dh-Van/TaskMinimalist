import React from "react";
import {
	getKeyBindingsConfig,
	generateKeyCombo,
	resetId,
} from "../../assets/utils";

export default function List(props) {
	const [items, setItems] = React.useState([]);
	const itemRefs = React.useRef([]);
	const [focus, setFocus] = React.useState(props.itemElements.length - 1);

	const keyBindings = getKeyBindingsConfig();

	React.useEffect(() => {
		props.setListItems(getTasks());
	}, [0, props.name]);

	React.useEffect(() => {
		storeItems(props.itemElements);
		itemRefs.current = [];
		setItems(
			props.itemElements.map((item, idx) =>
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
	}, [props.itemElements]);

	React.useEffect(() => {
		itemRefs.current[focus] && itemRefs.current[focus].focus();
	}, [items, focus]);

	function addItemRef(element) {
		if (element && !itemRefs.current.includes(element)) {
			itemRefs.current.push(element);
		}
	}

	function storeItems() {
		clearItems();
		props.items.map((item) =>
			localStorage.setItem(
				`${props.name}-${item.id}`,
				JSON.stringify(item)
			)
		);
	}

	function clearItems() {
		let id = 0;
		let localItem = localStorage.getItem(`${props.name}-${id}`);
		while (localItem) {
			localStorage.removeItem(`${props.name}-${id}`);
			localItem = localStorage.getItem(`${props.name}-${++id}`);
		}
	}

	function getTasks() {
		let localItems = [];
		let id = 0;
		let localItem = localStorage.getItem(`${props.name}-${id}`);
		while (localItem) {
			localItems.push(JSON.parse(localItem));
			localItem = localStorage.getItem(`${props.name}-${++id}`);
		}
		return localItems;
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
		props.customClickHandler && props.customClickHandler(id, event);
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
				props.customKeyHandler &&
					props.customKeyHandler(functionString);
			}
		}
	}

	function addItem(id) {
		props.setListItems((prevItems) => [
			...prevItems.slice(0, id + 1),
			{ ...props.emptyItem, id: id },
			...prevItems.slice(id + 1),
		]);
		resetId(props.setListItems);
		setFocus(id + 1);
	}

	function deleteItem(id) {
		props.setListItems((prevItems) => [
			...prevItems.slice(0, id),
			...prevItems.slice(id + 1),
		]);
		resetId(props.setListItems);

		const size = props.itemElements.length - 1;
		setFocus((prevFocus) => {
			return prevFocus >= size ? size - 1 : prevFocus;
		});
	}

	function stepFocus(idx, step) {
		setFocus((prevFocus) => {
			const newFocus = prevFocus + step;
			return Math.max(
				0,
				Math.min(newFocus, props.itemElements.length - 1)
			);
		});
	}

	function edgeFocus(idx, direction) {
		if (direction == -1) {
			direction = props.itemElements.length - 1;
		}

		setFocus(direction);
	}

	return (
		<div className="list">
			{props.itemElements.length === 0 && (
				<button onClick={() => addItem(-1)}>Insert Task</button>
			)}
			{items}
		</div>
	);
}
