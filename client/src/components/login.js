import React, { useRef, useState, useEffect} from "react";
// import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import GoogleLogin from 'react-google-login'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const LOGIN_URL = 'http://localhost:8080/users/login';

const Login = () => {
    // const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    
    const[user, setUser] = useState('');
    const[pwd, setPwd] = useState('Password1!');
    const[errMsg, setErrMsg] = useState('');
    const[success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleLogin = async (googleData) => {
        const res = await fetch('/api/google-login', {
          method: 'POST',
          body: JSON.stringify({
            token: googleData.tokenId,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // can change to JSON.stringify({username: user, password: pwd})
            const response = await axios.post(LOGIN_URL, {user, password: pwd})
            
            console.log(JSON.stringify(response.data));
            console.log( response.data.success );
            if( response.data.success ){
                //TODO make cookies or do whatever this is
                // or localStorage
                localStorage.setItem( "isLoggedin", true );
                // localStorage.getItem( "" )

                Cookies.set('name', 'user', {expires: 1});
                const accessToken = response.data.payload.session;
                Cookies.set( 'token', accessToken, {expires: 1} );
                
                // setAuth({user, pwd, accessToken})
                setSuccess(true);
                navigate('/home');
            } 
            else {
                //TODO error you no exist yo!
                localStorage.setItem( "isLoggedin", false );
                setErrMsg('Does not exist');
                setSuccess(false);
            }
            
            setUser('');
            setPwd('');
            
        } catch (err){
            console.log( err )
            if(!err.response){
                setErrMsg('No server response')
            }
            else{
                setErrMsg('An error occurred');
            }
            errRef.current.focus()
        }


    }
    
    return (
        <>
        {success ? (
            <section>
                <h1>Success!</h1>
                <p>
                    <a href="/home">Sign In</a>
                </p>
            </section>
        ) : (
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign in</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text"
                        id="username"
                        ref={userRef}
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button>Sign In</button>

                </form>
                <GoogleLogin
                    clientId='485873337875-uo1k50ettmv1isu7ell7esqbmmpsi47l.apps.googleusercontent.com'
                    buttonText="Log in with Google"
                    onSuccess={handleLogin}
                    cookiePolicy={'single_host_origin'}
                ></GoogleLogin>
                <p>
                    New User?<br />
                    <span className="line">
                        <a href="/register">Sign up</a>
                    </span>
                </p>
            </section>
        )}
        </>
    )
}

export default Login