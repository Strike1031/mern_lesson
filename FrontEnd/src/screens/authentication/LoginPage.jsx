import React, { useState,} from "react";
import Loading from "../../components/loading";
import axios from "axios";

export default function LoginPage(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    async function userLogin(e) {
        e.preventDefault();
        if(username === "") {
            return alert("Please type the user name");
        }
        else if(username.length > 255) {
            return alert("User's name has maximum 255 characters");
        }

        if(password === "") {
            return alert("Please type the password");
        }
        else if(password.length > 255) {
            return alert("User's password has maximum 255 characters");
        }

        setLoading(true);
        if (loading) return;
        // setTimeout(() => {
        //     setLoading(false);
        // }, 3000);
        /**
         *          Fetch Example
         */

        // const requestOptions = {
        // mode: 'no-cors' as RequestMode,  // Used in only typescript
        // method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ "username": name, "password": password })
        // };
        // fetch('http://localhost:5000/auth/login', requestOptions)
        //     .then(response => response.json())
        //     .then(data => setApiData({ postId: data.id }));
        // }

        /**
         *          AXIOS  Example
         */
        const info = { "username": username, "password": password };
        const headers = { 
            // 'Authorization': 'Bearer my-token',
            // 'My-Custom-Header': 'foobar',
            'Content-Type': 'applicaton/json',
            'Access-Control-Allow-Origin': '*'
        };
        await axios.post('http://localhost:5000/auth/login', info, { headers })
            .then(response => {
                if (response.data === "Okay") {
                    setLoading(false);
                    return alert("Login success");
                }
                else
                {
                    return alert("Username or Password is incorrect");
                }      
            })
            .catch(error => {
                console.error('Post auth login error', error);
                setLoading(false);
                return alert("Post Auth Login Error");
            });

    }

    return (
        <div>
            {loading && <Loading />}
            <div className="login-panel">
                <form>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" onChange={handleUsernameChange} value={username} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={handlePasswordChange} value={password} />
                    </div>
                    <div className="form-group">
                        <button onClick={userLogin}>Login</button>  
                    </div>
                </form>
            </div>
        </div>
    );
}