import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function showView({ shows }) {
  console.log("PROPS", shows);
  return (
    // <div>
    <Card sx={{ maxWidth: 374 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align="center">
          {shows.show.name}
        </Typography>
        <Typography variant="h5" color="text.secondary" align="center">
          {shows.show.rating.average} rating
        </Typography>
        <CardMedia
          component="img"
          // height="194"
          image={shows.show.image.original}
          alt={shows.show.name}
        />
        {/* <img src={shows.show.image.medium} alt={shows.show.name} /> */}
        {/* </CardMedia> */}
        <Typography variant="body2" color="text.secondary">
          {shows.show.summary}
        </Typography>
      </CardContent>
    </Card>

    // </div>
  );
}

export default showView;
