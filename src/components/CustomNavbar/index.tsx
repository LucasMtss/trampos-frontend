import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function CustomNavbar() {
  return (
    <>
      <br />
      <Navbar fixed='top' bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Trampos</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/cadastro">Cadastro de usuário</Nav.Link>
            <Nav.Link href="/">Visualizar usuários</Nav.Link>
            <Nav.Link href="/busca">Busca avançada</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;