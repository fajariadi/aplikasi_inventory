import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import { Link} from 'react-router-dom';
import * as compose from 'lodash.flowright';
import Swal from 'sweetalert2';
import {hapusPengeluaranBarang, getPermintaanBarangsQuery, getPengeluaranBarangsQuery, addPengeluaranBarang} from '../queries/queries';
import { 
  Form,
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
  Pagination, 
  PaginationItem, 
  PaginationLink, 
  Row, 
  Table,
  Button,
  FormGroup,
  Label,
  Input,
  Modal, ModalBody, ModalHeader
} from 'reactstrap';

class PengeluaranBarang extends Component {

  constructor(props) {
    super(props);
    this.state = {
      akun_id: localStorage.getItem("user_id"),
      nama:'',
      permintaan_id:'',
      jumlah: 0,
      modalIsOpen: false,  
      harga: 0,
      sewa: 0,
    };
  }

 
  toggleModal(){
    this.setState({
      modalIsOpen: ! this.state.modalIsOpen
    });
  }

  displayPermintaanBarangs(){
    var data = this.props.getPermintaanBarangsQuery;
    if(data.loading){
      return (<div>Loading Permintaan...</div>);
    } else { // eslint-disable-next-line
    return  data.permintaanBarangs.map(permintaan => {
        var lanjut = true;
          if(permintaan.status === 'Disetujui'){ // eslint-disable-next-line
            permintaan.listRequest.map(item => {
              if(item.status !== 'Ready'){
                lanjut = false;
              }
            })
            if(lanjut){
              return(
                  <option key={permintaan.id} value={permintaan.id}>{permintaan.kode}</option>
                )
            }
          }
      });
    }
  }

  displayPengeluaranBarang(){
    var data1 = this.props.getPengeluaranBarangsQuery;
    var no = 0;
    if(data1.loading){
      return
    } else {
      return data1.pengeluaranBarangs.map(request => {
        no++;
        return(
          <tr key={request.id}>
            <td>{no}</td>
            <td>{request.kode}</td>
            <td>{request.tanggal}</td>
            <td>
              <Link to={`/pengeluaranBarang/detailPengeluaranBarang/${request.id}`}>
              <Button color="primary" size="sm">
                <i className="fa fa-file"></i>
                </Button>
              </Link>
            </td>
            <td>
              <Button onClick={this.onDelete.bind(this, request.id)} color="danger" size="sm">
                <i className="fa fa-trash"></i>
              </Button>
            </td>
          </tr>
        );
      });
    }
  }

  onDelete(pengeluaran_id){
    Swal.fire({
      title: 'Apakah anda Yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Saya Yakin!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.hapusPengeluaranBarang({
          variables:{
            id: pengeluaran_id,        
          },
          refetchQueries:[{query:getPengeluaranBarangsQuery}],
        });
        Swal.fire(
          'Dihapus!',
          'Data Barang Telah Dihapus',
          'success'
        )
      }
    })
    
  }

  getKodeBaru(){
    var newKode = 'PE';
    var kode = '';
    var nomor = 1;
    var data = this.props.getPengeluaranBarangsQuery; // eslint-disable-next-line
    data.pengeluaranBarangs.map(request => {
      if(request.kode !== ''){
        kode = request.kode
      } 
    })
    if(kode !== ''){
      nomor = parseInt(kode.substring(2,5))+1
    }
    if(nomor < 10){
      kode = newKode+"00"+nomor;
    }else if (nomor >= 10 && nomor < 100){
      kode = newKode+"0"+nomor;
    }else {
      kode = newKode+""+nomor;
    }
    return kode;
  }

  submit(){
    if(this.state.permintaan_id !== ''){
      this.props.addPengeluaranBarang({
        variables:{
          kode: this.getKodeBaru(),
          tanggal: new Date().toLocaleDateString(),
          akun_id: this.state.akun_id,
          permintaan_id: this.state.permintaan_id,
        },
        refetchQueries:[{query:getPengeluaranBarangsQuery}],
      });
      this.props.history.push(`/pengeluaranBarang/buatPengeluaranBarang/${this.state.permintaan_id}`);
    }
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>Pengeluaran Barang
                <Button size="sm" color="primary" className="float-right mb-0" onClick={this.toggleModal.bind(this)}>
                  <i className="fa fa-plus"></i> Buat Pengeluaran Barang
                </Button>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead align="center">
                  <tr>
                    <th>No</th>
                    <th>Kode</th>
                    <th>Tanggal</th>
                    <th>Detail</th>
                    <th>Hapus</th>
                  </tr>
                  </thead>
                  <tbody align="center">
                  {this.displayPengeluaranBarang()}
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.modalIsOpen}>
          <ModalHeader>Pilih Permintaangeluaran</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup> 
              <Label htmlFor="name">Kode Permintaan Barang</Label>
                <Input type="select" name="id" onChange={(e) =>this.setState({permintaan_id:e.target.value})} id="id" required>
                  <option vlaue="">Kode</option>
                  {this.displayPermintaanBarangs()}
                </Input>
              </FormGroup>
                <Button type="submit" color="primary" onClick={this.submit.bind(this)}>Submit</Button>   
              <Button color="danger" onClick={this.toggleModal.bind(this)}>Batal</Button>
            </Form>
          </ModalBody>  
        </Modal>
      </div>
    ); 
  }
}

export default compose(
  graphql(getPengeluaranBarangsQuery, {name:"getPengeluaranBarangsQuery"}),
  graphql(getPermintaanBarangsQuery, {name:"getPermintaanBarangsQuery"}),
  graphql(addPengeluaranBarang, {name:"addPengeluaranBarang"}),
  graphql(hapusPengeluaranBarang, {name:"hapusPengeluaranBarang"}),
)(PengeluaranBarang);
