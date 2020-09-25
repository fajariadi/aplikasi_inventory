import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getDivisisQuery, getKaryawansQuery, addAkunMutation} from '../queries/queries';
import {  
  Card, 
  CardBody, 
  Col, 
  Button, 
  Row, 
  FormGroup,
  Form,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';

class Profile extends Component {
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      karyawan_id:'',
      modalIsOpen: false,
      nama: localStorage.getItem("nama"),
      avatar: localStorage.getItem("avatar"),
      alamat: localStorage.getItem("alamat"),
      email: localStorage.getItem("email"),
      noHp: localStorage.getItem("noHp"),
      username: localStorage.getItem("username"),
      password: localStorage.getItem("password"),
      activeTab: new Array(3).fill('1'),
      pictures: [],
    };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
   toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

   tabPane() {
    return (
      <>
        <TabPane tabId="1">
          {this.biodata()}
        </TabPane>
        <TabPane tabId="2">
          {this.akun()}
        </TabPane>
      </>
    );
  }

  biodata(){
    return(
      <div>
        <Row>
          <Col md='2'>
            <h5>Nama</h5>
          </Col>
          <Col md='1'>
             <h5>:</h5>
          </Col>
          <Col md='4'>
            <h5>{this.state.nama}</h5>
          </Col>
        </Row>
        <Row>
          <Col md='2'>
            <h5>Tanggal Lahir</h5>
          </Col>
          <Col md='1'>
             <h5>:</h5>
          </Col>
          <Col md='4'>
            <h5> </h5>
          </Col>
        </Row>
        <Row>
          <Col md='2'>
            <h5>Jenis Kelamin</h5>
          </Col>
          <Col md='1'>
             <h5>:</h5>
          </Col>
          <Col md='4'>
            <h5> </h5>
          </Col>
        </Row>
        <Row>
          <Col md='2'>
            <h5>Alamat</h5>
          </Col>
          <Col md='1'>
             <h5>:</h5>
          </Col>
          <Col md='4'>
            <h5>{this.state.alamat}</h5>
          </Col>
        </Row>
        <Row>
          <Col md='2'>
            <h5>No Telepon</h5>
          </Col>
          <Col md='1'>
             <h5>:</h5>
          </Col>
          <Col md='4'>
            <h5>{this.state.noHp}</h5>
          </Col>
        </Row>
        <Row>
          <Col md='2'>
            <h5>Email</h5>
          </Col>
          <Col md='1'>
             <h5>:</h5>
          </Col>
          <Col md='4'>
            <h5></h5>
          </Col>
        </Row>
      </div>
    );
  }

  akun(){
    return(
      <div>
        <Row>
          <Col md='2'>
            <h5>Username</h5>
          </Col>
          <Col md='1'>
             <h5>:</h5>
          </Col>
          <Col md='4'>
            <h5>{this.state.username}</h5>
          </Col>
        </Row>
        <Row>
          <Col md='2'>
            <h5>password</h5>
          </Col>
          <Col md='1'>
             <h5>:</h5>
          </Col>
          <Col md='4'>
            <h5>{this.state.password}</h5>
          </Col>
        </Row>
      </div>
    )
  }

  toggleModal(kar_id){
    this.setState({
      karyawan_id: kar_id
    });
    this.setState({
      modalIsOpen: ! this.state.modalIsOpen
    });
  }

  displayDivisis(){
    var data = this.props.getDivisisQuery;
    if(data.loading){
      return (<div>Loading Divisi...</div>);
    } else {
      return data.divisis.map(divisi => {
        return(
          <tr>
            <td key={divisi.id}>{divisi.nama}</td>
            <td key={divisi.id}>
             <Button onClick={this.toggleModal.bind(this, divisi.id)}>Edit</Button>
            </td>
            <td key={divisi.id}>
              <Button onClick={this.onDelete.bind(this, divisi.id)}>Hapus</Button>
            </td>

          </tr>
        );
      });
    }
  }

  displayKaryawans(){
    var data = this.props.getKaryawansQuery;
    if(data.loading){
      return (<div>Loading Divisi...</div>);
    } else {
      return data.karyawans.map(karyawan => {
        return(
          <tr>
            <td key={karyawan.id}>{karyawan.nama}</td>
            <td key={karyawan.id}>{karyawan.jabatan}</td>
            <td key={karyawan.id}>{karyawan.alamat}</td>
            <td key={karyawan.id}>{karyawan.noHp}</td>
            <td key={karyawan.id}>{karyawan.avatar}</td>
            <td key={karyawan.id}>{karyawan.divisi.nama}</td>
            <td key={karyawan.id}>
              <Button onClick={this.toggleModal.bind(this, karyawan.id)}>Buat Akun</Button>
            </td>
          </tr>
        );
      });
    }
  }

  addUser(e){
   e.preventDefault();
   var data = this.props.addUserMutation({
      variables:{
        username: this.state.username,
        password: this.state.password,
        karyawan_id: this.state.karyawan_id,

      },
      refetchQueries:[{query:getKaryawansQuery}]
    });
  }
  
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="4">
            <Card>
              <CardBody>
                <center>
                  <img src={'../../assets/img/avatars/5.jpg'} className="img-profile" alt="admin@bootstrapmaster.com" />
                </center>
              </CardBody>
              <Button>
                <center>
                  <h5><i className="fa fa-pencil"></i> Edit</h5>
                </center>
              </Button>
            </Card>
          </Col>
          <Col xs="12" lg="8">          
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => { this.toggle(0, '1'); }}
                >
                  Biodata
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => { this.toggle(0, '2'); }}
                >
                  Akun
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </Col>
        </Row>
        
        <Modal isOpen={this.state.modalIsOpen}>
          <ModalHeader>Form Tambah Barang</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => {this.addUser(e)}}>
              <FormGroup>
                <Label htmlFor="name">Username</Label>
                <Input type="text" name="username" onChange={(e) =>this.setState({username:e.target.value})} id="nama" required></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Passwor</Label>
                <Input type="password" name="password" onChange={(e) =>this.setState({password:e.target.value})} id="nama" required></Input>
              </FormGroup>
              <Button type="submit" color="primary">Tambah</Button>
              <Button color="danger" onClick={this.toggleModal.bind(this)}>Batal</Button>
            </Form>
          </ModalBody>  
        </Modal>
      </div>

    );
  }
}

export default compose(
  graphql(getDivisisQuery, {name:"getDivisisQuery"}),
  graphql(addAkunMutation, {name:"addAkunMutation"}),
  graphql(getKaryawansQuery, {name:"getKaryawansQuery"})
)(Profile);
