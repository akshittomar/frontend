import React from 'react';
import { Draggable } from 'react-beautiful-dnd';


const Item = ({ text, index }) => {
 
  return (<>
    <tr   style={{width:"10%",wordBreak:"break-all"}}>
    <Draggable draggableId={text} index={index}>
      {(provided) => (
        <td style={{color:"grey",wordBreak:"break-all"}}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
        {index+1}.  {text}
        </td>
      )}
    </Draggable>
    </tr>
    </>);
};

export default Item;
