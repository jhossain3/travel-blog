import React, { useState, useEffect } from "react";
import {
  Link,
  useParams,
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { Button, Grid, CardMedia, Typography, Box } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';



export default function TravelPost({ match }) {
  const [post, setPost] = useState({author: {id:'', name:'', email:''}, pictures: '', dateNow:'', checkIn: '',flightHours: '', groupSize: '', checkOut: '', destination:'', _id:'', summary: ''});
  
  const { id } = useParams();
  console.log(id);

  const travelImage =
    "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8amFwYW58ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60";

  useEffect(() => {
    const getPostById = async () => {
      let res = await fetch(`http://localhost:3003/posts/${id}`);
      const postObj = await res.json();
      setPost({...post, ...postObj});
    
    };
    getPostById().catch(console.error);
  },[]);
  console.log(post);

    
  return (
  
    <Grid container justifyContent="center" sx={{ mt: "50px", mb: "10px" }}>
      <Grid item xs={8}>
        <CardMedia
          sx={{
            height: "500px",
            width: "100%",
            backgroundImage: `url(${travelImage})`,
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
        ></CardMedia>
        <Typography variant="h3" sx={{ mt: "20px" }}>
         {post.destination}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
         {post.dateNow} by {post.author.name}
        </Typography>

        <Typography sx={{ mt: "20px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida
          neque convallis a cras semper auctor neque. Scelerisque fermentum dui
          faucibus in ornare quam viverra. Cursus sit amet dictum sit amet justo
          donec enim. Nam aliquam sem et tortor consequat id. Libero enim sed
          faucibus turpis in eu. Diam ut venenatis tellus in metus vulputate. Eu
          feugiat pretium nibh ipsum consequat nisl vel pretium. Commodo
          ullamcorper a lacus vestibulum sed. Aliquam id diam maecenas
          ultricies. Donec adipiscing tristique risus nec feugiat in fermentum
          posuere urna. Ut aliquam purus sit amet luctus. Metus vulputate eu
          scelerisque felis imperdiet proin. Magnis dis parturient montes
          nascetur. In pellentesque massa placerat duis ultricies lacus sed
          turpis tincidunt. Ultrices vitae auctor eu augue ut lectus arcu
          bibendum at. Commodo nulla facilisi nullam vehicula ipsum a arcu. Sit
          amet luctus venenatis lectus magna fringilla. Nunc scelerisque viverra
          mauris in aliquam sem fringilla ut morbi. Sed libero enim sed faucibus
          turpis. Eget duis at tellus at urna condimentum mattis. A lacus
          vestibulum sed arcu non. Ut enim blandit volutpat maecenas volutpat.
          Justo donec enim diam vulputate ut pharetra. Sollicitudin tempor id eu
          nisl nunc mi. Nullam eget felis eget nunc lobortis mattis aliquam
          faucibus purus. Pellentesque elit eget gravida cum. Lectus proin nibh
          nisl condimentum id venenatis a condimentum.
        </Typography>
        <Grid
          container
          sx={{ mt: "50px", display: "flex", justifyContent: "space-between" }}
        >
          <Box
            item
            key={1}
            sx={{
              display: "flex",
              alignItems: "center",
              width: 200,
              height: 200,
              
            }}
          >
            <FlightIcon sx={{ fontSize: "70px" }} />
            <Typography variant ="h5" sx={{ ml: "20px" }}>4 hrs</Typography>
          </Box>
          <Box
            item container
            key={2}
            sx={{
              display: "flex",
              alignItems: "center",
              width: 200,
              height: 200,
              
              
            }}
          >
            <PersonIcon sx={{ fontSize: "70px" }} />
            <Typography variant ="h5" sx={{ wordWrap: "break-word", ml: "20px" }}>5+</Typography>
          </Box>
          <Box
            item
            key={3}
            sx={{
              display: "flex",
              alignItems: "center",
              width: 200,
              height: 200,
             
              
            }}
          >
            <CalendarTodayIcon sx={{ fontSize: "70px" }} />
            <Typography  sx={{ ml: "20px", fontSize: '15px'}}>{post.dates}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
