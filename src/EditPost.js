import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import DataContext from "./context/dataContext";
import api from "./api/posts";
import { useHistory } from "react-router-dom";

const EditPost = () => {
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");

  const { posts, setPosts } = useContext(DataContext);

  const history = useHistory();
  const handleEdit = async (id) => {
    try {
      const editedPost = {
        title: editedTitle,
        body: editedBody,
      };
      const result = await api.put(`/posts/${id}`, editedPost);
      const updatedPosts = posts.map((post) => {
        if (post.id === id) {
          return result.data;
        }
        return post;
      });
      setPosts(updatedPosts);
      history.push("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const { id } = useParams();
  const postToEdit = posts.find((post) => post.id.toString() === id);
  useEffect(() => {
    if (postToEdit) {
      setEditedTitle(postToEdit.title);
      setEditedBody(postToEdit.body);
    }
  }, [postToEdit, setEditedTitle, setEditedBody]);
  return (
    <main className="NewPost">
      {editedTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input
              type="text"
              id="postTitle"
              required
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              required
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
            ></textarea>
            <button
              type="submit"
              onClick={() => {
                handleEdit(postToEdit.id);
              }}
            >
              Edit
            </button>
          </form>
        </>
      )}
      {!editedTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well that is unfortunate</p>
          <p>
            <Link to="/">Return to the home page</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
