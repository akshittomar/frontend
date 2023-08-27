import React from 'react'
import Notes from "./Notes";
import { useContext } from 'react';
import noteContext from "../context/notes/noteContext";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Bars.gif';
import { useAuth0 } from "@auth0/auth0-react";
import Notask from './Notask';


export default function AddNotes() {


  const { loginWithRedirect } = useAuth0();
  const { logout, user, isAuthenticated, isLoading } = useAuth0();

  const context = useContext(noteContext);
  const mode = context.mode;
  const setmode = context.setmode;
  const [loading, setLoading] = useState(false);
  const { addNote } = context;
  const ref = context.ref;
  const { getNotes } = context;
  const [note2add, setnote2add] = useState({ Title: "", Description: "", Tag: "Undefined", Hrs: 0, Min: 0, Sec: 0 });
  const [tag, settag] = useState("");
  let navigate = useNavigate();
  const tagg = useRef('todo');
  const handelClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addNote(note2add.Title, note2add.Description, tagg.current, user.email);

      localStorage.setItem('refer',tagg.current);
    if (note2add.Hrs !== 0 || note2add.Min !== 0 || note2add.Sec !== 0) {
      var s1 = note2add.Title + "sec";
      var s2 = note2add.Title + "min";
      var s3 = note2add.Title + "hrs";
      localStorage.setItem(s1, note2add.Sec.toString());
      localStorage.setItem(s2, note2add.Min.toString());
      localStorage.setItem(s3, note2add.Hrs.toString());
    }
    setnote2add({ Title: "", Description: "", Tag: "default", Hrs: 0, Min: 0, Sec: 0 });
    await getNotes(user.email);

    setLoading(false);
  }
  const handelOnChange = (e) => {
    setnote2add({ ...note2add, [e.target.name]: e.target.value })
  }

  const handleTag = (e) => {
    settag(e.target.value);
    // console.log(tag);
    tagg.current = e.target.value;
    // console.log('22222');
    console.log(tagg.current);
  }


  useEffect(() => {

    console.log(" ues ran once    ");

  }, [tag])

  return (
    <div>


      <form   >
        <div className="mb-3">
          <label htmlFor="Title" className="form-label" style={{ fontFamily: "cursive" }}  >Title <i className="fa-solid fa-highlighter"></i></label>
          <input type="text" className="form-control" id="Title" name="Title" style={mode === "dark" ? { color: 'aliceblue', background: 'bottom' } : {}} onChange={handelOnChange} value={note2add.Title} minLength={5} required />

        </div>
        <div className="mb-3">
          <label htmlFor="Description" className="form-label" style={{ fontFamily: "cursive" }}  >Description<i className="fa-solid fa-book-open"></i></label>
          <textarea type="text" className="form-control" id="Description" name="Description" style={mode === "dark" ? { color: 'aliceblue', background: 'bottom' } : {}} value={note2add.Description} onChange={handelOnChange} minLength={5} required />
        </div>
          <div className="mb-3 ">
          <label htmlFor="Tag" className="form-label" style={{ fontFamily: "cursive" }} >TAG <i className="fa-solid fa-tag"></i></label>
          <select class="form-select" aria-label="Default select example" id='inputGroupSelect01' required onChange={handleTag}>
            <option value="" disabled selected>Select an option</option>
            <option value="todo" key={1} >Todo</option>
            <option value="doing" key={2}>Doing</option>
            <option value="done" key={3}> Done</option>
          </select></div>
          <small ><p className='mx-6 my-6' style={{fontFamily:"monospace"}} >By defult task is set to 'TODO' </p></small>

      
        {isLoading && <p className='fa-fade' style={{ fontFamily: "fantasy" }}>Loading...</p>}
        {!isLoading && isAuthenticated && <button disabled={note2add.Title.length < 5 || note2add.Description.length < 5 } type="submit" className="btn btn-primary" onClick={handelClick}>ADD TASK <i className="fa-solid fa-briefcase"></i></button>}
        {loading === true && <><img src={Spinner} style={{ width: "5%" }} alt=''></img><br /><span className='fa-fade' style={{ fontFamily: "fantasy" }}>PROCESSING REQUEST.....</span></>}
      </form>
      {!isAuthenticated && !isLoading && <button className={mode === "light" ? "btn btn-outline-dark btn-sm my-3" : "btn btn-outline-light btn-sm my-3"} type="submit" onClick={() => loginWithRedirect()}>Login To Add Notes <i className="fa-solid fa-arrow-right-to-bracket fa-rotate-180"></i></button>}

      {!isAuthenticated && !isLoading  && <Notask />}
      {isAuthenticated && !isLoading && !loading && <Notes></Notes>}


      {


      }


    </div>
  )
}
