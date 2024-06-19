import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ card, index }) => {
  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-purple-950 shadow-sm rounded-lg p-4"
        >
          <p>{card.content}</p>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
