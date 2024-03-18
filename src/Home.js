import Feed from "./Feed";

const Home = ({ posts, fetchError, loading }) => {
  return (
    <main className="Home">
      {loading && <p className="statusMsg">Loading posts...</p>}
      {!loading && fetchError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchError}
        </p>
      )}
      {!loading && !fetchError && posts.length && <Feed posts={posts} />}
      {!loading && !fetchError && !posts.length && (
        <p className="statusMsg" style={{ marginTop: "2rem" }}>
          No posts to display
        </p>
      )}
    </main>
  );
};

export default Home;
