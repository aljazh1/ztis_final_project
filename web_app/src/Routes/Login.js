import {Button, Container, Form} from "react-bootstrap";
import axios from "axios";
import {useState} from "react";
import {sha256} from "js-sha256";
import {Alert} from "react-bootstrap";
import {goTo} from "react-chrome-extension-router";
import home from "./Home";
import { useNavigate } from "react-router-dom";


// prijava uporabnika
function Login() {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const form = new URLSearchParams();

        const sendLogin = e => {
        var hashedPass = sha256(password);

        form.append('username', username);
        form.append('password', password);

        //uporaba axiosa za pošiljanje zahtev na strežnik (endpoint)
        //form se pošlje na pot url (potrebno dodati
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/api/v1/login",
            data: form
        })
            .then((response) => {
                const res = response.data
                if (res.error) {
                    setError(res.error);
                    setIsError(true);
                } else {
                    localStorage.setItem("userId", res["$oid"]);
                    navigate("/");
                    window.location.reload(false);
                }
            }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
    }

    return (
        <div className="Login">
            <Container>
                <h1>Prijava</h1>
                <Form onSubmit={sendLogin} className={"mt-4"}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Uporabniško ime</Form.Label>
                        <Form.Control type="text" placeholder="Vnesi uporabniško ime" id={"username"} value={username}
                                      onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Geslo</Form.Label>
                        <Form.Control type="password" placeholder="Vnesi geslo" id={"password"} value={password}
                                      onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button onClick={sendLogin} className={"mb-3"} variant={"outline-primary"}>Prijava</Button>
                    {isError &&
                        <Alert variant={"danger"}>
                            {error}
                        </Alert>
                    }
                </Form>
            </Container>
        </div>
    );
}

export default Login;
