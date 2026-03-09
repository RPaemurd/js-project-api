const API_URL = 'https://happy-thoughts-api-4ful.onrender.com/thoughts';

export const fetchThoughts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch thoughts');
  return response.json();
}; 

export const postNewThought = async (message) => {
  const response = await fetch(API_URL,{ 
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({ message: message })
  });
  if (!response.ok) throw new Error('Could not send the thought');
  return response.json();   
};

export const likeThought = async (id) => {
  const response = await fetch(API_URL + "/" + id + "/like", {
  method: 'POST',

  });
  return response.json();
};
