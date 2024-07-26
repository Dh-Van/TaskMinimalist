export function generateKeyCombo({ Key, META, SHIFT, ALT, CTRL }) {
	let prefix = "";
	if (META) prefix += "META_";
	if (SHIFT) prefix += "SHIFT_";
	if (ALT) prefix += "ALT_";
	if (CTRL) prefix += "CTRL_";
	return `${prefix}${Key.toLowerCase()}`;
}

export function getKeyBindingsConfig() {
	const keyBindings = [
		{ Key: "Enter", Action: "addTask" },
		{ Key: "ArrowUp", Action: "stepFocus(-1)" },
		{ Key: "ArrowDown", Action: "stepFocus(1)" },
		{ Key: "d", META: true, Action: "deleteTask" },
		{ Key: "ArrowUp", META: true, Action: "focusTask(0)" },
		{ Key: "ArrowDown", META: true, Action: "focusTask(-1)" },
		{ Key: "Enter", META: true, Action: "check()" },
		{ Key: "0", META: true, Action: "setPriority(0)" },
		{ Key: "1", META: true, Action: "setPriority(1)" },
		{ Key: "2", META: true, Action: "setPriority(2)" },
		{ Key: "3", META: true, Action: "setPriority(3)" },
		{ Key: "4", META: true, Action: "setPriority(4)" },
	];

	return keyBindings.reduce((acc, binding) => {
		const combo = generateKeyCombo(binding);
		acc[combo] = binding;
		return acc;
	}, {});
}

export function getPriorityConfig() {
	return {
		0: "white",
		1: "red",
		2: "orange",
		3: "yellow",
		4: "green",
	};
}
