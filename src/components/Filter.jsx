import React , {useRef,useEffect,useState} from 'react'
import NoteItem from './NoteItem';
import Nowork from './Nowork';
function Filter(props) {
    const note = props.notes ;
    const deleteNote = props.deleteNote;
    const updateNotes = props.updateNotes ;

    var todoTasks = []

const [task, settask] = useState(note.filter(task => task.tag === "todo"))

    useEffect(() => {
      
        // var  doneTasks = note.filter(task => task.tag === "done");
        // var doingTasks = note.filter(task => task.tag === "doing");
        if(!localStorage.getItem("refer")){
            localStorage.setItem("refer","todo");
        }
          settask(note.filter(task => task.tag === localStorage.getItem("refer")));
    }, [])
    
   
    const tagRef = useRef("todo");

  return (
    <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{backgroundColor:"rgba(168, 207, 218, 0.32)"}}>
  <div className="container-fluid">
    <div className="navbar-brand" onClick={(e)=>{e.preventDefault()}} style={{cursor:"pointer"}}  >Workspace <i className="fa-solid fa-clipboard-list"></i></div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav nav-tabs nav">
      <li className="nav-item mx-5" style={{cursor:"pointer"}}>
          <div className={localStorage.getItem('refer')==="todo"?"nav-link active":"nav-link"} onClick={()=>{tagRef.current="todo";console.log(tagRef.current),settask(note.filter(task => task.tag === "todo")),localStorage.setItem("refer","todo")}} >Todo&nbsp;<i className="fa-solid fa-business-time"></i></div>
        </li>
        <li className="nav-item mx-5" style={{cursor:"pointer"}}>
          <div className={localStorage.getItem('refer')==="done"?"nav-link active":"nav-link"} aria-current="page" onClick={()=>{tagRef.current="done";console.log(tagRef.current);settask(note.filter(task => task.tag === "done")),localStorage.setItem("refer","done")}} >Done <i className="fa-solid fa-check"></i></div>
        </li>
        <li className="nav-item mx-5" style={{cursor:"pointer"}}>
          <div className={localStorage.getItem('refer')==="doing"?"nav-link active":"nav-link"} onClick={()=>{tagRef.current="doing";console.log(tagRef.current),settask(note.filter(task => task.tag === "doing")),localStorage.setItem("refer","doing")}} >Doing <i className="fa-solid fa-thumbtack"></i></div>
        </li>
       
       
      </ul>
    </div>
  </div>
</nav>


<div className="row my-5" >  
        {/* //todo */}
        { 
         task.map((notes) => {
          return <>
            <NoteItem key={notes._id}  notes={notes} updateNotes={updateNotes} deleteNote={deleteNote} refer={tagRef.current}  />
            </>;
        })
        }
        {
          task.length ===0 && <Nowork/>
        }
       
        </div>




    </div>
  )
}

export default Filter