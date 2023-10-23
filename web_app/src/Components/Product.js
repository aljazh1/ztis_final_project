import {Container} from "react-bootstrap";
import { useLocation } from 'react-router-dom'


function Product(props) {
    const location = useLocation()
    const { name } = location.state

    return (
        <Container>
            <p>product {name}</p>
        </Container>
    );
}

export default Product;
