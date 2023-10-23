import {Alert, Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import {sha256} from "js-sha256";
import Login from "./Login";
import {goTo} from "react-chrome-extension-router";
import { useNavigate } from "react-router-dom";

// registracija uporabnika
function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPass, setRepeatPass] = useState("");
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    let navigate = useNavigate();

    const form = new URLSearchParams();

    const sendRegister = e => {
        setIsError(false);
        if (password !== repeatPass) {
            setError("Gesli se ne ujemata");
            setIsError(true);
        } else {
            var hashedPass = sha256(password);
            form.append('username', username);
            form.append('password', password)
            axios({
                method: "POST",
                url: "http://127.0.0.1:5000/api/v1/register",
                data: form
            })
                .then((response) => {
                    const res = response.data
                    console.log(res);
                    if (res.error) {
                        setError(res.error);
                        setIsError(true);
                    } else {
                        navigate("/login");
                    }
                    return response;
                }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })
        }

    }

    return (
        <div className="Register">
            <Container>
                <h1>Registracija</h1>
                <Form className={"mt-4"}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Uporabniško ime</Form.Label>
                        <Form.Control type="text" placeholder="Vnesi uporabniško ime" id={"username"} value={username}
                                      onChange={(e) => setUsername(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Geslo</Form.Label>
                        <Form.Control type="password" placeholder="Vnesi geslo" id={"password"} value={password}
                                      onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group> <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                    <Form.Label>Ponovi geslo</Form.Label>
                    <Form.Control type="password" placeholder="Ponovi geslo" id={"repeatPassword"} value={repeatPass}
                                  onChange={(e) => setRepeatPass(e.target.value)}/>
                </Form.Group>
                    <Button onClick={sendRegister} className={"mb-3"} variant={"outline-primary"}>Registracija</Button>
                </Form>
                {isError &&
                    <Alert variant={"danger"}>
                        {error}
                    </Alert>
                }
            </Container>
        </div>
    );
}

export default Register;
