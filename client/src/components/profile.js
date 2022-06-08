import React, {useState} from "react";

const profile = () => {
    const[newUser, setNewUser] = useState('');
    const[success, setSuccess] = useState(false);

    var name = JSON.parse(localStorage.getItem('user'));

    const handleChange = async (e) => {
        setSuccess(true);
    }

    const handleSubmit= async (e) => {
        name = newUser;
        console.log(name)
        setSuccess(false);
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
                <h1>Welcome {name}</h1>
                <button onClick={handleChange}>Change Display Name</button>
            </section>
        )}
        </>
    )
}

export default profile

