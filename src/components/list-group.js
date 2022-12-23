const ListGroup = ({ items, onCatagoryChange, selectedCatagory }) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item._id}
          className={
            item.name === selectedCatagory.name
              ? "list-group-item active cursor-pointer"
              : "list-group-item cursor-pointer"
          }
          onClick={() => {
            onCatagoryChange(item);
          }}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
