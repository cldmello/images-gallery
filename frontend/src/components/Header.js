import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { ReactComponent as Logo } from '../img/logo.svg'; 

const navbarStyle = {
    backgroundColor: '#eeeeee'
};

const Header = (props) => {
    return (
        <Navbar style={navbarStyle} variant="light">
            <Container>
                <Logo style={{ maxWidth: '12rem', maxHeight: '2rem' }} />
            </Container>
        </Navbar>
    )
};

export default Header;