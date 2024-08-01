import React from "react";

export default function List(props) {
	const [items, setItems] = React.useState([]);
	const itemRefs = React.useRef([]);
	const [focus, setFocus] = React.useState(props.items.length - 1);

	React.useEffect(() => {
		setItems(
			props.items.map((item) =>
				React.cloneElement(item, {
					handleClick: handleClick,
					handleChange: handleChange,
					handleKeyDown: handleKeyDown,
					addRef: addItemRef,
				})
			)
		);
	}, props.items);

	React.useEffect(() => {
		itemRefs.current[focus] && itemRefs.current[focus].focus();
	}, [items, focus]);

	function addItemRef(element) {
		if (element && !itemRefs.current.includes(element)) {
			itemRefs.current.push(element);
		}
	}

	function handleClick(id, event) {}

	function handleChange(id, event) {
		props.setValue(id, "text", event.target.value);
	}

	function handleKeyDown(id, event) {
		if (event.key === "ArrowDown") {
			setFocus((prevFocus) => prevFocus + 1);
		}
		if (event.key === "ArrowUp") {
			setFocus((prevFocus) => prevFocus - 1);
		}
	}

	console.log(focus);

	return <div className="list">{items}</div>;
}
