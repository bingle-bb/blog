// React core hooks
import { useState, useEffect } from "react";

// Import the form component for creating new posts
import Create from "./Create";

// Import the individual post component to display each row
import Post from "./Post";

// Import the form component for editing posts
import Edit from "./Edit";

const List = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [posts, setPosts] = useState([
    { id: 1, title: "Post 1", content: "Content 1" },
    { id: 2, title: "Post 2", content: "Content 2" },
  ]);

  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => console.log(posts), [posts]);

  const toggleCreate = () => setIsCreate(!isCreate);
  const toggleEdit = () => setIsEdit(!isEdit);

  const editPost = (id) => {
    const post = posts.find((p) => p.id === id);
    setEditId(id);
    setTitle(post.title);
    setContent(post.content);
    toggleEdit();
  };

  const deletePost = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const filtered = posts.filter((post) => post.id !== id);
      const renumbered = renumberPosts(filtered); // <- renumber here
      setPosts(renumbered);
    }
  };

  const renumberPosts = (postList) => {
    return postList.map((post, index) => ({
      ...post,
      id: index + 1,
    }));
  };

  const saveTitleToState = (e) => setTitle(e.target.value);
  const saveContentToState = (e) => setContent(e.target.value);

  const savePost = (e) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "") {
      alert("Title and Content cannot be empty");
      return;
    }

    const newPost = { id: 0, title, content }; // temp id
    const updatedList = [...posts, newPost];
    const renumbered = renumberPosts(updatedList); // <- renumber here
    setPosts(renumbered);

    setTitle("");
    setContent("");
    toggleCreate();
  };

  const updatePost = (e) => {
    e.preventDefault();

    const updatedPosts = posts.map((post) =>
      post.id === editId
        ? {
            ...post,
            title: title,
            content: content,
          }
        : post
    );

    setPosts(updatedPosts);
    toggleEdit();
    setTitle("");
    setContent("");
    setEditId(null);
  };

  const cancelEdit = () => {
    setIsEdit(false);
    setTitle("");
    setContent("");
    setEditId(null);
  };

  // Render Create Form
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

  // Render Edit Form
  if (isEdit) {
    const post = posts.find((p) => p.id === editId);

    if (!post) return <p>Post not found!</p>;

    return (
      <Edit
        title={title}
        content={content}
        saveTitleToState={saveTitleToState}
        saveContentToState={saveContentToState}
        updatePost={updatePost}
        cancelEdit={cancelEdit}
      />
    );
  }

  // Render Post List
  return (
    <>
      <h1 className="text-center mt-5 mb-4 fw-bold">Blog Posts</h1>

      <div className="container" style={{ maxWidth: "900px" }}>
        <div className="table-responsive">
          <table className="table table-warning text-center">
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
