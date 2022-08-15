import React, { useState,} from "react";
import Loading from "../../components/loading";

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

    const userLogin = (e) => {
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
        setTimeout(() => {
            setLoading(false);
        }, 3000);


        
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