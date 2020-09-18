import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import { hapusManyListRequestMutation, getRequestsQuery, getBarangsQuery, getListRequestsQuery, addListRequestMutation, getRequestQuery} from '../queries/queries';
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
  ModalHeader, 
  ModalBody,
} from 'reactstrap';

class EditRequest extends Component {
  constructor(props){
    super(props);
    const username= localStorage.getItem("username")

    let loggedIn = true 
      if(username == null){
        loggedIn = false
      }
    this.state = {
      requestItems: [],
      nama:'',
      status: 'Active',
      jumlah:'',
      satuan:'',
      jenis:'',
      redirect: true,
      selected: null,
      loggedIn,
    }
  }



  displayRequestDetail(){
    const {request} = this.props.data;
    if(request){

      return(
        <CardBody>
          <Row>
            <Col md="4">
              <h5>Divisi : {request.divisi.nama}</h5>
            </Col>
            <Col md="4">
              <h5>Tanggal : {request.tanggal}</h5>
            </Col>
            <Col md="4">
              <h5>Status : {request.status}</h5>
            </Col>
          </Row>
          
              {
                request.listRequest.map(item => {
                 if(this.state.requestItems.length === 0){
                    const newItem = { nama: item.nama_barang, jumlah: item.jumlah_barang, satuan: item.satuan, jenis: item.jenis, status: this.state.status};
                    this.setState(state => {
                      state.requestItems.push(newItem);
                    });
                  }
                })
              }
           
        </CardBody>
      )
    }
  }

  onEdit(e){
    e.preventDefault();
    this.setState({
      modalEdit: ! this.state.modalEdit
    });
    var index = this.state.requestItems.findIndex(x => x.nama === this.state.nama);
    this.state.requestItems[index].jumlah = this.state.jumlah;
  }

   onDelete(e){
    e.preventDefault();
    this.setState({
      modalDelete: ! this.state.modalDelete
    });
    var index = this.state.requestItems.findIndex(x => x.nama === this.state.nama);
    this.setState( state => {
      state.requestItems.splice(index, 1);
    });
  }

  onUpdate(){
    var req_id = this.props.match.params.id;
    this.props.hapusManyListRequestMutation({
      variables:{
        id: req_id,        
      },
      refetchQueries:[{query:getRequestsQuery}],
    });
    this.state.requestItems.map(item => {
      return(
        this.props.addListRequestMutation({
          variables:{
            nama_barang: item.nama,
            jumlah_barang: parseInt(item.jumlah),
            satuan: item.satuan,
            jenis: item.jenis,
            request_id: req_id,
          },
          refetchQueries:[{query:getListRequestsQuery}],
        })
      );
    });
  }

  displayBarang(){
    var data = this.props.getBarangsQuery;
    if(data.loading){
      return (<div>Loading Barang...</div>);
    } else {
      return data.barangs.map(barang => {
        return(
          <option key={barang.id} value={barang.nama_barang}>{barang.nama_barang}</option>
        );
      });
    }
  }

  toggleModal(){
    this.setState({
      modalIsOpen: ! this.state.modalIsOpen
    });
  }

  toggleModalEdit(name){
    this.setState({
      nama : name
    });
    this.setState({
      modalEdit: ! this.state.modalEdit
    });
  }

  toggleModalDelete(name){
    this.setState({
      nama : name
    });
    this.setState({
      modalDelete: ! this.state.modalDelete
    });
  }

  addItem(e){
    e.preventDefault();
    this.toggleModal();
    const newItem = { nama: this.state.nama, jumlah: this.state.jumlah, satuan: this.state.satuan, jenis: this.state.jenis, status: this.state.status};
    this.setState(state => {
      state.requestItems.push(newItem);
    });
  }


  submitRequest = (e) => {
      var data = this.props.getRequestsQuery;
      var request_id = '';
      data.requests.map(request => {
          return(
             request_id = request.id
          );
      });
      this.state.requestItems.map(item => {
        return(
          this.props.addListRequestMutation({
            variables:{
              nama_barang: item.nama,
              jumlah_barang: parseInt(item.jumlah),
              satuan: item.satuan,
              jenis: item.jenis,
              request_id: request_id,
            },
            refetchQueries:[{query:getListRequestsQuery}],
          })
        );
      });
  }
  
