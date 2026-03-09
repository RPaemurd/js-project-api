import { formatDistanceToNow } from 'date-fns';

function ThoughtCard({ thought, onLike }) {
  return (
    <div className="mx-4 my-3 bg-gray-100 border-1 border-solid p-4 shadow-lg max-w-md relative">
      {/* This creates the black shadow effect */}
      <div className="absolute top-2 left-2 w-full h-full bg-black -z-10"></div>
      
      {/* Thought text */}
      <p className="text-base leading-relaxed mb-4 text-gray-800 break-words">
        {thought.message}
      </p>

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

        {/* Timestamp */}
        <span className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(thought.createdAt), { addSuffix: true })}
        </span>
      </div>
    </div>
  );
}

export default ThoughtCard;