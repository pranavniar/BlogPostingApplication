import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/dataContext";
import api from "./api/posts";
import { useHistory } from "react-router-dom";

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);

  const history = useHistory();
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const filteredPosts = posts.filter((post) => post.id !== id);
      setPosts(filteredPosts);
      history.push("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.date}</p>
            <p className="postBody">{post.body}</p>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Foud</h2>
            <p>Well that is unfortunate</p>
            <p>
              <Link to="/">Return to Home</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
