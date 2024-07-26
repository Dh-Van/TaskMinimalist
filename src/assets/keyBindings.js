// utils.js

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
	];

	return keyBindings.reduce((acc, binding) => {
		const combo = generateKeyCombo(binding);
		acc[combo] = binding;
		return acc;
	}, {});
}
