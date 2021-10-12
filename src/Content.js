import { useState, useEffect } from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap';
import axios from 'axios';

function Content() {
  const [albums, setAlbums] = useState([]);
  const [isSuccesful, setStatus] = useState(false);

  useEffect(() => {
  	axios.get('https://jsonplaceholder.typicode.com/albums')
    .then((res) => { 
    	setStatus(true);
    	setAlbums(res.data)
      })
  },[])

    return (
      <Container>
        <Row>
          <Col>
            {isSuccesful ?
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                  </tr>
                </thead>
                <tbody>
                  {albums.map((item, index) => 
                    <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    </tr>
                  )}                      
                </tbody>
              </Table>                    
              : <div>Loading...</div>}
            </Col>
          </Row>
      </Container>
    );
  }

export default Content;
