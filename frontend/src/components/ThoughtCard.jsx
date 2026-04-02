import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

function ThoughtCard({ thought, onLike, onEdit, onDelete, currentUserId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editMessage, setEditMessage] = useState(thought.message);
  const isOwner = thought.createdBy === currentUserId;

  const handleSave = () => {
    onEdit(thought._id, editMessage);
    setIsEditing(false);
  };

  return (
    <div className="mx-4 my-3 bg-gray-100 border-1 border-solid p-4 shadow-lg max-w-md relative">
      {/* This creates the black shadow effect */}
      <div className="absolute top-2 left-2 w-full h-full bg-black -z-10"></div>

      {/* Thought text or edit textarea */}
      {isEditing ? (
        <div className="mb-4">
          <textarea
            value={editMessage}
            onChange={e => setEditMessage(e.target.value)}
            rows="2"
            maxLength={140}
            className="w-full p-2 border focus:outline-none focus:ring-1"
          />
          <div className="flex gap-2 mt-1">
            <button onClick={handleSave} className="text-sm bg-green-200 px-3 py-1 rounded hover:bg-green-300">Save</button>
            <button onClick={() => { setIsEditing(false); setEditMessage(thought.message); }} className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">Cancel</button>
          </div>
        </div>
      ) : (
        <p className="text-base leading-relaxed mb-4 text-gray-800 break-words">
          {thought.message}
        </p>
      )}

      {/* Footer with hearts and timestamp */}
      <div className="flex items-center justify-between">

        {/* Hearts section */}
        <button className="flex items-center gap-2 hover:scale-110 transition-transform" onClick={() => onLike(thought._id)}>
          {/* The circle*/}
          <div className="bg-gray-300 rounded-full p-3 flex items-center justify-center">
            <img src="./heart.png" alt="heart emoji" className="w-4" />
          </div>
          <span className="text-sm font-semibold text-gray-800">x {thought.hearts} </span>
        </button>

        <div className="flex items-center gap-3">
          {/* Edit/Delete — only for owner */}
          {isOwner && !isEditing && (
            <>
              <button onClick={() => setIsEditing(true)} className="text-xs text-blue-500 hover:underline">Edit</button>
              <button onClick={() => onDelete(thought._id)} className="text-xs text-red-500 hover:underline">Delete</button>
            </>
          )}
          {/* Timestamp */}
          <span className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(thought.createdAt), { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ThoughtCard;