"use client"
import React from 'react';
import List from './List';
import { DragDropContext } from 'react-beautiful-dnd';

const Board = ({ board, onDragEnd }) => {
    
  return (
    
      <div className="bg-purple-950 shadow-md rounded-lg p-4 w-full">
        <h2 className="text-xl font-semibold mb-4">{board.name}</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {board.lists.map((list, index) => (
            <List key={list.id} list={list} index={index} />
          ))}
        </div>
      </div>

  );
};

export default Board;
