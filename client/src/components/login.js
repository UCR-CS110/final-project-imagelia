import React, { useRef, useState, useEffect, useContext} from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";

const LOGIN_URL = 'http://localhost:8080/users/login';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    
    const[user, setUser] = useState('');
    const[pwd, setPwd] = useState('');
    const[errMsg, setErrMsg] = useState('');
    const[success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // can change to JSON.stringify({username: user, password: pwd})
            const response = await axios.post(LOGIN_URL, {user, password: pwd})
            
            console.log(JSON.stringify(response.data));
            if( response.data.success ){
                //TODO make cookies or do whatever this is
                // or localStorage
                const accessToken = response.data.accessToken;
                setAuth({user, pwd, accessToken})
                
            } 
            else {
                //TODO error you no exist yo!
            }
            
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err){
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