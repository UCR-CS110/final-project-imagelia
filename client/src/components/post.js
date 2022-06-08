import React, {useState} from "react";
// import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { CardActionArea, CardContent, Typography, Input } from "@mui/material";
// import {  } from "@mui/material";
// import {  } from "@mui/material";
// import {  } from "@mui/material";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './post.css'
import axios from "../api/axios";
import { useNavigate } from 'react-router-dom';


function Post() {
  const [file, setFile] = useState('');
  const [title, setTitle] = useState('');
  const [tempImage, setImage] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    let url = URL.createObjectURL(e.target.files[0]);
    setImage(url)
    setFile(e.target.files[0])
  }

  function submit(e){
    e.preventDefault();

    const formData = new FormData();
    formData.append( 'title', title );
    formData.append( 'image', file );
    axios.post("http://localhost:8080/posts/post", formData, { headers: {
        "Content-Type": "multipart/form-data",
    } } ).then(res => {
        if( res.data.success ){
            navigate( "/home" );
        }
    });
  }

  return (
    <form      
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      enctype="multipart/form-data"
      onSubmit={submit}>


    <div className='divForm'>
        <h2 style={{ margin: 8 }}>Upload an Image</h2>
        <TextField
            id="standard-basic"
            label="Text"
            placeholder="Enter Text For Image"
            name="title"
            onChange={event => setTitle(event.target.value)}
        />

        <Input name="image" accept="image/*" id="contained-button-file" type="file" onChange={ handleChange}/>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            type="submit"
            >
        <ArrowUpwardIcon />
        </IconButton>
        {
            tempImage.length > 0 &&

            <Card sx={{ maxWidth: 200 }}>
                <CardActionArea>
                    <img alt={title} src={tempImage} width="200px"/>
                </CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="span" component="span" >{title}</Typography>
                </CardContent>
            </Card>
        }
    </div>
  </form>
  )
}

export default Post
