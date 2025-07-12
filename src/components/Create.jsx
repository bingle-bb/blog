const Create = ({
  saveTitleToState,
  saveContentToState,
  savePost,
  cancelCreate,
}) => {
  return (
    <div className="container mt-5" style={{ maxWidth: "900px" }}>
      <h2 className="text-center mb-4 fw-bold">Create New Post</h2>
      <form
        onSubmit={savePost}
        style={{ backgroundColor: "#fff3cd" }}
        className="p-4 rounded"
      >
        <div className="mb-3 fw-bold">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter post title"
            onChange={saveTitleToState}
          />
        </div>
        <div className="mb-3 fw-bold">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="content"
            rows="4"
            placeholder="Enter post content"
            onChange={saveContentToState}
          ></textarea>
        </div>
        <div className="d-flex">
          <button type="submit" className="btn btn-success me-2">
            <i className="fas fa-save me-2"></i>Save Post
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={cancelCreate}
          >
            <i className="fas fa-times me-2"></i>Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
