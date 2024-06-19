"use client";
import React, { useState } from "react";
import Board from "./Board";
import Board1 from "./Board1";
import { DragDropContext } from "react-beautiful-dnd";
import Modal from "./Modal";

const Dashboard = () => {
  const [board, setBoard] = useState({
    name: 'Project Board',
    lists: [
      {
        id: 'list-1',
        name: 'To Do',
        cards: [
          { id: 'card-1', content: 'Task 1' },
          { id: 'card-2', content: 'Task 2' },
        ],
      },
      {
        id: 'list-2',
        name: 'In Progress',
        cards: [
          { id: 'card-3', content: 'Task 3' },
        ],
      },
      {
        id: 'list-3',
        name: 'Done',
        cards: [
          { id: 'card-4', content: 'Task 4' },
        ],
      },
    ],
  });

  const [showAddListModal, setShowAddListModal] = useState(false);
  const [newListName, setNewListName] = useState('New List');

  const toggleAddListModal = () => {
    setShowAddListModal(!showAddListModal);
  };

  const handleAddList = () => {
    const newList = {
      id: String(Date.now()), // Generate a unique ID (usually handled by backend)
      name: newListName,
      cards: [],
    };

    setBoard({
      ...board,
      lists: [...board.lists, newList],
    });

    setNewListName('');
    toggleAddListModal();
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If there's no destination (dropped outside any droppable area)
    if (!destination) {
      return;
    }

    // If the card was dropped in the same position
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceListIndex = board.lists.findIndex(list => list.id === source.droppableId);
    console.log();
    const destinationListIndex = board.lists.findIndex(list => list.id === destination.droppableId);

    const sourceList = board.lists[sourceListIndex];
    const destinationList = board.lists[destinationListIndex];

    const sourceCards = Array.from(sourceList.cards);
    const [removedCard] = sourceCards.splice(source.index, 1);

    if (sourceList === destinationList) {
      sourceCards.splice(destination.index, 0, removedCard);
      const newLists = Array.from(board.lists);
      newLists[sourceListIndex] = { ...sourceList, cards: sourceCards };

      setBoard({
        ...board,
        lists: newLists,
      });
    } else {
      const destinationCards = Array.from(destinationList.cards);
      destinationCards.splice(destination.index, 0, removedCard);

      const newLists = Array.from(board.lists);
      newLists[sourceListIndex] = { ...sourceList, cards: sourceCards };
      newLists[destinationListIndex] = { ...destinationList, cards: destinationCards };

      setBoard({
        ...board,
        lists: newLists,
      });
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl">Project Management Dashboard</h1>
        <div>
          <button
            onClick={toggleAddListModal}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-4"
          >
            Add List
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
            Settings
          </button>
        </div>
      </header>
      <DragDropContext onDragEnd={onDragEnd}>
        <Board board={board} />
      </DragDropContext>
      {showAddListModal && (
        <Modal
          title="Add New List"
          onClose={toggleAddListModal}
          onSubmit={handleAddList}
        >
          <div className="mb-4">
            <label htmlFor="newListName" className="block text-sm font-medium text-gray-700">
              List Name
            </label>
            <input
              id="newListName"
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
