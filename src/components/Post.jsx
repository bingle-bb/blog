const Post = ({ id, title, content, editPost, deletePost }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{content}</td>
      <td>
        <button
          className="btn btn-sm btn-warning me-2"
          onClick={() => editPost(id)}
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => deletePost(id)}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  );
};

export default Post;
