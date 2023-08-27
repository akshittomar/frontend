import React ,{useEffect}from 'react';
import Spinner from '../Bars.gif';
import { useContext } from 'react';
import noteContext from "../context/notes/noteContext";
import { useAuth0 } from "@auth0/auth0-react";
import NoteItem from './NoteItem';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from 'react-router-dom';
import Filter from './Filter';
import Nowork from './Nowork';

import { useRef , useState } from 'react';




export default function Notes() {
  
  const {  user,  } = useAuth0();

const [load, setload] = useState(true)

const [status, setstatus] = useState("");
  
  // let navigate = useNavigate();
  const ref = useRef(null);
  const refClose = useRef(null);
  const context = useContext(noteContext);
const mode = context.mode ;
  const notes = context.notes;

  const {editNote} = context;

  const {getNotes} = context;
  const {deleteNote} = context;
 
  const [note, setnote] = useState({id:"",eTitle: "your title here", eDescription: "your description here " , eTag:"default"});
  const [dummy, setdummy] = useState({Title: ""});
 

useEffect(() => {
  
  const fetchData = async () => {
    
    await getNotes(user.email);
    
    
    setload(false);
  };

  fetchData();

}, [note]);

useEffect(() => {

  getNotes(user.email);
}, [load]);

  const updateNotes =  (currentNotes) => {
   
    setdummy({Title:currentNotes.title});
    setnote({id:currentNotes._id,eTitle:currentNotes.title,eDescription:currentNotes.description,eTag:currentNotes.tag});    
    
    
    ref.current.click();
  }

  

  const handelClick= async (e) =>{
    e.preventDefault(); 
 
   
   
    refClose.current.click();
    setload(true);
    await editNote(note.id, note.eTitle, note.eDescription, note.eTag,user.email)
     await getNotes(user.email)
     
     setload(false);
     
  }
  const handelOnChange= (e) =>{
setnote({...note, [e.target.name]:e.target.value})

  }
const deleteNotes=async(id,email)=>{
  console.log("delete request for"+id+"with email"+email);
  setload(true);
  await deleteNote(id,email);
  await  getNotes(user.email);
  setload(false);
}
 

  return (
    <div className='' >



      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className={mode==="dark"?"modal-dialog bg-dark":"modal-dialog"}>
          <div className={mode==="dark"?"modal-content bg-dark":"modal-content"}>
            <div className="modal-header" style={mode==="dark"?{color:"white"}:{}}>
              <h1 className="modal-title fs-5 " id="exampleModalLabel">EDIT NOTES</h1>
              <button type="button" className={mode==="dark"?"btn-close bg-light ":"btn-close"} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={mode==="dark"?{color:"white"}:{}}>




              <form   onSubmit={e => e.preventDefault()} >
                <div className="mb-3">
                  
                  <label htmlFor="eTitle" className="form-label"  >Title</label>
                 <input type="text" className={mode==="dark"?"form-control bg-dark":"form-control"} id="eTitle" style={mode==="dark"?{color:"white"}:{}} name="eTitle" onChange={handelOnChange} value={note.eTitle}  minLength={5} required />

                  </div> 
                <div className="mb-3">
                  <label htmlFor="eDescription" className="form-label"  >Description</label>
                  <input type="text" className={mode==="dark"?"form-control bg-dark":"form-control"}  style={mode==="dark"?{color:"white"}:{}}  id="eDescription" name="eDescription" onChange={handelOnChange} value={note.eDescription} minLength={5} required />
                </div>

               
              </form>





            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className={mode==="dark"?"btn btn-outline-light":"btn btn-outline-dark"} data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" 
              
            
              onClick={ handelClick} disabled={note.eTitle.length<5 || note.eDescription.length<5}>UPDATE NOTES </button>
            </div>
          </div>
        </div>
      </div>

        
        
        {load===true && <><img src={Spinner} className='my-5 mx-5 bg-transparent' style={{width:"20%"}} alt='LOADING...'></img></>}
        {notes.length===0  && load===false &&<Nowork /> }

        <div className="row my-5" >  
        {/* { notes.length!==0  && load===false &&
         notes.map((notes) => {
          return <>
            <NoteItem key={notes._id}  notes={notes} updateNotes={updateNotes} deleteNote={deleteNote}  />
            </>;
        })
        } */}

          {
            notes.length!==0 && load === false && <Filter notes={notes} updateNotes={updateNotes} deleteNote={deleteNotes}/>
          }

      </div> 

      {/* <nav>
        <Link to="/notes/todo">Todo</Link>
        <Link to="/notes/doing">Doing</Link>
        <Link to="/notes/done">Done</Link>
      </nav> */}
{/*       
      <Routes>
        <Route path="/notes/todo" element={<NoteItem status="todo" notes={notes} updateNotes={updateNotes} deleteNote={deleteNote} />} />
        <Route path="/notes/doing" element={<NoteItem status="doing" notes={notes} updateNotes={updateNotes} deleteNote={deleteNote} />} />
        <Route path="/notes/done" element={<NoteItem status="done" notes={notes} updateNotes={updateNotes} deleteNote={deleteNote} />} />
      </Routes> */}
    </div>
  )
}
