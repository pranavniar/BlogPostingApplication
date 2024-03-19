import Feed from "./Feed";
import { useContext } from "react";
import DataContext from "./context/dataContext";

const Home = () => {
  const { searchResults, fetchError, loading } = useContext(DataContext);
  return (
    <main className="Home">
      {loading && <p className="statusMsg">Loading posts...</p>}
      {!loading && fetchError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchError}
        </p>
      )}
      {!loading && !fetchError && searchResults.length && (
        <Feed posts={searchResults} />
      )}
      {!loading && !fetchError && !searchResults.length && (
        <p className="statusMsg" style={{ marginTop: "2rem" }}>
          No posts to display
        </p>
      )}
    </main>
  );
};

export default Home;
