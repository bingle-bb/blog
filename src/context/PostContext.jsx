import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    { id: 1, title: "Post 1", content: "Content 1" },
    { id: 2, title: "Post 2", content: "Content 2" },
  ]);
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [language, setLanguage] = useState("en"); // "en" or "my"
  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "en" ? "my" : "en"));

  const renumberPosts = (postList) =>
    postList.map((post, index) => ({ ...post, id: index + 1 }));

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        isCreate,
        setIsCreate,
        isEdit,
        setIsEdit,
        editId,
        setEditId,
        renumberPosts,
        language,
        toggleLanguage,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