  render() {
     if(this.state.loggedIn === false){
      return <Redirect to="/login" />
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Form Edit Permintaan Barang
                <Link to="/request/request" className={'float-right mb-0'}>
                  <Button label color="danger">
                      Batal
                  </Button>
                </Link>
              </CardHeader>
              <CardBody>
               {this.displayRequestDetail()}
               <Button onClick={this.toggleModal.bind(this)} size="sm" color="success" className={'float-right mb-0'}><i className="fa fa-plus-circle"></i> Tambah Barang</Button>
                <Table hover bordered striped responsive size="sm" className="mt-3">
                    <thead>
                    <tr>
                      <th>Nama Barang</th>
                      <th>Jumlah</th>
                      <th>Satuan</th>
                      <th>Jenis Barang</th>
                      <th>status</th>
                      <th>Edit</th>
                      <th>Hapus</th>
                    </tr>
                    </thead>
                    <tbody>
                      {
                         this.state.requestItems.map(item => {
                          return(
                            <tr>
                              <td>{item.nama}</td>
                              <td>{item.jumlah}</td>
                              <td>{item.satuan}</td>
                              <td>{item.jenis}</td>
                              <td>{item.status}</td>
                              <td>
                                <Button onClick={(e) => {this.toggleModalEdit(item.nama)}}>Edit</Button>
                              </td>
                              <td>
                                <Button onClick={(e) => {this.toggleModalDelete(item.nama)}}>Hapus</Button>
                              </td>
                            </tr>
                          ) 
                         })
                      }
                    </tbody>
                  </Table>
              </CardBody>
              <Link to='/request/request' className={'text-center mb-3'}>
                <Button onClick={this.onUpdate.bind(this)} color="primary" >Simpan</Button>
              </Link>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.modalIsOpen}>
          <ModalHeader>Form Tambah Barang</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => {this.addItem(e)}}>
              <FormGroup>
                <Label htmlFor="name">Nama Barang</Label>
                <Input type="select" name="nama" onChange={(e) =>this.setState({nama:e.target.value})} id="nama" required>
                  <option>Nama Barang</option>
                  {this.displayBarang()}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Jenis Barang</Label>
                <Input type="select" id="jenis" onChange={(e) =>this.setState({jenis:e.target.value})} required>
                  <option>Jenis</option>
                  <option value="Bahan Alam">Bahan Alam</option>
                  <option value="Besi">Besi</option>
                  <option value="Cat">Cat</option>
                  <option value="Kayu">Kayu</option>
                  <option value="Keramik">Keramik</option>
                  <option value="Material">Material</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Satuan</Label>
                <Input type="select" name="satuan" id="satuan" onChange={(e) =>this.setState({satuan:e.target.value})}>
                  <option>Satuan</option>
                  <option value="Kg">Kg</option>
                  <option value="Buah">Buah</option>
                  <option value="Meter">Meter</option>
                  <option value="Lembar">Lembar</option>
                  <option value="Liter">Liter</option>
                  <option value="Sak">Sak</option>
                  <option value="m3">m3</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Jumlah Barang</Label>
                <Input type="number" id="jumlah" onChange={(e) =>this.setState({jumlah:e.target.value})} placeholder="Jumlah Barang" required />
              </FormGroup>
              <Button type="submit" color="primary">Tambah</Button>
              <Button color="danger" onClick={this.toggleModal.bind(this)}>Batal</Button>
            </Form>
          </ModalBody>  
        </Modal>
        <Modal isOpen={this.state.modalEdit}>
          <ModalHeader>Edit Jumlah Barang</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => {this.onEdit(e)}}>
              <FormGroup>
                <Label htmlFor="name">Jumlah Barang</Label>
                <Input type="number" id="jumlah" onChange={(e) =>this.setState({jumlah:e.target.value})} placeholder="Jumlah Barang" required />
              </FormGroup>
              <Button type="submit" color="primary">Tambah</Button>
              <Button color="danger" onClick={this.toggleModalEdit.bind(this)}>Batal</Button>
            </Form>
          </ModalBody>  
        </Modal>
        <Modal isOpen={this.state.modalDelete}>
          <ModalBody className="text-center">
            <Form onSubmit={(e) => {this.onDelete(e)}}>
              <h5> APAKAH ANDA YAKIN MENGHAPUS ITEM INI ? </h5>
              <Button type="submit" color="primary" className="mr-3">IYA</Button>
              <Button color="danger" onClick={this.toggleModalDelete.bind(this)}>TIDAK</Button>
            </Form>
          </ModalBody>  
        </Modal>
      </div>
    );
  }
}

export default compose( 
  graphql(getRequestQuery, {
    options:(props) => {
      return{
        variables:{
          id: props.match.params.id
        }
      }
    }
  }),
  graphql(getBarangsQuery, {name:"getBarangsQuery"}),
  graphql(getRequestsQuery, {name:"getRequestsQuery"}),
  graphql(getListRequestsQuery, {name:"getListRequestsQuery"}),
  graphql(addListRequestMutation, {name:"addListRequestMutation"}),
  graphql(hapusManyListRequestMutation, {name:"hapusManyListRequestMutation"}),
  
)(EditRequest);
