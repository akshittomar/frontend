import React, {useState,useEffect} from 'react'
import noteContext from "../context/notes/noteContext";
import { useContext } from 'react';
import SplitNote from './SplitNote';
import { useAuth0 } from "@auth0/auth0-react";
function KTasks() {
    const { logout, user, isAuthenticated, isLoading } = useAuth0();
      const context = useContext(noteContext);
  const {getNotes} = context;
  const notes = context.notes;
    const [load, setload] = useState(true);
   

       
          useEffect(() => {
      
    const fetchData = async()=>{
      setload(true);
        await getNotes(user.email);
        
     
        setload(false);
    }
      fetchData();

    }, [])

  return (
    <>
        { load===false &&  <SplitNote  note={notes} /> }

    </>
  )
}

export default KTasks