
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from './style';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import Title from '../../components/Title';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function submitHandler(e: any){
        e.preventDefault();
       try {
            const { data } = await api.post('/auth/login', {username: email, password});
            console.log(data);
            
            localStorage.setItem('@trampos:token', data.token);
            navigate('/')
       } catch (error: any) {
        if(error.response?.status === 401)
            toast('Usuário ou senha inválidos', {type: 'error'});
        else
            toast('Ocorreu um erro ao efetuar o login', {type: 'error'});
        console.error(error)
       }
       
        
    }

  return (
    <Container>
        <Title text='Login' />
         <Form  className='form' onSubmit={submitHandler}>
            <Row className='align-center'>
                <Col lg={6}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control required value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Ex: usuario@teste.com" />

                    </Form.Group>
                </Col>
            </Row>
            <Row className='align-center'>
                <Col lg={6}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail" >
                        <Form.Label>Senha</Form.Label>
                        <Form.Control required value={password} onChange={(e) => setPassword(e.target.value)} type="password" />

                    </Form.Group>
                </Col>

            </Row>
            <Button className='mt-4 mx-2' variant="primary" type="submit">
                Login
            </Button>
            </Form>
    </Container>
  )
}

export default Login;
