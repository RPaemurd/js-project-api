import ThoughtCard from './ThoughtCard';

function ThoughtList({thoughts = [], onLike }) {
 
    return (
            <section className="max-w-md min-[900px]:flex-wrap min-[900px]:justify-center">
                {thoughts.map((thought) => (
                    <ThoughtCard 
                    key={thought._id} 
                    thought={thought}
                    onLike={onLike} />
                ))}
            </section>
    );
};

export default ThoughtList;