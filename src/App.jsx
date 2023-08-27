import React from 'react'
import './App.css'
import NoteItem from './components/NoteItem';
import Navbar from './components/Navbar'
import NoteState from './context/notes/notesState';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Kanban from './kunbun/Kanban';


function App() {
  

  return (
    <>
        <NoteState>
          <Router>
          <Navbar/>
          {/* <Todo/> */}
          <Routes>
          
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/kanban' element={<Kanban/>} />
         
          </Routes>
          </Router>
          </NoteState>
    </>
  )
}

export default App
