const API_URL = `${import.meta.env.VITE_API_URL}/api/thoughts`;
console.log(import.meta.env.VITE_API_URL)

export const fetchThoughts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch thoughts');
  return response.json();
}; 

export const postNewThought = async (message, token) => {
  const response = await fetch(API_URL,{
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     },
     body: JSON.stringify({ message: message })
  });
  if (!response.ok) throw new Error('Could not send the thought');
  return response.json();   
};

export const updateThought = async (id, message, token) => {
  const response = await fetch(API_URL + "/" + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ message })
  });
  if (!response.ok) throw new Error('Could not update thought');
  return response.json();
};

export const deleteThought = async (id, token) => {
  const response = await fetch(API_URL + "/" + id, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error('Could not delete thought');
  return response.json();
};

export const likeThought = async (id) => {
  const response = await fetch(API_URL + "/" + id + "/like", {
  method: 'POST',

  });
  return response.json();
};
