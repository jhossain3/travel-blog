import * as React from "react";
import {
  IconButton,
  Grid,
  Typography,
  Card,
  CardActionArea,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const backgroundImage1 =
  "https://images.pexels.com/photos/1822605/pexels-photo-1822605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

export default function Discover() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      let res = await fetch("http://localhost:3003/posts/");
      const postObj = await res.json();
      setPosts(postObj.map((e) => e));
    };

    getPosts().catch(console.error);
  }, []);

  const deletePost = async (id) => {
    console.log('delete triggered')
    await fetch(`http://localhost:3003/posts/${id}/delete`,{
      method: "POST",
      mode: 'no-cors',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.redirect("http://localhost:3000/discover");
        console.log("response", response);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
      })
      .catch(console.error);
  };

  if (posts.length === 0) {
    return (
      <Typography variant="h1" component="h2">
        There are no posts yet- why dontcha make one?
      </Typography>
    );
  }
  posts.forEach(function (entry) {
    console.log(entry);
  });

  return (
    //   posts.map((item, i) => {
    //     return <Link to={`/posts/${posts[i]._id}`}>{posts[i].destination}'s Page </Link>
    //   }
    // )

    <Grid item xs={12} sx={{ pt: "30px", mb: "10px" }}>
      <Grid container justifyContent="center" spacing={9}>
        {posts.map((item, i) => {
          return (
            <Grid key={i} item>
              <CardActionArea component={Link} to={`/posts/${posts[i]._id}`}>
                
                <Card
                  sx={{
                    minHeight: "280px",
                    minWidth: 320,
                    backgroundImage: `url(http://localhost:3003/${posts[i].picture})`,
                    backgroundSize: "cover",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography
                    color="#FFFFFF"
                    variant="h4"
                    sx={{ fontWeight: "bold", mb: 1, ml: 1 }}
                  >
                    {posts[i].destination}
                  </Typography>
                  <Typography color="#FFFFFF" sx={{ mb: 1, ml: 1 }}>
                    {" "}
                    {posts[i].author.name}
                  </Typography>
                  <Grid sx={{ color: "#FFFFFF", mb: "2", mt: "5" }}>
                    <IconButton
                      component={Link}
                      to={`/posts/${posts[i]._id}/edit`}
                      sx={{ color: "white" , padding:0, mb: 1,ml:1}}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                     onClick={event => {
                      event.stopPropagation();
                      event.preventDefault();
                      deletePost(posts[i]._id)
                      
                    }}
                      sx={{ color: "white" , padding:0, mb: 1, ml:1}}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Card>
              </CardActionArea>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
