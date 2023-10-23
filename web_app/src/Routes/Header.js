import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

function Header() {
    const user = useRef("");
    const [nav, setNav] = useState("")

    useEffect(() => {
        let user = localStorage.getItem("userId")
        if (user) {
            setNav(user)
        }
    })

    let noUserNavigation =
        <Container>
            <Navbar.Brand>Navbar</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link>
                    {' '}
                    <Link className="text-decoration-none text-white" to="/">
                        Home
                    </Link>
                </Nav.Link>
                <Nav.Link>
                    {' '}
                    <Link className="text-decoration-none text-white" to="/login">
                        Prijava
                    </Link>
                </Nav.Link>
                <Nav.Link>
                    {' '}
                    <Link className="text-decoration-none text-white" to="/register">
                        Registracija
                    </Link>
                </Nav.Link>
            </Nav>
        </Container>

    const logout = e => {
        localStorage.removeItem("userId");
        window.location.reload(false);
    }


    let userNavigation =
        <Container>
            <Navbar.Brand>Navbar</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link>
                    {' '}
                    <Link className="text-decoration-none text-white" to="/">
                        Home
                    </Link>
                </Nav.Link>
                <Nav.Link>
                    {' '}
                    <Link className="text-decoration-none text-white" to="/products">
                        Pregled izdelkov
                    </Link>
                </Nav.Link>
                <Nav.Link>
                    {' '}
                    <Link className="text-decoration-none text-white" to="/orders">
                        Pregled naročil
                    </Link>
                </Nav.Link>
                <Nav.Link>
                    {' '}
                    <Link className="text-decoration-none text-white" to="/order">
                        Naročilo
                    </Link>
                </Nav.Link>
                <Nav.Link>
                    {' '}
                    <Link className="text-decoration-none text-white" to="/create_product">
                        Nov izdelek
                    </Link>
                </Nav.Link>
                <Nav.Link>
                    <Link className="text-decoration-none text-white" onClick={logout}>
                        Odjava
                    </Link>
                </Nav.Link>
            </Nav>
        </Container>


    return (
        <Navbar bg="dark" variant="dark">

            {
                nav !== "" &&
                (userNavigation)
            }
            {
                nav === "" &&
                (noUserNavigation)
            }
        </Navbar>
    );
}

export default Header;