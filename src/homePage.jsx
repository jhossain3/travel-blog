import React, { useRef, useEffect } from 'react';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { CardMedia } from "@mui/material";
import image from "./static/media/pexels-tom-fisk-2169880-3840x2160-30fps.mp4";

const useStyles = makeStyles({
  container: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    paddingLeft:'20px',
    paddingRight:'20px',
  },
  video: {
    width: 'calc(100% - 40px)', // Adjust the value to subtract twice the padding value
    height: 'calc(100% - 40px)', // Adjust the value to subtract twice the padding value
    objectFit: 'cover',
    objectPosition: "50% 50%",
    borderRadius:30,
  },
});

export default function Home() {
  const classes = useStyles();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

return (
  <div className={classes.container}>
    <video ref={videoRef} className={classes.video} autoPlay muted loop>
      <source src={image} type="video/mp4" />
    </video>
    {/* Add other content or components on top of the video if desired */}
  </div>
);
}
// export default function Home() {
//   return (
//     <>
//       <Grid container spacing={10} p={5}>
//         <Grid item md={12}>
//           <CardMedia
//             component="video"
//             image={image}
//             autoPlay
//             alt="imagine a beautiful picture here"
//             sx={{
//               height: "700px",
//               width: "100%",
//               objectFit: "cover",
//               objectPosition: "50% 50%",
//               borderRadius: 5,
//             }}
//           />
//         </Grid>
//       </Grid>
//     </>
//   );
// }
