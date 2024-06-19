import React, { useState } from "react";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";
import Modal from "./Modal";

const List = ({ list, index }) => {
  const [showModal, setShowModal] = useState(false);
  const [newCardContent, setNewCardContent] = useState("");

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddCard = () => {
    const newCard = {
      id: String(Date.now()), // Generate a unique ID (usually handled by backend)
      content: newCardContent,
    };

    list.cards.push(newCard);

    setNewCardContent("");
    toggleModal();
  };

  return (
    <>
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
      <div className="mt-4">
        <button
          onClick={toggleModal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Card
        </button>
      </div>
      {showModal && (
        <Modal
          title="Add New Card"
          onClose={toggleModal}
          onSubmit={handleAddCard}
        >
          <div className="mb-4">
            <label
              htmlFor="newCardContent"
              className="block text-sm font-medium text-gray-700"
            >
              Card Content
            </label>
            <textarea
              id="newCardContent"
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={newCardContent}
              onChange={(e) => setNewCardContent(e.target.value)}
              rows="3"
            ></textarea>
          </div>
        </Modal>
      )}
    </>
  );
};

export default List;
