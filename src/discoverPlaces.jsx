import * as React from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';

const backgroundImage1 =
  "https://images.pexels.com/photos/1822605/pexels-photo-1822605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
const backgroundImage2 =
  "https://images.pexels.com/photos/189833/pexels-photo-189833.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
const backgroundImage3 =
  "https://media.istockphoto.com/photos/little-venice-in-london-picture-id537442158?b=1&k=20&m=537442158&s=170667a&w=0&h=yhR_V8iz4Gt1tqOXVEsUzmdfXGC93IEY_FDTQncycxU=";
const backgroundImage4 =
  "https://media.istockphoto.com/photos/taj-majal-at-sunrise-in-agra-india-picture-id1152168512?b=1&k=20&m=1152168512&s=170667a&w=0&h=jgavCl08Do83a-8CYEwyxEFD2fbywNaEOOv30E6Uz-Y=";
  const backgroundImage5 =
  "https://media.istockphoto.com/photos/ancient-temples-and-turquoise-sea-of-cyprus-island-picture-id960357502?s=612x612";
  const backgroundImage6=
  "https://images.pexels.com/photos/1647064/pexels-photo-1647064.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
  const backgroundImage7=
  "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
  const backgroundImage8 =
  "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
  const backgroundImage9 =
  "https://images.pexels.com/photos/235731/pexels-photo-235731.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
export default function Discover() {
  return (
    <Grid item xs={12} sx={{ pt: "30px", mb: "10px" }}>
      <Grid container justifyContent="center" spacing={9}>
        <Grid key={0} item>
          <Button
            component={Link} to="/japan"
            sx={{
              height: 220,
              width: 400,
              backgroundImage: `url(${backgroundImage1})`,
              backgroundSize: "cover",
            }}
          />
        </Grid>
        <Grid key={1} item>
          <Button
            sx={{
              height: 220,
              width: 400,
              backgroundImage: `url(${backgroundImage2})`,
              backgroundSize: "cover",
            }}
          />
        </Grid>
        <Grid key={2} item>
          <Button
            sx={{
              height: 220,
              width: 400,
              backgroundImage: `url(${backgroundImage3})`,
              backgroundSize: "cover",
            }}
          />
        </Grid>
        <Grid key={3} item>
          <Button
            sx={{
              height: 220,
              width: 400,
              backgroundImage: `url(${backgroundImage4})`,
              backgroundSize: "cover",
            }}
          />
        </Grid>
        <Grid key={4} item>
          <Button
            sx={{
              height: 220,
              width: 400,
              backgroundImage: `url(${backgroundImage5})`,
              backgroundSize: "cover",
            }}
          />
        </Grid>
        <Grid key={5} item>
          <Button
            sx={{
              height: 220,
              width: 400,
              backgroundImage: `url(${backgroundImage6})`,
              backgroundSize: "cover",
            }}
          />
        </Grid>
        <Grid key={6} item>
          <Button
            sx={{
              height: 220,
              width: 400,
              backgroundImage: `url(${backgroundImage7})`,
              backgroundSize: "cover",
            }}
          />
        </Grid>
        <Grid key={7} item>
          <Button
            sx={{
              height: 220,
              width: 400,
              backgroundImage: `url(${backgroundImage8})`,
              backgroundSize: "cover",
            }}
          />
        </Grid>
        <Grid key={8} item>
          <Button
            sx={{
              height: 220,
              width: 400,
              backgroundImage: `url(${backgroundImage9})`,
              backgroundSize: "cover",
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
