import {Navbar, Container, Nav} from 'react-bootstrap'


const Navigation = () => {

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Ninjas</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto ">
                        <Nav.Link href="/heroes">Home</Nav.Link>
                        <Nav.Link href="/set">Create</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;