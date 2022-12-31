import { useState, useEffect } from "react";
import Header from "./header";
import axios from "axios";
import ShowView from "./showView";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/Grid";

function App() {
  const [shows, setShows] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [lastQuery, setLastQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getShow = async () => {
      const show = await fetchShows();
      setShows(show);
      setLoading(false);
    };
    getShow();
  }, [searchQuery]);
  const fetchShows = async () => {
    if (searchQuery === '') {
      console.log(
        "retrieving last searched item from local storage:",
        `"${localStorage.getItem("lastQuery")}"`
      );
      setSearchQuery(localStorage.getItem("lastQuery"));
    }
    const config = { params: { q: searchQuery.toUpperCase() } };
    const cachedShow = localStorage.getItem(`${"lastQuery"}`);
    console.log("cachedShow", cachedShow, searchQuery.toUpperCase())
    if (cachedShow === searchQuery.toUpperCase() || searchQuery === "") {
      console.log("retrieving from local storage", cachedShow)
      const data = JSON.parse(localStorage.getItem(`${cachedShow}`));
      localStorage.setItem(`lastQuery`, `${data.name.toUpperCase()}`);
      return data;
    } else {
      console.log("retrieving from api", config)
      const res = await axios.get(
        "https://api.tvmaze.com/singlesearch/shows",
        config
      );
      const data = await res.data;
      localStorage.setItem(
        `${data.name.toUpperCase()}`,
        JSON.stringify(data)
      );
      localStorage.setItem(`lastQuery`, `${data.name.toUpperCase()}`);
      return data;
    }
  };

  return (
    <div className="App">
      <Header setSearchQuery={setSearchQuery} />
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <Item>
        <Card>
          { loading === false ? <ShowView shows={shows}  /> : <div>loading...</div> }
        </Card>
        </Item>
      </Grid>
    </div>
  );
}

export default App;
