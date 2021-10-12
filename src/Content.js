import { useState, useEffect} from 'react';
import {Container, Row, Col, Table, Card, Button} from 'react-bootstrap';
import axios from 'axios';

function Content() {
  const [albums, setAlbums] = useState([]);
  const [isSuccesful, setStatus] = useState(false);

  const [photos, fetchPhotos] = useState([]);
  const [photosShown, openPhotos] = useState(false);

  useEffect(() => {
  	axios.get('https://jsonplaceholder.typicode.com/albums')
    .then((res) => { 
      	setStatus(true);
      	setAlbums(res.data);
      })
  },[])

  const showPhotos = (id) =>{
    axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
      .then((res) => {
        fetchPhotos(res.data);
        openPhotos(true);
      })
  }

    return (
      <Container>
        { !photosShown ?
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
                      <tr key={item.id} onClick = {() => showPhotos(item.id)}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                      </tr>
                    )}                      
                  </tbody>
                </Table>                    
                : <div>Loading...</div>}
            </Col>
          </Row>
        : null }
        { photosShown ?
          <Row>
            <Col md={12} lg={12} xs={12} style={{ justifyContent: 'center' }}>
              <Button onClick={() => openPhotos(false)} className="return-button">Back to albums</Button>
            </Col>
            {photos.map((item) => 
              <Col md={4} lg={4} xs={4} key={item.id}>
                <Card>
                  <Card.Img variant="top" src={item.url} />
                  <Card.Body>
                    <Card.Text>
                      {item.title}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        : null }
      </Container>
    );
  }

export default Content;
