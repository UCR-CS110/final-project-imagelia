import React, { useRef, useState, useEffect, useContext} from "react";
import Cookies from 'js-cookie';

const profile = () => {
    let name = Cookies.get('name');

    const[newUser, setNewUser] = useState('');
  
    return (
        <div>Profile</div>
    )
}

export default profile

