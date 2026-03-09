import { Routes, Route, Link } from 'react-router-dom';
import { useFetchThoughts } from './hooks/useFetchThoughts';
import { likeThought, postNewThought } from './api/thoughts';
import ThoughtForm from './components/ThoughtForm'
import ThoughtList from './components/ThoughtList'
import About from './components/About';

function App() {

  const {thoughts, setThoughts} = useFetchThoughts()
  const addThought = (message) => {
    postNewThought(message)
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