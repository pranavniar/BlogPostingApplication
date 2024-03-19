import { useState, useContext } from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import DataContext from "./context/dataContext";
import api from "./api/posts";

const NewPost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const { posts, setPosts, setSearch } = useContext(DataContext);

  const history = useHistory();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
      const newPost = {
        id: id,
        title: postTitle,
        datetime: format(new Date(), "MMMM dd, yyyy pp"),
        body: postBody,
      };
      const result = await api.post("/posts", newPost);
      setPosts([...posts, result.data]);
      setPostTitle("");
      setPostBody("");
      setSearch("");
      history.push("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
