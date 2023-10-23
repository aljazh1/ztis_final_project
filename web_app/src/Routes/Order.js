import {Button, Container} from "react-bootstrap";
import Payment from "../Components/Payment";

function Order() {
    return (
        <Container>
            {/*<p>Naročilo</p>*/}
            <Payment></Payment>
            {/*<Button variant="outline-primary">Naroči</Button>*/}
        </Container>
    );
}

export default Order;
