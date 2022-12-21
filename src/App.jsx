import { useState, useEffect } from "react";
import Header from "./header";
import axios from "axios";
import ShowView from "./showView";

function App() {
  const [shows, setShows] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [lastQuery, setLastQuery] = useState("");

  useEffect(() => {
    console.log("useEffect");
    const getShow = async () => {
      const show = await fetchShows();
      console.log(show, "from getShow");
      setShows(show);
    };
    getShow();
  }, [searchQuery]);
  const fetchShows = async () => {
    if (!searchQuery) {
      console.log("retrieving last searched item from local storage", localStorage.getItem('lastQuery'));
      setSearchQuery(localStorage.getItem('lastQuery'))
    }
    const config = { params: { q: searchQuery.toUpperCase() } };
    const cachedShow = localStorage.getItem(`${config.params.q}`);
    if (cachedShow) {
      console.log("from local storage");
      const data = JSON.parse(localStorage.getItem(`${config.params.q}`));
      console.log(data, "from local storage");
      localStorage.setItem(
        `lastQuery`,
        `${data.show.name.toUpperCase()}`
      );
      return data;
    } else {
      const res = await axios.get(
        "https://api.tvmaze.com/search/shows",
        config
      );
      const data = await res.data[0];
      localStorage.setItem(
        `${data.show.name.toUpperCase()}`,
        JSON.stringify(data)
      );
      localStorage.setItem(
        `lastQuery`,
        `${data.show.name.toUpperCase()}`
      );

      console.log(data, "from api");
      return data;
    }
  };

  return (
    <div className="App">
      <Header setSearchQuery={setSearchQuery} />
      {shows.show ? <ShowView shows={shows} /> : <div>loading...</div>}
    </div>
  );
}

export default App;
