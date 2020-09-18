import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { } from '../../Logistik/queries/queries';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      username:'error',
      password:'error',
      isLoggedIn:false,
      }
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1 className="text-center">Login</h1>
                      <p className="text-muted text-center">Sign In to your account</p>
                      <InputGroup className="mb-3">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        <Input type="text" placeholder="Username" onChange={(e) =>this.setState({username:e.target.value})} required />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        
                        <Input type="password" placeholder="Password" onChange={(e) =>this.setState({password:e.target.value})} required />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Link to={ `/auth/login/${this.state.username}&&${this.state.password}` }>
                            <Button color="primary" className="px-4">Login</Button>
                          </Link>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default 
(Login);
