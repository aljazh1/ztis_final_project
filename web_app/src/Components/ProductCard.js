import {Alert, Button, Card, Container, Form} from "react-bootstrap";
import {Col} from "react-bootstrap";
import axios from "axios";
import {useState} from "react";
import {Modal} from "react-bootstrap";
import {ListGroup} from "react-bootstrap";

// komponenta za prikaz uporabniške kartice
function ProductCard(props) {
    const [admin, setAdmin] = useState(props.user.admin)
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const [success, setSuccess] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const form = new URLSearchParams();
    let slider
    let isAdmin = props.user.admin

    const updateUser = e => {
        form.append("username", props.user.username)
        form.append("newAdmin", admin)
        setSuccess(false)
        setIsError(false)
        axios({
            method: "PUT",
            url: "http://127.0.0.1:5000/auth/updateAdmin",
            data: form
        })
            .then((response) => {
                const res = response.data
                if (res.error) {
                    setError(res.error);
                    setIsError(true);
                } else {
                    setSuccess(true);
                }
            }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
    }

    const deleteUser = e => {
        form.append("username", props.user.username)
        axios({
            method: "DELETE",
            url: "http://127.0.0.1:5000/auth/deleteUser",
            data: form
        })
            .then((response) => {
                const res = response.data
                handleClose()
            }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
    }

    return (
        //<Col className={"item"}>
        //    <Card style={{width: '13rem', height: 'auto'}} border={"dark"} className="mb-4">
        //        <Card.Img variant="top" src={props.processor.img}/>
        //        <Card.Body>
        //            <Card.Title>{props.izdelek.ime}</Card.Title>
        //            <Card.Subtitle className="mb-2 text-muted">{props.izdelek.ime}</Card.Subtitle>
        //            <ListGroup variant="flush">
        //                {props.izdelek.vrsta && (
        //                    <ListGroup.Item><b>Vrsta:</b> {props.izdelek.vrsta}</ListGroup.Item>
        //                )}
        //                {props.izdelek.slika && (
        //                    <ListGroup.Item><b>Slika:</b> {props.izdelek.slika}</ListGroup.Item>
        //                )}
        //                {props.izdelek.cena && (
        //                    <ListGroup.Item><b>Cena:</b> {props.izdelek.cena}</ListGroup.Item>
        //                )}
        //                {props.izdelek.zaloga && (
        //                    <ListGroup.Item><b>zaloga:</b> {props.izdelek.zaloga}</ListGroup.Item>
        //                )}
        //            </ListGroup>
        //            <Container>
        //                <Button className={"mb-2"}>
        //                    <a href={props.processor.link} target="_blank" rel="noreferrer" className={"link-light"}>Pojdi
        //                        na stran</a>
        //                </Button>
        //                <Button className={"justify-content-md-center"} onClick={() => {
        //                    navigator.clipboard.writeText(props.processor.link)
        //                }}>Kopiraj</Button>
        //            </Container>
        //        </Card.Body>
        //    </Card>
        //</Col>
        <h1>izdelček</h1>
    );
}

export default ProductCard;