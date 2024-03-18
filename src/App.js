import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { Route, Switch, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { format, set } from "date-fns";
import api from "./api/posts";
import EditPost from "./EditPost";
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";

//This is the main App component
function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResuls, setSearchResults] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");
  const history = useHistory();
  const { width } = useWindowSize();
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
    <div className="App">
      <Header title="Post Your Blogs!" width={width} />
      <Nav search={search} setSearch={setSearch} />
      <Switch>
        <Route exact path="/">
          <Home
            posts={searchResuls}
            fetchError={fetchError}
            loading={loading}
          />
        </Route>
        <Route exact path="/post">
          <NewPost
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
            handleSubmit={handleSubmit}
          />
        </Route>
        <Route exact path="/edit/:id">
          <EditPost
            posts={posts}
            editedTitle={editedTitle}
            setEditedTitle={setEditedTitle}
            editedBody={editedBody}
            setEditedBody={setEditedBody}
            handleEdit={handleEdit}
          />
        </Route>
        <Route path="/post/:id">
          <PostPage posts={posts} handleDelete={handleDelete} />
        </Route>
        <Route path="/about" component={About} />
        <Route path="/*" component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
