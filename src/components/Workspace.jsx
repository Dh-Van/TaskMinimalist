import React from "react";

export default function Workspace(props){


    // function handleChange(event){
    //     setCurrTask(event.target.value)
    // }

    const taskElements = props.tasks.map(e => <div>{e}</div>)

    console.log(props)

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
                    onChange={props.handleChange}
                    onBlur={props.onBlur}
                    value={props.currTask}
                    onKeyDown={(e) => (props.enter(e, props.currTask))}
                />
            }
        </div>
    )
}