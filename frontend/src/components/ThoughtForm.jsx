import { useState } from "react";

const ThoughtForm = ({addThought}) => { 
    const [newThought, setNewThought] = useState (""); 

    const handleFormSubmit = (e) => {
        e.preventDefault(); 
        addThought(newThought);
        setNewThought("");
    }; 

  return (
<div className="mx-4 md:mx-auto mt-10 bg-gray-100 border-1 border-solid p-4 shadow-lg max-w-md relative">
      <div className="absolute top-2 left-2 w-full h-full bg-black -z-10"></div>
      
      <form onSubmit={handleFormSubmit} > 
        <label htmlFor="happy-thought" className="block text-gray- font-semibold mb-2">
          What's making you happy right now?
        </label>
        <textarea
           value={newThought} onChange={e => setNewThought(e.target.value)} 
          id="happy-thought"
          rows="2"
          className="w-full p-2 border focus:outline-none focus:ring-1"
          placeholder="React is making me happy!"
          maxLength={140}
        />
        <span className="text-xs text-gray-500">
            {140 - newThought.length} / 140
          </span>
        <button
          type="submit"
          className="mt-3 bg-red-200 text-black-700 font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-red-300 hover:text-white transition-colors"
        >
          <img src="./heart.png" alt="heart emoji"className="w-4" />
          Send Happy Thought
          <img src="./heart.png" alt="heart emoji" className="w-4" />
        </button>
      </form>
    </div>
  );
};

export default ThoughtForm;
