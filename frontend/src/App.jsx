import { Routes, Route, Link } from 'react-router-dom';
import { useFetchThoughts } from './hooks/useFetchThoughts';
import { likeThought, postNewThought } from './api/thoughts';
import { useState } from 'react';
import ThoughtForm from './components/ThoughtForm'
import ThoughtList from './components/ThoughtList'
import About from './components/About';
import LoginForm from './components/LoginForm';

function App() {

  const {thoughts, setThoughts} = useFetchThoughts()
    const [token, setToken] = useState(localStorage.getItem("token")); 


  const addThought = (message) => {
    postNewThought(message, token)
      .then((newThoughtFromApi) => {
        setThoughts([newThoughtFromApi, ...thoughts]);
      })
      .catch((error) => {
        console.error("Could not post the new thought:", error);
      });
  };

  const handleLike = (id) => {
    likeThought(id)
    .then((updatedThought) => {
      const newList = thoughts.map((t) => {
        return t._id === updatedThought._id ? updatedThought : t;
      });
      setThoughts(newList);
    })
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) {
  return (
    <div className="max-w-md mx-auto px-1 mt-10">
      <LoginForm onLogin={setToken} />
    </div>
  );
}

  return (
    <div className="max-w-md mx-auto px-1">
      <Routes>
        
        <Route path="/" element={
          <>
           <header className="mt-10 text-center text-sm text-gray-500">
              created by Rebecca Sighed &nbsp;|&nbsp;
              <Link
                to='/about'
                className="text-[#ff7a63ff] underline hover:text-red-900"
              >
                About this app
              </Link>
              &nbsp;|&nbsp;
              <button
                onClick={handleLogout}
                className="text-[#ff7a63ff] underline hover:text-red-900"
              >
                Log out
              </button>
            </header>
            <ThoughtForm addThought={addThought} />
            <ThoughtList thoughts={thoughts}
            onLike={handleLike} />
            
          </>
        } />

        {/* About-page: Only shows the About component */}
        <Route path="/about" element={<About />} />

      </Routes>
    </div>
  );
};

export default App