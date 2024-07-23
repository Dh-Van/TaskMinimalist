import React from "react";
import Sidebar from "./Sidebar";
import Workspace from "./Workspace";

export default function App(){

    const [add, setAdd] = React.useState(true)
    const [tasks, setTasks] = React.useState([])

    function handleClick(){
        setAdd(false)
    }

    function enter(e, val){
        if(e.key !== "Enter"){return}

        setAdd(true)
        setTasks(prevState => ([...prevState, val]))
    }

    return (
        <div className="app">
            <Sidebar />
            <Workspace tasks={tasks} add={add} handleClick={handleClick} enter={enter}/>
        </div>
    )
}