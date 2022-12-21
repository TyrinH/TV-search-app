import { useState, useEffect } from "react";
import Header from "./header";
import axios from "axios";
import ShowView from "./showView";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

function App() {
  const [shows, setShows] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [lastQuery, setLastQuery] = useState("");

  useEffect(() => {
    const getShow = async () => {
      const show = await fetchShows();
      setShows(show);
    };
    getShow();
  }, [searchQuery]);
  const fetchShows = async () => {
    if (!searchQuery) {
      console.log(
        "retrieving last searched item from local storage",
        localStorage.getItem("lastQuery")
      );
      setSearchQuery(localStorage.getItem("lastQuery"));
    }
    const config = { params: { q: searchQuery.toUpperCase() } };
    const cachedShow = localStorage.getItem(`${config.params.q}`);
    if (cachedShow) {
      const data = JSON.parse(localStorage.getItem(`${config.params.q}`));
      localStorage.setItem(`lastQuery`, `${data.show.name.toUpperCase()}`);
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
      localStorage.setItem(`lastQuery`, `${data.show.name.toUpperCase()}`);
      return data;
    }
  };

  return (
    <div className="App">
      <Header setSearchQuery={setSearchQuery} />
      <Grid container xs={12} justifyContent="center" alignItems="center">
        <Card>
          {shows.show ? <ShowView shows={shows} /> : <div>loading...</div>}
        </Card>
      </Grid>
    </div>
  );
}

export default App;
