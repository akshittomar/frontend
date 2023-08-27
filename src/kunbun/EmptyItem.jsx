import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import image from './done.jpg'
import image2 from './pending.jpg'
import image3 from './nocollab.png'



const EmptyItem = (props) => {
  var source  = image;
  const id = props.id ;
  if (id==="todo") {
   source=image2
   
  } else if(id==="done") {
   source=image;
   
  }
  else{
  source=image3
  }
  

  return (
    <tr style={{ width: "10%" }}>
      <Draggable draggableId="empty" index={0}>
        {(provided) => (
          <td
            style={{ color: "white", wordBreak: "break-all" }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          > 
            <img className='mx-5' src={source} style={{width:"30%"}} alt="Empty" /><br/>
            <span className='fa-fade' style={{color:"grey",fontSize:"small"}}>NOTHING TO SHOW <i className="fa-solid fa-mug-hot fa-sm"></i></span>
          </td>
        )}
      </Draggable>
    </tr>
  );
};

export default EmptyItem;
