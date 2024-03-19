import useAxiosFetch from "../hooks/useAxiosFetch";
import { useState, useEffect, createContext } from "react";

const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");

  const { data, loading, fetchError } = useAxiosFetch(
    "http://localhost:3500/posts"
  );
  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(results.reverse());
  }, [search, posts]);

  return (
    <DataContext.Provider
      value={{
        posts,
        setPosts,
        search,
        setSearch,
        searchResults,
        setSearchResults,
        loading,
        fetchError,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
