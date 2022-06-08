import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

// import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
import HomeIcon from '@mui/icons-material/Home';


export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(false);
//   const [anchorEl, setAnchorEl] = React.useState(null);
    React.useEffect(()=>{
        if( localStorage.getItem( 'isLoggedin' ) === 'true' ){
            setAuth( true );
        }else{
            setAuth( false );
        }
    },[])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="/home"
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Imagelia
          </Typography>
          
          { auth && (
              <>
                <Button href="/post">Post</Button>
                <div>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    href="/profile"
                >
                    <AccountCircle />
                </IconButton>
                </div>
            </>
          ) }
          { !auth && (
            <div>
                <Typography variant="h6"  component="div" sx={{ flexGrow: 1 }}>
                    <a href="/login" className='noDecoLink'>Login</a>
                    <a href="/register" className='noDecoLink'>Sign Up</a>
                </Typography>
            </div>
          ) }
        </Toolbar>
      </AppBar>
    </Box>
  );
}