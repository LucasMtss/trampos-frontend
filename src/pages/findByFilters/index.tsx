import { Badge, Button, Col, Form, Row, Stack } from 'react-bootstrap';
import CustomNavbar from '../../components/CustomNavbar';
import Title from '../../components/Title';
import { Container } from './style';
import { useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import CustomModal from '../../components/CustomModal';
import { CardUser, ContainerImageName, ContainerSkills, ContainerUsers, Name, Occupation, Image } from '../../components/ListUsers/style';
import { useNavigate } from "react-router-dom";
import { User } from '../../models/userModel';

function FindByFilters() {
    const [name, setName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [skill, setSkill] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [level, setLevel] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [skillList, setSkillList] = useState<string[]>([]);
    const [nameList, setNameList] = useState<string[]>([]);
    const [occupationList, setOccupationList] = useState<string[]>([]);
    const [levelList, setLevelList] = useState<string[]>([]);
    const [stateList, setStateList] = useState<string[]>([]);
    const [cityList, setCityList] = useState<string[]>([]);
    const [users, setUsers] = useState<User[]>([] as User[]);

    const navigate = useNavigate();

    function addItem(item: string, type: 'name' | 'state' | 'city' | 'occupation' | 'level' | 'skill'){
        if(!item.length) return;

        switch (type) {
           
            case 'name':
                if(!nameList.find(name => name === item)){
                    setNameList([...nameList, item.trim()]);
                    setName('');
                }
                break;
            case 'state':
                if(!stateList.find(state => state === item)){
                    setStateList([...stateList, item.trim()]);
                    setState('');
                }
                break;
            case 'city':
                if(!cityList.find(city => city === item)){
                    setCityList([...cityList, item.trim()]);
                    setCity('');
                }
                break;
            case 'occupation':
                if(!occupationList.find(occupation => occupation === item)){
                    setOccupationList([...occupationList, item.trim()]);
                    setOccupation('');
                }
                break;
            case 'level':
                if(!levelList.find(level => level === item)){
                    setLevelList([...levelList, item.trim()]);
                    setLevel('');
                }
                break;
            case 'skill':
                if(!skillList.find(skill => skill === item)){
                    setSkillList([...skillList, item.trim()]);
                    setSkill('');
                }
                break;
            default:
                break;
        }
           
    }

    function deleteItem(item: string, type: 'name' | 'state' | 'city' | 'occupation' | 'level' | 'skill'){
        let copyItens = [];

        switch (type) {
            case 'name':
                copyItens = nameList.filter(name => name !== item);
                setNameList(copyItens);
                break;
            case 'state':
                copyItens = stateList.filter(state => state !== item);
                setStateList(copyItens);
                break;
            case 'city':
                copyItens = cityList.filter(city => city !== item);
                setCityList(copyItens);
                break;
            case 'occupation':
                copyItens = occupationList.filter(occupation => occupation !== item);
                setOccupationList(copyItens);
                break;
            case 'level':
                copyItens = levelList.filter(level => level !== item);
                setLevelList(copyItens);
                break;
            case 'skill':
                copyItens = skillList.filter(skill => skill !== item);
                setSkillList(copyItens);
                break;
            default:
                break;
        }
    }

    function createQuery(){
        let query: any = {};
        if(nameList.length) query['nome'] = nameList.join(',');
        if(occupationList.length) query['profissao'] = occupationList.join(',');
        if(skillList.length) query['profissao'] = skillList.join(',');
        if(levelList.length) query['nivelSenioridade'] = levelList.join(',');
        if(cityList.length) query['cidade'] = cityList.join(',');
        if(stateList.length) query['estado'] = stateList.join(',');
        return query;
    }

    function handleSkills(skills: string){
        let arraySkills = skills.split(',');

        arraySkills = arraySkills.map(skill => skill.replace(' ', ''));
        const total = arraySkills.length;
        if(arraySkills.length > 4){
            arraySkills.splice(0,4)
            arraySkills.push(`+${total - 4}`);
        }
        return arraySkills;
    }

    async function submitHandler(e: any){
        e.preventDefault();
        try {
            setIsLoading(true);
                const { data } = await api.get(`/users/search`, {params: createQuery()});
                setUsers(data)
        } catch (error: any) {
            console.error(error);
            toast('Ocorreu um erro ao salvar os dados', {type: 'error'});
        } finally {
            setIsLoading(false);
        }
        
    }

  return (
    <>
      <CustomNavbar />
      <CustomModal show={isLoading}/>
      <Container>
        <Title text='Busca avançada'/>

        {
            users.length ? (
                <>
                    <ContainerUsers className='mt-4'>
                        {
                            users.map(user => {
                                return (
                                    <CardUser onClick={() => navigate(`/usuario/${user.id}`)}>
                                        <ContainerImageName>
                                            <Image className='mr-1' src={user.urlImagem}/>
                                            <Name>{user.nome}, {user.idade}</Name>
                                        </ContainerImageName>
                                        <Occupation>{user.profissao}</Occupation>
                                        <ContainerSkills >
                                            {
                                                handleSkills(user.habilidades).map(skill => {
                                                    return (
                                                        <Badge bg="primary">{skill}</Badge>
                                                    )
                                                })
                                            }
                                        </ContainerSkills>
                                    </CardUser>

                                )

                            })
                        }
                    </ContainerUsers>
                    <Button className='mt-4 mx-2' variant="success" onClick={() => setUsers([])}>
                        Buscar novamente
                    </Button>
                </>
            ) : (
                <>
                     <Form  className='form' onSubmit={submitHandler}>
            <Row>
                <Col lg={4}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail" >
                        <Form.Label>Nome</Form.Label>
                        <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Ex: João da Silva" />
                        <Form.Text className="text-muted">
                        <Stack className='mt-2' direction="horizontal" gap={2}>
                            {
                                nameList.map(item => {
                                    return (
                                        <Badge className='cursor-pointer' key={item} bg="primary" onClick={() => deleteItem(item, 'name')}>{item}</Badge>
                                    )
                                })
                            }
                        </Stack>
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col lg={2} className='mt-4'>
                    <Button onClick={() => addItem(name, 'name')}>Adicionar</Button>
                </Col>
                <Col lg={6}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail" >
                        <Form.Label>Nível de senioridade</Form.Label>
                        <Form.Select defaultValue="Estagiário" onChange={(e) => {
                            setLevel(e.target.value);
                            addItem(e.target.value, 'level');
                            }} aria-label="Default select example">
                            <option value="Estagiário">Estagiário</option>
                            <option value="Júnior">Júnior</option>
                            <option value="Pleno">Pleno</option>
                            <option value="Sênior">Sênior</option>
                            <option value="Especialista">Especialista</option>
                        </Form.Select>
                        <Stack className='mt-2' direction="horizontal" gap={2}>
                            {
                                levelList.map(item => {
                                    return (
                                        <Badge className='cursor-pointer' key={item} bg="primary" onClick={() => deleteItem(item, 'level')}>{item}</Badge>
                                    )
                                })
                            }
                        </Stack>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail" >
                        <Form.Label>Habilidades</Form.Label>
                        <Form.Control  onKeyUp={(e) => {
                            if(e.code === 'Enter')
                                addItem(skill, 'skill');
                        }} value={skill} onChange={(e) => setSkill(e.target.value)} type="text" placeholder="Ex: Javascript" />
                        <Form.Text className="text-muted">
                        <Stack className='mt-2' direction="horizontal" gap={2}>
                            {
                                skillList.map(item => {
                                    return (
                                        <Badge className='cursor-pointer' key={item} bg="primary" onClick={() => deleteItem(item, 'skill')}>{item}</Badge>
                                    )
                                })
                            }
                        </Stack>
                        </Form.Text>
                    </Form.Group>
                </Col>

                <Col lg={2} className='mt-4'>
                    <Button onClick={() => addItem(skill, 'skill')}>Adicionar</Button>
                </Col>
                <Col lg={4}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail" >
                        <Form.Label>Cargo</Form.Label>
                        <Form.Control value={occupation} onChange={(e) => setOccupation(e.target.value)} type="text" placeholder="Ex: Engenheiro de software" />
                        <Form.Text className="text-muted">
                        <Stack className='mt-2' direction="horizontal" gap={2}>
                            {
                                occupationList.map(item => {
                                    return (
                                        <Badge className='cursor-pointer' key={item} bg="primary" onClick={() => deleteItem(item, 'occupation')}>{item}</Badge>
                                    )
                                })
                            }
                        </Stack>
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col lg={2} className='mt-4'>
                    <Button onClick={() => addItem(occupation, 'occupation')}>Adicionar</Button>
                </Col>
            </Row>
            <Row>
            <Col lg={4}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail" >
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="Ex: Belo Horizonte" />
                        <Form.Text className="text-muted">
                        <Stack className='mt-2' direction="horizontal" gap={2}>
                            {
                                cityList.map(item => {
                                    return (
                                        <Badge className='cursor-pointer' key={item} bg="primary" onClick={() => deleteItem(item, 'city')}>{item}</Badge>
                                    )
                                })
                            }
                            
                        </Stack>
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col lg={2} className='mt-4'>
                    <Button onClick={() => addItem(city, 'city')}>Adicionar</Button>
                </Col>
                <Col lg={4}>
                    <Form.Group className="mb-3 form-field" controlId="formBasicEmail" >
                        <Form.Label>Estado</Form.Label>
                        <Form.Control value={state} onChange={(e) => setState(e.target.value?.toUpperCase())} type="text" placeholder="Ex: MG" />
                        <Form.Text className="text-muted">
                        <Stack className='mt-2' direction="horizontal" gap={2}>
                            {
                                stateList.map(item => {
                                    return (
                                        <Badge className='cursor-pointer' key={item} bg="primary" onClick={() => deleteItem(item, 'state')}>{item}</Badge>
                                    )
                                })
                            }
                            
                        </Stack>
                        </Form.Text>
                    </Form.Group>
                </Col>
                <Col lg={2} className='mt-4'>
                    <Button onClick={() => addItem(state, 'state')}>Adicionar</Button>
                </Col>
            </Row>
            <Button className='mt-4 mx-2' variant="success" type="submit">
                Buscar
            </Button>
        </Form>
                </>
            )
        }

       
      </Container>
    </>
  )
}

export default FindByFilters;
