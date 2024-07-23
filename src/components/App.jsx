import React from "react";
import Sidebar from "./Sidebar";
import Workspace from "./Workspace";

export default function App(){

    const [add, setAdd] = React.useState(true)
    const [tasks, setTasks] = React.useState([])
    const [currTask, setCurrTask] = React.useState("");

    function handleClick(){
        setAdd(false)
    }

    function handleChange(event){
        setCurrTask(event.target.value)
    }

    function enter(e, val){
        if(e.key !== "Enter"){return}

        // setAdd(true)
        setCurrTask("")
        setTasks(prevState => ([...prevState, val]))
    }

    function onBlur(){
        setAdd(true)
        // setCurrTask("")
        // setTasks(prevState => ([...prevState, val]))

    }

    return (
        <div className="app">
            <Sidebar />
            <Workspace tasks={tasks} add={add} handleChange={handleChange} handleClick={handleClick} enter={enter} currTask={currTask} onBlur={onBlur}/>
        </div>
    )
}