const Edit = ({
  updatePost,
  title,
  content,
  saveTitleToState,
  saveContentToState,
  cancelEdit, //
}) => {
  return (
    <div className="container mt-5" style={{ maxWidth: "900px" }}>
      <h2 className="text-center mb-4 fw-bold">Edit Post</h2>
      <form
        onSubmit={updatePost}
        className="p-4 rounded"
        style={{ backgroundColor: "#fff3cd" }}
      >
        <div className="mb-3 fw-bold">
          <label htmlFor="edit-title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="edit-title"
            className="form-control"
            placeholder="Enter new title"
            defaultValue={title}
            onChange={saveTitleToState}
          />
        </div>

        <div className="mb-3 fw-bold">
          <label htmlFor="edit-content" className="form-label">
            Content
          </label>
          <textarea
            id="edit-content"
            className="form-control"
            placeholder="Enter updated content"
            rows="4"
            defaultValue={content}
            onChange={saveContentToState}
          ></textarea>
        </div>

        <div className="d-flex justify-content-start">
          <button type="submit" className="btn btn-success me-2">
            <i className="fas fa-edit me-2"></i>Update Post
          </button>
          <button
            type="button"
            className="btn btn-danger fw-bold"
            onClick={cancelEdit} //
          >
            <i className="fas fa-times me-2"></i>Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
