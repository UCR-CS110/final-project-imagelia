import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
//import { useSearchParams } from "react-router-dom";
import { Avatar } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import './comments.css'
import axios from "../api/axios";
import { useNavigate } from 'react-router-dom';

const Comments = () => {
    const [auth, setAuth] = useState( false );
    const [post, setPost] = useState( {
        id: "",
        user: "",
        title: "",
        created: "",
        comments: [],
        img: ""
    } );

    const { postId } = useParams()
    const [ready, setReady] = useState( false );
    const [commentText, setCommentText] = useState( '' );
    const navigate = useNavigate();

    //let [searchParams, setSearchParams] = useSearchParams();
    useEffect(()=>{
      console.log('After post' ,post);
      setReady( true );
      console.log( ready );
    }, [post])
    useEffect(() => {
          fetch(`http://localhost:8080/posts/${postId}/getPost`).then(r => r.json()).then( d => {
            setPost( prevState => ({
                id: d.id,
                user: d.user,
                title: d.title,
                created: d.created,
                comments: d.comments,
                img: d.img
            }));
          });
          if( localStorage.getItem( 'isLoggedin' ) === 'true' ){
            setAuth( true );
          }else{
            setAuth( false );
          }
      }, [])

  function submit(e) {
    e.preventDefault();
    
    axios.post("http://localhost:8080/posts/addComment", { 
        token: '',
        username: "derpy", 
        comment: commentText,
        postId: post.id
    } )
    .then(res => {
      console.log( res.data );
      console.log("success")
      //navigate( `/${post.id}` );
      window.location.reload();
    
    });
  }

  return (
    <>
    { ready && (
      <>
        <div>
          <img
              src={`${post.img}?w=248&fit=crop&auto=format`}
              srcSet={`${post.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={post.title}
              loading="lazy"
            />
        </div>
        { true && (
          <form onSubmit={submit}>
            <input name="user" type="hidden" value=""></input>
            <input name="text" type="text" onChange={ (e) => setCommentText( e.target.value ) }></input>
            <input type="submit" />
          </form>
        )}
        <ul>
          {post.comments.map( (i) => (
              <li>
                  <div className='commentWrap'>
                      <div className='avatarWrap'>
                          <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                      </div>
                      <div className='commentBox'>
                          <div className='commentHeader'>
                              <h6>{i.user}</h6>
                              <span>time since</span>
                          </div>
                          <div className='commentBody'>
                          {i.text}
                          </div>
                      </div>
                  </div>
              </li>
          ) ) }
        </ul>
      </>
    ) }
    </>
  )
}

export default Comments