import { useParams, Link } from "react-router-dom";

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  console.log(post);
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
