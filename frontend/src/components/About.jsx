import { Link } from 'react-router-dom';

const About = () => (
  <section className="max-w-2xl mx-auto text-center mt-20 px-4">
    <h2 className="text-2xl font-bold mb-4">About HappyThoughts</h2>
    <p className="mb-8">
        Good vibes only! HappyThoughts is the internet’s happiest corner! 
        Jump in to post and like your favorites, or cruise through as a guest to see what’s making the world smile today.
    </p>
    <Link 
      to='/' 
      className="inline-block text-base underline text-red-400 hover:text-black"
    >
      ← Back to the homepage
    </Link>
  </section>
);

export default About;