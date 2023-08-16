import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CardUser, ContainerImageName, ContainerUsers, Image, Name, Occupation, ContainerSkills } from './style';
import { Badge } from 'react-bootstrap';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { User } from '../../models/userModel';
import Title from '../Title';
import { useNavigate } from "react-router-dom";

function ListUsers() {
    const [users, setUsers] = useState<User[]>([] as User[]);
    const navigate = useNavigate();

    async function getUsers(){
        try {
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (error: any) {
            console.log('ERROR', error);
            
        }
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

    useEffect(() => {
      getUsers();
    }, [])
    

  return (
    <Container>
      <Row className='my-4'>
        <Col>
            <Title text='Usuários' />
        </Col>
      </Row>

      <Row>
        <Col>
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
        </Col>
      </Row>
    </Container>
  );
}

export default ListUsers;