import React from 'react';
import Card from './Card';
import { Droppable } from 'react-beautiful-dnd';

const List = ({ list, index }) => {
    
  return (
    <Droppable droppableId={String(list.id)}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-purple-200 rounded-lg p-4 w-64"
        >
          <h3 className="text-lg font-semibold mb-4">{list.name}</h3>
          <div className="space-y-2">
            {list.cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default List;
