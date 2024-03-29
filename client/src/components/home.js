import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import AddCommentIcon from '@mui/icons-material/AddComment';
import "bootstrap/dist/css/bootstrap.min.css";


export default function Home() {
  //const itemData = useRef();
  const [itemData, setItemData] = useState( [] );
  const [auth, setAuth] = useState( false );

  useEffect(() => {
    //window.addEventListener('load', function() {
      fetch("http://localhost:8080/posts/getPosts").then( r => r.json() ).then( d => {
        setItemData( d.payload );
      });
      if( localStorage.getItem( 'isLoggedin' ) === 'true' ){
        setAuth( true );
      }else{
        setAuth( false );
      }
  }, [])
  return (

    <ImageList>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          
          <ImageListItemBar
            title={item.title}
            subtitle={'@'+item.user}
            actionIcon={
                auth && ( <>
                  <a href={`${item.id}`}>
                    <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${item.title}`}
                    >
                        <AddCommentIcon />
                    </IconButton>
                  </a>
                  
                </> )
            }
          /> 
        </ImageListItem>
      ))}
    </ImageList>
  );
}

/*const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
];*/

//sets itemData to be an array of the posts to be used in the React HTML above.