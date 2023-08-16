import CustomNavbar from '../../components/CustomNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Title from '../../components/Title';
import { Container, Divider, Subtitle } from './style';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Badge, Col, Row, Stack } from 'react-bootstrap';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { User } from '../../models/userModel';
import CustomModal from '../../components/CustomModal';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


function CreateUser() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [image, setImage] = useState('');
    const [curriculum, setCurriculum] = useState('');
    const [occupation, setOcuppation] = useState('');
    const [skill, setSkill] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [complement, setComplement] = useState('');
    const [level, setLevel] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [userId, setUserId] = useState('');
    const [skillsList, setSkillsList] = useState<string[]>([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        if(window.location.pathname.split('/').length === 3){
            setIsEditing(true)
            setUserId(window.location.pathname.split('/')[2])
            getUser(window.location.pathname.split('/')[2]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function submitHandler(e: any){
        e.preventDefault();
        try {
            setIsLoading(true);
            if(isEditing){
                await api.put(`/users/${userId}`, getRequestBody());
                toast('Usuário alterado com sucesso', {type: 'success'});
                navigate("/");
            } else {
                await api.post('/users', getRequestBody());
                toast('Usuário cadastrado com sucesso', {type: 'success'});
                navigate("/");
            }
        } catch (error: any) {
            console.error(error);
            toast('Ocorreu um erro ao salvar os dados', {type: 'error'});
        } finally {
            setIsLoading(false);
        }
        
    }

    async function deleteUser(){
        try {
            await api.delete(`/users/${userId}`);
            toast('Usuário deletado com sucesso', {type: "success"});
            navigate('/')
        } catch (error: any) {
            console.error(error)
            toast('Ocorreu um erro ao deletar o usuário', {type: "error"});
        }
    }

    async function getUser(id: string){
        try {
            setIsLoading(true);
            const { data } = await api.get(`/users/${id}`);
            
            setName(data.nome);
            setAge(data.idade);
            setOcuppation(data.profissao);
            setImage(data.urlImagem);
            setCurriculum(data.urlCurriculo);
            setLevel(data.nivelSenioridade);
            setZipcode(data.cep);
            setCity(data.cidade);
            setState(data.estado);
            setStreet(data.rua);
            setNumber(data.numero);
            setNeighborhood(data.bairro);
            setComplement(data.complemento);
            handleSkills(data.habilidades);

        } catch (error: any) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
        
    }

    async function getAddressByZipcode(zipcode: string){
        try {
            const {data} = await api.get(`https://viacep.com.br/ws/${zipcode}/json/`);
            setState(data.uf);
            setCity(data.localidade);
            setNeighborhood(data.bairro);
            setStreet(data.logradouro);
        } catch (error: any) {
            console.error(error)
        }
    }

    function handleSkills(skills: string){
        if(!skills) return;
        const splitedSkills = skills.split(', ')
        setSkillsList(splitedSkills)
    }

    function addSkills(skill: string){
        if(skill.length && !skillsList.find(item => item === skill)){
            setSkillsList([...skillsList, skill.trim()]);
            setSkill('');
        }       
    }

    function deleteSkill(skill: string){
        const copySkills = skillsList.filter(item => item !== skill);
        setSkillsList(copySkills);
    }

    function getRequestBody(): User {
        return {
            nome: name,
            idade: age,
            cep: zipcode,
            cidade: city,
            complemento: complement,
            estado: state,
            habilidades: skillsList.join(', '),
            nivelSenioridade: level.length ? level : "Estagiário",
            numero: number,
            profissao: occupation,
            rua: street,
            urlCurriculo: curriculum,
            urlImagem: image,
            bairro: neighborhood
        }
    }
  return (
    <>
      <CustomNavbar />
      <CustomModal show={isLoading}/>
      <Container>
        <Title text='Cadastro de usuários' />

        <Form onSubmit={submitHandler} className='form'>
            <Subtitle> Dados pessoais</Subtitle>
            <Row>
            <Col lg={6}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control required value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Ex: João da Silva" />
                    </Form.Group>
                </Col>
                <Col lg={6}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail">
                        <Form.Label>Idade</Form.Label>
                        <Form.Control required value={age} onChange={(e) => setAge(e.target.value)} type="number" placeholder="Ex: 18" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail" >
                        <Form.Label>Sua foto</Form.Label>
                        <Form.Control value={image} onChange={(e) => setImage(e.target.value)} type="text" placeholder="Ex: https://minhafoto.png" />
                        
                    </Form.Group>
                </Col>
                <Col lg={6}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail">
                        <Form.Label>Currículo</Form.Label>
                        <Form.Control value={curriculum} onChange={(e) => setCurriculum(e.target.value)} type="text" placeholder="Ex: https://meucurriculo.com.br" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail" >
                        <Form.Label>Habilidades</Form.Label>
                        <Form.Control  onKeyUp={(e) => {
                            if(e.code === 'Enter')
                                addSkills(skill);
                        }} value={skill} onChange={(e) => setSkill(e.target.value)} type="text" placeholder="Ex: Javascript" />
                        <Form.Text className="text-muted">
                        <Stack className='mt-2' direction="horizontal" gap={2}>
                            {
                                skillsList.map(item => {
                                    return (
                                        <Badge className='cursor-pointer' key={item} bg="primary" onClick={() => deleteSkill(item)}>{item}</Badge>
                                    )
                                })
                            }
                            
                        </Stack>
                        </Form.Text>
                    </Form.Group>
                </Col>

                <Col lg={2} className='mt-4'>
                    <Button onClick={() => addSkills(skill)}>Adicionar</Button>
                </Col>
                <Col lg={6}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail">
                        <Form.Label>Cargo</Form.Label>
                        <Form.Control required value={occupation} onChange={(e) => setOcuppation(e.target.value)} type="text" placeholder="Ex: Engenheiro de Software" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail" >
                        <Form.Label>Nível de senioridade</Form.Label>
                        <Form.Select defaultValue="Estagiário" onChange={(e) => setLevel(e.target.value)} required aria-label="Default select example">
                            <option value="Estagiário">Estagiário</option>
                            <option value="Júnior">Júnior</option>
                            <option value="Pleno">Pleno</option>
                            <option value="Sênior">Sênior</option>
                            <option value="Especialista">Especialista</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Divider />
           
            <Subtitle> Endereço</Subtitle>

            <Row>
                <Col lg={4}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail">
                        <Form.Label>CEP</Form.Label>
                        <Form.Control required maxLength={8} value={zipcode} onChange={(e) => setZipcode(e.target.value)} type="number" placeholder="Ex: 36212000" />
                    </Form.Group>
                </Col>
                <Col lg={2} className='pt-4'>
                    <Button onClick={() => getAddressByZipcode(zipcode)}>Buscar</Button>
                </Col>
                <Col lg={6}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control required disabled={true} value={state} type="text" placeholder="Ex: MG" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail">
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control required disabled={true} value={city} type="text" placeholder="Ex: Belo Horizonte" />
                    </Form.Group>
                </Col>
                <Col lg={6}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail">
                        <Form.Label>Rua</Form.Label>
                        <Form.Control required onChange={(e) => setStreet(e.target.value)} value={street} type="text" placeholder="Ex: Rua Presidente Vargas" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail">
                        <Form.Label>Bairro</Form.Label>
                        <Form.Control required onChange={(e) => setNeighborhood(e.target.value)} value={neighborhood} type="text" placeholder="Ex: Novo Horizonte" />
                    </Form.Group>
                </Col>
                <Col lg={2}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail">
                        <Form.Label>Número</Form.Label>
                        <Form.Control required value={number} onChange={(e) => setNumber(e.target.value)} type="number" placeholder="Ex: 123" />
                    </Form.Group>
                </Col>
                <Col lg={4}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail">
                        <Form.Label>Complemento</Form.Label>
                        <Form.Control value={complement} onChange={(e) => setComplement(e.target.value)} type="text" placeholder="Ex: Apartamento 203" />
                    </Form.Group>
                </Col>
            </Row>
      
      <Button className='mt-4 mx-2' variant="danger" onClick={() => deleteUser()}>
        Excluir
      </Button>
      <Button className='mt-4 mx-2' variant="primary" type="submit">
        Salvar
      </Button>
    </Form>
      </Container>
    </>
  )
}

export default CreateUser;
