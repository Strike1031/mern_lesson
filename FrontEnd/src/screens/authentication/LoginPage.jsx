import React, { useState, } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Loading from "../../components/loading";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import "../../assets/css/landingPage.css";

import logo from '../../assets/images/logo.svg';
import back1 from '../../assets/images/back1.svg';
import back2 from '../../assets/images/back2.svg';

export default function LoginPage(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    // Can be a string as well. Need to ensure each key-value pair ends with ;
    const override = `
    display: block;
    margin: 0 auto;
    border-color: red;
    `;

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    async function userLogin(e) {
        e.preventDefault();
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(email);

        if (result === false) {
            return alert("Please type the correct email address");
        }

        if (email === "") {
            return alert("Please type the user name");
        }
        else if (email.length > 255) {
            return alert("User's name has maximum 255 characters");
        }

        if (password === "") {
            return alert("Please type the password");
        }
        else if (password.length > 255) {
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
        // body: JSON.stringify({ "email": name, "password": password })
        // };
        // fetch('http://localhost:5000/auth/login', requestOptions)
        //     .then(response => response.json())
        //     .then(data => setApiData({ postId: data.id }));
        // }

        /**
         *          AXIOS  Example
         */
        const info = { "email": email, "password": password };
        const headers = {
            // 'Authorization': 'Bearer my-token',
            // 'My-Custom-Header': 'foobar',
            // 'Accept': 'application/json',
            // 'Content-Type': 'applicaton/json',
            'Access-Control-Allow-Origin': '*'
        };
        await axios.post('http://localhost:5000/auth/login', info, { headers })
            .then(response => {
                if (response.data === "Okay") {
                    setLoading(false);
                    return alert("Login success");
                }
                else if (response.data === "Incorrect") {
                    setLoading(false);
                    return alert("Email and Password are incorrect");
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
            <div className="navbar py-0">
                <div className="left-pink" />
                <Container className="navbar-main">
                    <div>
                        <img src={logo} width="176px" />
                    </div>
                    <div>
                    </div>
                </Container>
            </div>
            <div className="landing-main-panel">
                <Container fluid className="px-0">
                    <Row>
                        <Col sm={6} md={6} lg={6} className="px-0">
                            <div className="left-slider">
                                <form>
                                    <div>
                                        <p className="logo-letter">Log in to Ybalah Guide!</p> 
                                        <p className="logo-letter2">No account yet? Create an account</p>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" onChange={handleEmailChange} value={email} placeholder="First Nname"/>
                                        <input type="password" onChange={handlePasswordChange} value={password} placeholder="Last Name" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" onChange={handlePasswordChange} value={password} />
                                    </div>
                                    <div className="form-group">
                                        <button onClick={userLogin} className="btn-login" disabled={loading}>
                                            <div>Login</div>
                                            <ClipLoader color="green" loading={loading} css={override} size={30} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Col>
                        <Col sm={6} md={6} lg={6} className="px-0">
                            <div className="right-slider">
                                <div className="right-slider-opacity" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}