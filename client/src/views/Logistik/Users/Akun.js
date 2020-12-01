import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getDivisisQuery, getKaryawansQuery, addAkunMutation, hapusAkunMutation, addKaryawanMutation, getAkunsQuery} from '../queries/queries';
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

class Akun extends Component {
  constructor(props){
    super(props);
    this.state = {
      nama:'',
      jabatan:'',
      alamat:'',
      noHp:'',
      avatar:'',
      div_id:'',
      username:'',
      password:'',
      karyawan_id:'',
      modalIsOpen: false,
      modal1IsOpen: false,
    }
  }

  onDelete(divisi_id){
    
  }

  toggleModal1(){
    this.setState({
      modal1IsOpen: ! this.state.modal1IsOpen
    });
  }

  toggleModal(kar_id){
    this.setState({
      karyawan_id: kar_id
    });
    this.setState({
      modalIsOpen: ! this.state.modalIsOpen
    });
  }

  displayDivisi(){
    var data = this.props.getDivisisQuery;
    if(data.loading){
      return (<div>Loading Divisi...</div>);
    } else {
      return data.divisis.map(div => {
          return(
            <option key={div.id} value={div.id}>{div.nama}</option>
          )
      })
    }
  }

  displayKaryawan(){
    var data = this.props.getKaryawansQuery;
    if(data.loading){
      return (<div>Loading Karyawan...</div>);
    } else {
      return data.karyawans.map(kar => {
          return(
            <option key={kar.id} value={kar.id}>{kar.nama}</option>
          )
      })
    }
  }

  displayAkuns(){
    var data = this.props.getAkunsQuery;
    var no = 0;
    if(data.loading){
      return (<div>Loading Akuns...</div>);
    } else {
      return data.akuns.map(akun => {
        no++;
        return(
          <tr  key={akun.id}>
            <td>{no}</td>
            <td>{akun.karyawan.nama}</td>
            <td>{akun.karyawan.jabatan}</td>
            <td>{akun.karyawan.alamat}</td>
            <td>{akun.karyawan.noHp}</td>
            <td>{akun.karyawan.divisi.nama}</td>
            <td>
              <Link to={`/user/detailAkun/${akun.id}`}>
              <Button color="primary" size="sm">
                <i className="fa fa-file"></i>
                </Button>
              </Link>
            </td>
            <td>
              <Button onClick={this.onDelete.bind(this, akun.id)} color="danger" size="sm">
                <i className="fa fa-trash"></i>
              </Button>
            </td>
          </tr>
        );
      });
    }
  }

  onDelete(akun_id){
    this.props.hapusAkunMutation({
      variables:{
        id: akun_id,        
      },
      refetchQueries:[{query:getAkunsQuery}],
    });
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

  submitForm(e){
    e.preventDefault();
    this.toggleModal1();
    this.props.addKaryawanMutation({
      variables:{
        nama: this.state.nama,
        jabatan: this.state.jabatan,
        alamat: this.state.alamat,
        noHp : this.state.noHp,
        avatar: this.state.nama+'jpg',
        divisi_id: this.state.div_id,
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
                Daftar Akun
                <Button size="sm" color="primary" className="float-right mb-0 mr-2" onClick={this.toggleModal.bind(this)}>
                  <i className="fa fa-plus"></i> Buat Akun
                </Button>
               
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead align="center">
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Jabatan</th>
                    <th>Alamat</th>
                    <th>No HP</th>
                    <th>Divisi</th>
                    <th>Detail</th>
                    <th>Hapus</th>
                  </tr>
                  </thead>
                  <tbody align="center">
                  {this.displayAkuns()}
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
                <Label htmlFor="name">Password</Label>
                <Input type="password" name="password" onChange={(e) =>this.setState({password:e.target.value})} id="nama" required></Input>
              </FormGroup>
              <FormGroup>
              <Label htmlFor="name">Karyawan</Label>
                <Input type="select" name="karyawan" onChange={(e) =>this.setState({karyawan_id:e.target.value})} id="nama" required>
                  <option>Pilih Karyawan</option>
                  {this.displayKaryawan()}
                </Input>
              </FormGroup>
              <Button type="submit" color="primary">Tambah</Button>
              <Button color="danger" onClick={this.toggleModal.bind(this)}>Batal</Button>
            </Form>
          </ModalBody>  
        </Modal>
        <Modal isOpen={this.state.modal1IsOpen}>
          <ModalHeader>From Tambah Karyawan</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => {this.submitForm(e)}}>
              <FormGroup>
                <Label htmlFor="name">Nama</Label>
                <Input type="text" id="nama" placeholder="Masukkan Nama" onChange={(e) =>this.setState({nama:e.target.value})} required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Jabatan</Label>
                <Input type="text" id="jabatan" placeholder="Masukkan Jabatan" onChange={(e) =>this.setState({jabatan:e.target.value})} required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Alamat</Label>
                <Input type="text" id="alamat" placeholder="Masukkan Alamat" onChange={(e) =>this.setState({alamat:e.target.value})} required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">No HP</Label>
                <Input type="text" id="noHp" placeholder="Masukkan No HP" onChange={(e) =>this.setState({noHp:e.target.value})} required />
              </FormGroup>   
              <FormGroup>
              <Label htmlFor="name">Divisi</Label>
                <Input type="select" name="divisi" onChange={(e) =>this.setState({div_id:e.target.value})} id="nama" required>
                  <option>Pilih Divisi</option>
                  {this.displayDivisi()}
                </Input>
              </FormGroup>          
              <Button type="submit" color="primary">Submit</Button>
              <Button color="danger" onClick={this.toggleModal1.bind(this)}>Batal</Button>
            </Form>
          </ModalBody>  
        </Modal> 
      </div>

    );
  }
}

export default compose(
  graphql(getDivisisQuery, {name:"getDivisisQuery"}),
  graphql(getAkunsQuery, {name:"getAkunsQuery"}),
  graphql(addAkunMutation, {name:"addAkunMutation"}),
  graphql(addKaryawanMutation, {name:"addKaryawanMutation"}),
  graphql(getKaryawansQuery, {name:"getKaryawansQuery"}),
  graphql(hapusAkunMutation, {name:"hapusAkunMutation"}),
)(Akun);
