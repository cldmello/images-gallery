import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const navbarStyle = {
    backgroundColor: 'skyblue'
};

const Header = (props) => {
    return (
        <Navbar style={navbarStyle} variant="light">
            <Container>
                <Navbar.Brand href="/">{props.title}</Navbar.Brand>
            </Container>
        </Navbar>
    )
};

export default Header;