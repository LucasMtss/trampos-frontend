import { Col, Row, Spinner } from 'react-bootstrap';
import Modal, {ModalProps} from 'react-bootstrap/Modal';

export default function CustomModal(props: ModalProps) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
     
      </Modal.Header>
      <Modal.Body>

        <Row>
          <Col lg={12} className='d-flex align-center justify-center'>
            <p className='mx-2'>
            Estamos salvando suas informações
            </p>
            <Spinner className='ml-2' animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
         
        </Row>
      </Modal.Body>
      
    </Modal>
  );
}