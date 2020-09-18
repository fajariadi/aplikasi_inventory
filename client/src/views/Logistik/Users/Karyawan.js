import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getDivisisQuery, getKaryawansQuery, addAkunMutation} from '../queries/queries';
import {  
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
  Button, 
  Row, 
  Table,
  FormGroup,
  Form,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader
} from 'reactstrap';

class Karyawan extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:'',
      karyawan_id:'',
      modalIsOpen: false,
    }
  }

  onDelete(divisi_id){
    
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
   var data = this.props.addAkunMutation({
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
          <Col>
            <Card>
              <CardHeader>
                Daftar User
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Jabatan</th>
                    <th>Alamat</th>
                    <th>No HP</th>
                    <th>Avatar</th>
                    <th>Divisi</th>
                    <th>Aksi</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.displayKaryawans()}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
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
)(Karyawan);
