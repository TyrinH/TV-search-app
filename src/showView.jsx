import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function showView({ shows }) {
  return (
    <Card sx={{ maxWidth: 374 }}>
      <CardContent>
        <Typography gutterBottom variant="h2" component="div">
          {shows.name}
        </Typography>
        <Typography variant="h5" color="text.secondary" align="center">
          {/* {shows.rating.average} rating */}
        </Typography>
        <CardMedia
          component="img"
          image={shows.image.original}
          alt={shows.name}
        />
        <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: shows.summary }}>
          {/* {shows.show.summary} */}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default showView;
