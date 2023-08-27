import React, { useState,useEffect } from 'react';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import noteContext from "../context/notes/noteContext";
import { useContext } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function App(props) {
  const { logout, user, isAuthenticated, isLoading } = useAuth0();
  const context = useContext(noteContext);
  const editNote = context.editNote ;
  const initialColumns = {
    todo: {
      id: 'todo',
      list: props.todoTasks,
    },
    doing: {
      id: 'doing',
      list:  props.doingTasks,
    },
    done: {
      id: 'done',
      list: props.doneTasks,
    },
  };
  const [columns, setColumns] = useState(initialColumns);
  const onDragEnd = ({ source, destination }) => {
    // Make sure we have a valid destination
    
    
    
    // Set start and end variables
    
   
    if (destination === undefined || destination === null) return null;
  
    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;
      const start = columns[source.droppableId];
      const end = columns[destination.droppableId];
        
       
    
    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter((item, idx) => idx !== source.index);
  
      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);
  
      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
      };
  
      // Update the state
      setColumns(state => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      
      console.log("ISKO :");
      console.log(start.list[source.index]._id)
      console.log("ISME:")
       console.log(destination.droppableId);
       editNote(start.list[source.index]._id,start.list[source.index].title,start.list[source.index].description,destination.droppableId,user.email);

      const newStartList = [...start.list];
      const [draggedItem] = newStartList.splice(source.index, 1);

        // console.log(draggedItem);
      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
      };
  
      // Make a new end list array
      const newEndList = [...end.list];
      
      // Insert the item into the end list
      newEndList.splice(destination.index, 0, draggedItem);
  
      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList,
      };
  
      // Update the state
      setColumns(state => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
  };
  

  return (<>
  {/* {load===true && <p  className='fa-fade' style={{fontFamily:"fantasy"}}>OYE PAPA JI...</p>} */}
  {  <DragDropContext onDragEnd={onDragEnd}>
      
  <div className='container'>
  <div className='row'>
  
        {Object.values(columns).map(col => (
          <Column col={col} key={col.id} />
        ))}
        </div></div>
      
      
    </DragDropContext>}</>
  );
}

export default App;
