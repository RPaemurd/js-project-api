https://happy-thoughts-app-technigo.netlify.app/

## Requirements

- Your page should follow the design as closely as possible
- Your app should be responsive (it should look good on devices from 320px width up to at least 1600px)
- Your app should have a text area and a submit button. When the button is clicked, your app should empty the form and    show the form submission in a message card according to the design.
- Your code should follow the guidelines on how to write clean code

- On form submission, the happy thoughts should be posted to the API
- The happy thoughts should be listed (most recent thoughts at the top and older thoughts at the bottom) and rendered on page load and updated after form submission
- The happy thoughts should show the content of the message and how many likes they've received
- Each happy thought should include a heart button that sends likes. The number should increase after a user has liked a thought.

## Stretch Goals
- Show a count below the form input that updates as the user types and shows how many characters are remaining. Make it go red when the user has typed over 140 characters
- When POSTing a new thought, if the message was empty, too long, or too short, you get an error message in the UI. Use this to set some sort of error state to show a friendly message to your user.
- Add an animation for when a new thought is submitted and appears in the list below

- Keep count of how many different posts you have liked (different from how many times a post has been liked). Keep count and display it in some way. You could even go as far as to store this number in localStorage so that when the page is reloaded, the initial state can be set from the number you've stored.
- Handle loading states. See hint below 👇 When you initially fetch the list of recent thoughts, it might take a little time to get the response back from the API. During this time, you could show a loading message or spinner of some sort on the page. Use something like const [loading, setLoading] = useState(true) to make it so the page is loading by default, then call setLoading(false) once you get the response back from the API. With the new thought form and the heart button, you could choose to also show a loading state, or you could opt to do an optimistic update which means you update the UI before the API request has succeeded (making the assumption that it will be successful).