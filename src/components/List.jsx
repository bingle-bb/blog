// React core hooks
import { useState, useEffect } from "react";

// Import the form component for creating new posts
import Create from "./Create";

// Import the individual post component to display each row
import Post from "./Post";

// Import the form component for editing posts
import Edit from "./Edit";

const List = () => {
  // State to track post title input
  const [title, setTitle] = useState("");

  // State to track post content input
  const [content, setContent] = useState("");

  // Main post data list
  const [posts, setPosts] = useState([
    { id: 1, title: "Post 1", content: "Content 1" },
    { id: 2, title: "Post 2", content: "Content 2" },
  ]);

  // Whether we're currently in create mode
  const [isCreate, setIsCreate] = useState(false);

  // Whether we're currently in edit mode
  const [isEdit, setIsEdit] = useState(false);

  // ID of the post currently being edited
  const [editId, setEditId] = useState(null);

  // Logs every time the posts array changes (for debugging)
  useEffect(() => console.log(posts), [posts]);

  // Toggle between show/hide create form
  const toggleCreate = () => setIsCreate(!isCreate);

  // Toggle between show/hide edit form
  const toggleEdit = () => setIsEdit(!isEdit);

  // Start editing a post by ID
  const editPost = (id) => {
    setEditId(id);
    toggleEdit();
  };

  // 🔥 Delete post with confirmation
  const deletePost = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const filtered = posts.filter((post) => post.id !== id);
      setPosts(filtered);
    }
  };

  // Store title input in state
  const saveTitleToState = (e) => setTitle(e.target.value);

  // Store content input in state
  const saveContentToState = (e) => setContent(e.target.value);

  // Create new post and add it to the list
  const savePost = (e) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "") {
      alert("Title and Content cannot be empty");
      return;
    }

    const id = posts.length + 1;
    setPosts([...posts, { id, title, content }]);

    // Reset form
    setTitle("");
    setContent("");
    toggleCreate();
  };

  // Save the updated post during editing
  const updatePost = (e) => {
    e.preventDefault();

    const updatedPosts = posts.map((post) =>
      post.id === editId
        ? {
            ...post,
            title: title || post.title,
            content: content || post.content,
          }
        : post
    );

    setPosts(updatedPosts);
    toggleEdit();
    setTitle("");
    setContent("");
  };

  const cancelEdit = () => {
    setIsEdit(false);
    setTitle("");
    setContent("");
  };
  // ==========================
  // RENDERING BASED ON STATE
  // ==========================

  // Show Create Form
  if (isCreate) {
    return (
      <Create
        saveTitleToState={saveTitleToState}
        saveContentToState={saveContentToState}
        savePost={savePost}
        cancelCreate={toggleCreate}
      />
    );
  }

  // Show Edit Form
  if (isEdit) {
    const post = posts.find((p) => p.id === editId);
    return (
      <Edit
        title={post.title}
        content={post.content}
        saveTitleToState={saveTitleToState}
        saveContentToState={saveContentToState}
        updatePost={updatePost}
        cancelEdit={cancelEdit}
      />
    );
  }

  // Show Main Listing Page
  return (
    <>
      <h1 className="text-center mt-5 mb-4 fw-bold">Blog Posts</h1>

      <div className="container" style={{ maxWidth: "900px" }}>
        <div className="table-responsive">
          <table className="table table-warning text-center ">
            <thead>
              <tr style={{ height: "60px" }}>
                <th>#</th>
                <th>Title</th>
                <th>Content</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  editPost={editPost}
                  deletePost={deletePost}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-3">
          <button className="btn btn-warning fw-bold" onClick={toggleCreate}>
            <i className="fas fa-plus me-1"></i> Create New Post
          </button>
        </div>
      </div>
    </>
  );
};

export default List;
