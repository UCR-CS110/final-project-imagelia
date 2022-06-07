import React, {useState} from "react";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './post.css'


function Post() {
  const [file, setFile] = useState('');
  const [title, setTitle] = useState('');

  function handleChange(e) {
    let url = URL.createObjectURL(e.target.files[0]);
    setFile(url)
    console.log(url)
  }

  function submit(e){
    console.log("submit");
  }

  return (
    <Box      
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      enctype="multipart/form-data">


      <div className='divForm'>
        <h1 style={{ margin: 8 }}>Upload an Image</h1>
          <TextField
              id="standard-basic"
              label="Text"
              placeholder="Enter Text For Image"
              name="title"
              onChange={event => setTitle(event.target.value)}
          />

          <TextField
              id="outlined-full-width"
              style={{ margin: 8 }}
              name="image"
              type="file"
              onChange={ handleChange}
          />
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={submit}
          >
            <ArrowUpwardIcon />
          </IconButton>
          {
          file.length > 0 &&

          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Temp Pic"
                height="640"
                width="480"
                image={file}
                title="Temp Pic"
              />
            </CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">{title}</Typography>
            </CardContent>
          </Card>
          }
        </div>
  </Box>
  )
}

export default Post
