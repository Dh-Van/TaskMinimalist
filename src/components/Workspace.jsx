import React from "react";

export default function Workspace(props){

    const [currTask, setCurrTask] = React.useState("");

    function handleChange(event){
        setCurrTask(event.target.value)
    }

    const taskElements = props.tasks.map(e => <div>{e}</div>)

    return (
        <div className="workspace">
            <h1 className="workspace--inbox">Inbox</h1>
            {taskElements}
            {props.add && <button 
                className="workspace--add-button" 
                onClick={props.handleClick}>
                + Add Task
            </button>}
            {
                !props.add &&
                <input 
                    name="task" 
                    type="text" 
                    autoFocus 
                    onChange={handleChange}
                    onKeyDown={(e) => (props.enter(e, currTask))}
                />
            }
        </div>
    )
}