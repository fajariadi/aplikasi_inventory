import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import Swal from 'sweetalert2';
import { hapusPermintaanBarangMutation, getPermintaanBarangsQuery, getBarangsQuery, getListRequestsQuery, addListRequestMutation} from '../queries/queries';
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

class BuatPermintaanBarang extends Component {
  constructor(props){
    super(props);
    const username = localStorage.getItem("username")

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
      req_id:'',
      redirect: true,
      selected: '',
      loggedIn,
      modalEditIsOpen: false,
    }
  }

  displayNewRequest(){
    var data = this.props.getPermintaanBarangsQuery;
    var tanggal = '';
    var status = '';
    var divisi='';
    var kode='';
    var nama='';
    data.permintaanBarangs.map(request => {
      return(
        tanggal = request.tanggal,
        status = request.status,
        divisi = request.akun.karyawan.divisi.nama,
        kode = request.kode,
        nama = request.akun.karyawan.nama
      );
    });
    return(
      <div>
        <Form className="form-horizontal">
          <Row> 
            <Col md="4">
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="name">Kode Permintaan</Label>
                </Col>
                <Col md="6">
                <Input type="text" name="kode" id="kode" value={kode} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>  
            <Col md="4">
              <FormGroup row>
              <Col md="3">
                  <Label htmlFor="name">Status</Label>
                </Col>
                <Col md="9">
                <Input type="text" name="kode" id="kode" value={status} disabled></Input> 
                </Col> 
              </FormGroup>
            </Col>  
          </Row>
          <Row>
            <Col md="4">
            <FormGroup row>
            <Col md="6">
                  <Label htmlFor="name">Dibuat Oleh</Label>
                </Col>
                <Col md="6">
                <Input type="text" name="kode" id="kode" value={nama} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>
            <Col md="4">
            <FormGroup row>
               <Col md="3">
                  <Label htmlFor="name">Divisi</Label>
                </Col>
                <Col md="9">
                <Input type="text" name="kode" id="kode" value={divisi} disabled></Input> 
                </Col>  
              </FormGroup>
            </Col>
            <Col md="4">
            <FormGroup row>  
            <Col md="3">
                  <Label htmlFor="name">Tanggal</Label>
                </Col>
                <Col md="9">
                <Input type="text" name="kode" id="kode" value={tanggal} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>
      
    );
  }

  onDelete(){
    var data = this.props.getPermintaanBarangsQuery;
    var request_id = '';
    data.permintaanBarangs.map(request => {
      return(
        request_id = request.id
      );
    });
    this.props.hapusPermintaanBarangMutation({ 
      variables:{
        id: request_id,        
      },
      refetchQueries:[{query:getPermintaanBarangsQuery}],
    });
    this.props.history.push("/permintaanBarang/permintaanBarang");
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
  toggleModalEdit(nama){
    this.setState({
      modalEditIsOpen: ! this.state.modalEditIsOpen,
      selected: nama
    });
  }

  displayEditItem(){
    var nama='';
    var jumlah='';
    var harga=0;
    this.state.requestItems.map(item =>{
      if (item.nama === this.state.selected){
        nama = item.nama
        jumlah=item.jumlah
        harga=item.harga
      }
    })
    return(
      <div>
        <FormGroup>
            <Label htmlFor="name">Nama Barang</Label>
            <Input type="text" name="nama" value={nama} id="nama" disabled>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="name">Jumlah Barang</Label>
            <Input type="number" id="jumlah" defaultValue={jumlah} onChange={(e) =>this.setState({jumlah:e.target.value})} placeholder="Jumlah Barang" required />
          </FormGroup>
      </div>
    )
  }

  addItem(e){
    e.preventDefault();
    this.toggleModal();
    var sama = false;
    var jum = 0; var jenis= ''; var sat=''; var har=0;
    const data = this.props.getBarangsQuery;
    data.barangs.map(bar =>{
      if(bar.nama_barang === this.state.nama){
        jenis = bar.jenis_barang
        sat = bar.satuan
        har = bar.harga
      }
    })
    if(this.state.requestItems.length === 0){
      const newItem = { nama: this.state.nama, jumlah: this.state.jumlah, satuan: sat, jenis: jenis, harga: har};
      this.setState(state => {
        state.requestItems.push(newItem);
      });
    } else {
      this.state.requestItems.map(item => {
        if(item.nama === this.state.nama){
          sama = true;
          jum = parseInt(item.jumlah)+parseInt(this.state.jumlah);
        }
      });
      if (sama === true){
        this.setState(state => ({
          requestItems: state.requestItems.map(
            el => el.nama === this.state.nama? { ...el, jumlah : jum }: el
          )
        
        }))
      } else {
        const newItem = { nama: this.state.nama, jumlah: this.state.jumlah, satuan: sat, jenis: jenis, harga: har};
        this.setState(state => {
          state.requestItems.push(newItem);
        });
      }
    }
    
  }


  submitRequest = (e) => {
    if(this.state.requestItems.length === 0){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Permintaan Barang error',
        text: 'Silahkan pilih barang',
        showConfirmButton: true,
      })
    } else {

      var data = this.props.getPermintaanBarangsQuery;
      var request_id = '';
      data.permintaanBarangs.map(request => {
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
              harga: item.harga,
              status: 'Waiting',
            },
            refetchQueries:[{query:getPermintaanBarangsQuery}, {query:getListRequestsQuery}],
          })
        );
      });
      this.props.history.push("/permintaanBarang/permintaanBarang");
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Permintaan Barang Berhasil Disimpan',
        showConfirmButton: true,
      })
    }
  }

  onDeleteItem(nama){
      let filteredArray = this.state.requestItems.filter(item => item.nama !== nama)
      this.setState({requestItems: filteredArray});
  }

  onUpdateItem(e){
    e.preventDefault();
    this.toggleModalEdit();
    this.setState(state => ({
      requestItems: state.requestItems.map(
        el => el.nama === this.state.selected? { ...el, jumlah : this.state.jumlah}: el
      )
    
    }))
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
                Form Permintaan Barang
                <Link to="/permintaanBarang/permintaanBarang" className={'float-right mb-0'}>
                  <Button color="danger" onClick={this.onDelete.bind(this)}>
                      Batal
                  </Button>
                </Link>
              </CardHeader>
              <CardBody>
               <Form onSubmit={(e) => {this.addItem(e)}}>
                <Row form>
                  <Col className="text-center">
                    {this.displayNewRequest()}
                  </Col>
                  <Col md="2">
                    
                  </Col>
                </Row>
                
                </Form>
                <hr />
                <Row>
                  <Col>
                    <h5>Daftar Barang</h5>
                  </Col>
                  <Col >
                    <Button onClick={this.toggleModal.bind(this)} size="sm" color="success" className={'float-right mb-0'}><i className="fa fa-plus-circle"></i> Tambah Barang</Button>
                  </Col>
                </Row>
                  <Table hover bordered striped responsive size="sm">
                    <thead align="center">
                    <tr>
                      <th>Nama Barang</th>
                      <th>Jumlah</th>
                      <th>Satuan</th>
                      <th>Jenis Barang</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody align="center">
                      {
                         this.state.requestItems.map(item => {
                          return(
                            <tr>
                              <td>{item.nama}</td>
                              <td>{item.jumlah}</td>
                              <td>{item.satuan}</td>
                              <td>{item.jenis}</td>
                              <td>
                                <Button onClick={this.toggleModalEdit.bind(this, item.nama)} color="success" size="sm">
                                  <i className="fa fa-pencil"></i>
                                </Button>
                              </td>
                              <td>
                                <Button onClick={this.onDeleteItem.bind(this, item.nama)} color="danger" size="sm">
                                  <i className="fa fa-trash"></i>
                                </Button>
                              </td>
                            </tr>
                          ) 
                         })
                      }
                    </tbody>
                  </Table>
                  <br />
                  <div align="center">  
                    <Button onClick={(e) => {this.submitRequest(e)}} color="primary">Submit</Button>
                  </div>
              </CardBody>
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
                <Label htmlFor="name">Jumlah Barang</Label>
                <Input type="number" id="jumlah" onChange={(e) =>this.setState({jumlah:e.target.value})} placeholder="Jumlah Barang" required />
              </FormGroup>
              <Button type="submit" color="primary">Tambah</Button>
              <Button color="danger" onClick={this.toggleModal.bind(this)}>Batal</Button>
            </Form>
          </ModalBody>  
        </Modal>
        <Modal isOpen={this.state.modalEditIsOpen}>
          <ModalHeader>Form Edit Item</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => {this.onUpdateItem(e)}}>
              {this.displayEditItem()}
              <Button type="submit" color="primary">Simpan</Button>
              <Button color="danger" onClick={this.toggleModalEdit.bind(this)}>Batal</Button>
            </Form>
          </ModalBody>  
        </Modal>
      </div>
    );
  }
}

export default compose( 
  graphql(getBarangsQuery, {name:"getBarangsQuery"}),
  graphql(getPermintaanBarangsQuery, {name:"getPermintaanBarangsQuery"}),
  graphql(getListRequestsQuery, {name:"getListRequestsQuery"}),
  graphql(addListRequestMutation, {name:"addListRequestMutation"}),
  graphql(hapusPermintaanBarangMutation, {name:"hapusPermintaanBarangMutation"}),
  
)(BuatPermintaanBarang);
