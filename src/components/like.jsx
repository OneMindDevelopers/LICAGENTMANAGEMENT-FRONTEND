const Like = ({ isLike, handleLike }) => {
let classes = "cursor-pointer fa fa-thumbs-";
classes += isLike ? "up" : "o-up";
  return <i className={classes} onClick={handleLike}></i>;
};

export default Like;
