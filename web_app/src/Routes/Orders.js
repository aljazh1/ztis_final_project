import {Button, Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import Payment from "../Components/Payment";
import {useEffect, useState} from "react";
import axios from "axios";

function Orders() {
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [productList, setProductList] = useState([]);
    let prods = []
    let kartica

    const getUsers = e => {
        axios({
            method: "GET",
            url: "http://127.0.0.1:5000/api/v1/orders/all",
        })
            .then((response) => {
                const res = response.data
                if (res.error) {
                    setError(res.error);
                    setIsError(true);
                } else {
                    setProductList(res)
                }
            }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
    }

    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {

        console.log("Changed Widgets: ", productList)
        console.log(Object.keys(productList).length)

    }, [productList])

    if (Object.keys(productList).length > 0) {
        // console.log(Object.values(productList)[0]["cena"]);
        Object.values(productList).map(item => (
            console.log(item["cena"])
        ))
    }

    kartica =
        <Container>
            <Row>
                {Object.values(productList).map(item => (
                    // <a>{item["cena"]}</a>
                    <Col className={"item"}>
                        <Card style={{width: '13rem', height: 'auto'}} border={"dark"} className="mb-4">
                            {/*<Card.Img variant="top" src={item.naziv}/>*/}
                            <Card.Body>
                                <Card.Title>Naročilo</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{item.izdelek_id["$oid"]}</Card.Subtitle>
                                <ListGroup variant="flush">
                                    {/*<ListGroup.Item><b>Vrsta:</b> {item.vrsta}</ListGroup.Item>*/}
                                    {/*<ListGroup.Item><b>Slika:</b> {item.slika}</ListGroup.Item>*/}
                                    <ListGroup.Item><b>Čas:</b> {item.cas_narocila}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>


    return (
        <Container className={"mt-3"}>
            {kartica}
        </Container>
    );
}

export default Orders;
