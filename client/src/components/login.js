import React, { useRef, useState, useEffect, useContext} from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";

const LOGIN_URL = '/login'

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
            const response = await axios.post(LOGIN_URL, JSON.stringify({user, pwd}),
            {    
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true
            }
            );
            console.log(JSON.stringify(response.data));
            const accessToken = response.data.accessToken;
            setAuth({user, pwd, accessToken})

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
                    <a href="#">Sign In</a>
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
                        <a href="#">Sign up</a>
                    </span>
                </p>
            </section>
        )}
        </>
    )
}

export default Login