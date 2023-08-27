import React from 'react'
import App from './Color4';

function SplitNote(props) {
  
  const note = props.note;
  var  doneTasks = note.filter(task => task.tag === "done");
  var doingTasks = note.filter(task => task.tag === "doing");
  var todoTasks = note.filter(task => task.tag === "todo");
    return (
    <>

        <App doneTasks={doneTasks} doingTasks={doingTasks} todoTasks={todoTasks} />
    </>
  )
}

export default SplitNote