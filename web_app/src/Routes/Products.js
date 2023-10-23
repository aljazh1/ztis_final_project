import {Col, Container, ListGroup, Row} from "react-bootstrap";
import {Alert, Button, Card, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Routes, Route, BrowserRouter, Link} from 'react-router-dom';
import axios from "axios";
import ProductCard from "../Components/ProductCard";


function Products() {
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [productList, setProductList] = useState([]);
    let prods = []
    let kartica

    const getUsers = e => {
        axios({
            method: "GET",
            url: "http://127.0.0.1:5000/api/v1/items/get_items",
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
                            <Card.Img variant="top" src={item.slika}/>
                            <Card.Body>
                                <Card.Title>{item.vrsta}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{item.ime}</Card.Subtitle>
                                <ListGroup variant="flush">
                                    {/*<ListGroup.Item><b>Vrsta:</b> {item.vrsta}</ListGroup.Item>*/}
                                    {/*<ListGroup.Item><b>Slika:</b> {item.slika}</ListGroup.Item>*/}
                                    <ListGroup.Item><b>Cena:</b> {item.cena}</ListGroup.Item>
                                    <ListGroup.Item><b>zaloga:</b> {item.zaloga}</ListGroup.Item>
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
        // <Container>
        //     <p>products</p>
        //     {productList.length > 0 && (
        //         <p>pppp</p>
        //         // <Row>
        //         //     {productList.map(item => (
        //         //         // <ProductCard izdelek={item}></ProductCard>
        //         //         <p>a</p>
        //         //     ))}
        //         // </Row>
        //     )}
        //     <Link to={"/product"} state={{name: "test"}}>
        //         <Button variant="primary">Primary</Button>
        //     </Link>
        // </Container>
    );
}

export default Products;
