import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { FaStar } from "react-icons/fa";


function showDetails({ shows }) {
  console.log(shows);
  return (
    <Card variant="outlined" sx={{ maxWidth: 374 }}>
      <CardContent >
        {shows.rating.average ? (
          <Typography gutterBottom variant="h5" component="div">
            <FaStar color="yellow"/> {shows.rating.average}/10
          </Typography>
        ) : (
          ""
        )}
        <Typography variant="h5">Genres:</Typography>
        <Typography variant="body2" component="div">
          {shows.genres.map((genre, index) => (
            <div key={index}>{genre}</div>
          ))}
        </Typography>
        <Typography variant="h5">Language:</Typography>
        <Typography variant="body2" component="div">
            {shows.language}
        </Typography>
        <Typography variant="h5">Premiered:</Typography>
        <Typography variant="body2" component="div">
            {shows.premiered}
        </Typography>
        <Typography variant="h5">Ended:</Typography>
        {shows.ended !== null ? <div>
        <Typography variant="body2" component="div">
            {shows.ended}
        </Typography>
        </div> : ''}
      </CardContent>
      <CardActions>
        {shows.officialSite ? (
          <Button size="small" href={shows.officialSite}>
            Official site{" "}
          </Button>
        ) : (
          ""
        )}
      </CardActions>
    </Card>
  );
}

export default showDetails;
