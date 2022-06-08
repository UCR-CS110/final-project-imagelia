import React, { useRef, useState, useEffect} from "react";
import Cookies from "js-cookie";
import axios from "../api/axios";

const CHANGE_URL = 'http://localhost:8080/users/changeName';

const Profile = () => {
    var name = Cookies.get('displayName');
    
    const[newUser, setNewUser] = useState(name);
    const[finnish, setFinnish] = useState(name);
    const[success, setSuccess] = useState(false);


    const handleChange = async (e) => {
        setSuccess(true);
    }

    const handleSubmit= async (e) => {
        try{
            const response = await axios.post(CHANGE_URL, {newUser: newUser, userName: name});
            setFinnish(newUser);
            setSuccess(false);
        }catch(err){
            console.log("Did not connect to Server");
        }
    }

    return (
        <>
        {success ? (
            <section>
                    <input 
                        type="text"
                        id="username"
                        onChange={(e) => setNewUser(e.target.value)}
                        value={newUser}
                        required
                    />


                    <button onClick={handleSubmit}>Update Display Name</button>
            </section>
        ) : (
            <section>
                <h1>Welcome {finnish}</h1>
                <button onClick={handleChange}>Change Display Name</button>
            </section>
        )}
        </>
    )
}

export default Profile;

