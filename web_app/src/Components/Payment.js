import {Alert, Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Payment() {
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCose, setPostalCode] = useState("");
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const [method, setMethod] = useState("")
    const [cardName, setCardName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [cvv, setCvv] = useState("")
    const [type, setType] = useState("povzetje")
    const form = new URLSearchParams();
    let cardPayment
    let deliveryPayment

    /*
    item_id = body.get('izdelek_id', None)
    naziv = body.get('naziv_placila', None)
    metoda = body.get('metoda', None)
    st_kartice = body.get('stevilka_kartice', None)
    ime_na_kartici = body.get('ime_na_kartici', None)
    datum_veljavnosti = body.get('datum_veljavnosti', None)
     */
    const sendNewPayment = e => {
        setIsError(false);
        form.append('NP', "652bf7d3c1c75f7ec171f83b");
        form.append('ime', name);
        form.append('priimek', lastName);
        form.append('naslov', address);
        form.append('mesto', city);
        form.append('postna_stevilka', postalCose);
        form.append('vrsta_placila', type);
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/api/v1/orders/new_order",
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

    cardPayment =
        <Form className={"mt-4"}>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Ime</Form.Label>
                <Form.Control type="text" placeholder="Vnesi ime na kartici" id={"username"} value={name}
                              onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Številka kartice</Form.Label>
                <Form.Control type="text" placeholder="Vnesi številko kartice" id={"password"} value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Cvv</Form.Label>
                <Form.Control type="text" placeholder="Vnesi številko cvv" id={"password"} value={cvv}
                              onChange={(e) => setCvv(e.target.value)}/>
            </Form.Group>
            {/*<Button onClick={sendLogin} className={"mb-3"} variant={"outline-primary"}>Prijava</Button>*/}
            {isError &&
                <Alert variant={"danger"}>
                    {error}
                </Alert>
            }
        </Form>

    deliveryPayment  =
        <Form className={"mt-4"}>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Ime</Form.Label>
                <Form.Control type="text" placeholder="Vnesi ime" id={"username"} value={cardName}
                              onChange={(e) => setCardName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Priimek</Form.Label>
                <Form.Control type="text" placeholder="Vnesi priimek" id={"lastname"} value={lastName}
                              onChange={(e) => setLastName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Naslov</Form.Label>
                <Form.Control type="text" placeholder="Vnesi naslov" id={"address"} value={address}
                              onChange={(e) => setAddress(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mesto</Form.Label>
                <Form.Control type="text" placeholder="Vnesi mesto" id={"city"} value={city}
                              onChange={(e) => setCity(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Poštna številka</Form.Label>
                <Form.Control type="text" placeholder="Vnesi poštno številko" id={"postnumber"} value={postalCose}
                              onChange={(e) => setPostalCode(e.target.value)}/>
            </Form.Group>
            {/*<Button onClick={sendLogin} className={"mb-3"} variant={"outline-primary"}>Prijava</Button>*/}
            {isError &&
                <Alert variant={"danger"}>
                    {error}
                </Alert>
            }
        </Form>


    const handleChange = (e) => {
        setType(e.target.id)
    }
    return (
        // <Container>
        <div>
            <p><b>Način plačila</b></p>
            <Form>
                <div key={`inline-radio`} className="mb-3">
                    <Form.Check
                        inline
                        label="Plačilo preko spleta"
                        name="group1"
                        type={"radio"}
                        id={`spletno`}
                        onChange={handleChange}
                    />
                    <Form.Check
                        inline
                        label="Plačilo po povzetju"
                        name="group1"
                        type={"radio"}
                        id={`povzetje`}
                        onChange={handleChange}
                        defaultChecked
                    />
                </div>
            </Form>
            {/*{method}*/}
            {
                type === "spletno" &&
                (cardPayment)
            }
            {
                type === "povzetje" &&
                (deliveryPayment)
            }
            {/*{cardPayment}*/}
            <Button variant="outline-primary" onClick={sendNewPayment}>Naroči</Button>

        </div>
        /*</Container>*/
    );
}

export default Payment;
