import {Alert, Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import {sha256} from "js-sha256";
import Login from "./Login";
import {goTo} from "react-chrome-extension-router";
import {useNavigate} from "react-router-dom";

function CreateProduct() {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [pic, setPic] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    let navigate = useNavigate();

    const form = new URLSearchParams();

    const sendNewProduct = e => {
        setIsError(false);
        form.append('ime', name);
        form.append('vrsta', type);
        form.append('slika', pic);
        form.append('cena', price);
        form.append('zaloga', stock);
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/api/v1/items/add_item",
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

    return (
        <div className="Register">
            <Container>
                <h1>Nov izdelek</h1>
                <Form className={"mt-4"}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Ime izdelka</Form.Label>
                        <Form.Control type="text" placeholder="Vnesi ime izdelka" id={"username"} value={name}
                                      onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formType">
                        <Form.Label>Tip izdelka</Form.Label>
                        <Form.Control type="text" placeholder="Vnesi tip izdelka" id={"type"} value={type}
                                      onChange={(e) => setType(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPic">
                        <Form.Label>Slika</Form.Label>
                        <Form.Control type="text" placeholder="Vnesi povezavo do slike izdelka" id={"picture"}
                                      value={pic}
                                      onChange={(e) => setPic(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPrice">
                        <Form.Label>Cena izdelka</Form.Label>
                        <Form.Control type="text" placeholder="Vnesi ceno izdelka" id={"price"} value={price}
                                      onChange={(e) => setPrice(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formStock">
                        <Form.Label>Zaloga</Form.Label>
                        <Form.Control type="text" placeholder="Vnesi zalogo" id={"stock"} value={stock}
                                      onChange={(e) => setStock(e.target.value)}/>
                    </Form.Group>
                    <Button onClick={sendNewProduct} className={"mb-3"} variant={"outline-primary"}>Vnesi</Button>
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

export default CreateProduct;
