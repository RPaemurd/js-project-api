import { useState, useEffect } from 'react'
import { fetchThoughts } from '../api/thoughts'

export const useFetchThoughts = () => {
   const [thoughts, setThoughts] = useState([]);

   useEffect(() => {
    fetchThoughts()
    .then((data) => {
      setThoughts(data);
    })
    .catch((err) => console.error("Could not fetch any thoghts:", err));
   }, []);

   return {
      thoughts, 
      setThoughts
   };


 /*  const addThought = (message) => {
    const newToughtObject = {
      _id: Date.now(),
      message: message,
      hearts: 0,
      createdAt: new Date().toISOString()
    };
    setThoughts([newToughtObject, ...thoughts]);
  }; */
}

