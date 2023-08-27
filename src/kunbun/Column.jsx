import React from 'react';
import Item from './Item';
import { Droppable } from 'react-beautiful-dnd';
import EmptyItem from './EmptyItem';



// import { styled } from './stiches.config';


const Column = ({ col: { list, id } }) => {

var color = "";
var clas = "" ;
if (id==="todo") {
  color='#e20404';
  clas="fa-solid fa-clock-rotate-left"
} else if(id==="done") {
  color="green";
  clas="fa-regular fa-square-check"
}
else{
color="#caca1f";
clas="fa-solid fa-thumbtack"
}




  return (<div className='col-md-3 col-sm-6 mb-4' style={{width:"100%",boxSizing:"border-box"}}>
    <Droppable droppableId={id}>
      {(provided) => (
        
          
          <div className='' style={{
           border:'solid 1px grey'
          }} {...provided.droppableProps} ref={provided.innerRef}>
             
            
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" style={{ color: `${color}` }}>{id.toUpperCase()} <i className={clas}></i></th>
                  </tr>
                </thead>
                <tbody>
            {list.length!==0 && list.map((note, index) => (
              <Item text={note.title} index={index} key={note._id} />
            ))}
            {
              list.length===0 && <EmptyItem id={id}/>
            }
            </tbody>
              </table>
            
        
            {provided.placeholder}
            </div>  
      
      )}
    </Droppable></div>
  );
};

export default Column;
