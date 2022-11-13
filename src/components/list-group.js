const ListGroup = ({ items, handleGenreChange, currentGenre }) => {
    return (
        <ul className="list-group">
            {items.map(item => <li key={item._id} className={item.name === currentGenre.name ? "list-group-item active cursor-pointer" : "list-group-item cursor-pointer"} onClick={() => { handleGenreChange(item) }}>{item.name}</li>)}
        </ul>
    );
}

export default ListGroup;