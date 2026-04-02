import ThoughtCard from './ThoughtCard';

function ThoughtList({thoughts = [], onLike, onEdit, onDelete, currentUserId }) {

    return (
            <section className="max-w-md min-[900px]:flex-wrap min-[900px]:justify-center">
                {thoughts.map((thought) => (
                    <ThoughtCard
                    key={thought._id}
                    thought={thought}
                    onLike={onLike}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    currentUserId={currentUserId} />
                ))}
            </section>
    );
};

export default ThoughtList;