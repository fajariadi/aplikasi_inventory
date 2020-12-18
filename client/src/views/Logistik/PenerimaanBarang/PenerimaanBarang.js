import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import { Link} from 'react-router-dom';
import * as compose from 'lodash.flowright';
import Swal from 'sweetalert2';
import {hapusPenerimaanBarang, getPurchaseOrdersQuery, getPenerimaanBarangsQuery, addPenerimaanBarang} from '../queries/queries';
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

class PenerimaanBarang extends Component {

  constructor(props) {
    super(props);
    this.state = {
      akun_id: localStorage.getItem("user_id"),
      nama:'',
      purchase_id:'',
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

  displayPurchaseOrder(){
    var data = this.props.getPurchaseOrdersQuery;
    if(data.loading){
      return (<div>Loading order...</div>);
    } else {
      return data.purchaseOrders.map(order => {
          if(order.status === 'Disetujui'){
            return(
                <option key={order.id} value={order.id}>{order.kode}</option> 
              )
          }
      });
    }
  }

  displayPenerimaanBarang(){
    var data1 = this.props.getPenerimaanBarangsQuery;
    var no = 0;
    if(data1.loading){
      return
    } else {
      return data1.penerimaanBarangs.map(request => {
        no++;
        return(
          <tr key={request.id}>
            <td>{no}</td>
            <td>{request.kode}</td>
            <td>{request.tanggal}</td>
            <td>
              <Link to={`/penerimaanBarang/detailPenerimaanBarang/${request.id}`}>
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

  onDelete(penerimaan_id){
    Swal.fire({
      title: 'Apakah anda Yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Saya Yakin!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.hapusPenerimaanBarang({
          variables:{
            id: penerimaan_id,        
          },
          refetchQueries:[{query:getPenerimaanBarangsQuery}],
        });
        Swal.fire(
          'Dihapus!',
          'Penerimaan Barang Telah Dihapus',
          'success'
        )
      }
    })
  }

  getKodeBaru(){
    var newKode = 'PB';
    var kode = '';
    var nomor = 1;
    var data = this.props.getPenerimaanBarangsQuery;
    data.penerimaanBarangs.map(request => {
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
    if(this.state.purchase_id !== ''){
      this.props.addPenerimaanBarang({
        variables:{
          kode: this.getKodeBaru(),
          tanggal: new Date().toLocaleDateString(),
          akun_id: this.state.akun_id,
          purchase_id: this.state.purchase_id,
        },
        refetchQueries:[{query:getPenerimaanBarangsQuery}],
      });
      this.props.history.push(`/penerimaanBarang/buatPenerimaanBarang/${this.state.purchase_id}`);
    }
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>Penerimaan Barang
                <Button size="sm" color="primary" className="float-right mb-0" onClick={this.toggleModal.bind(this)}>
                  <i className="fa fa-plus"></i> Tambah Penerimaan Barang
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
                  {this.displayPenerimaanBarang()}
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
          <ModalHeader>Pilih Purchase Order</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
              <Label htmlFor="name">Kode Purchase Order</Label>
                <Input type="select" name="id" onChange={(e) =>this.setState({purchase_id:e.target.value})} id="id" required>
                  <option value="">Kode</option>
                  {this.displayPurchaseOrder()}
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
  graphql(getPenerimaanBarangsQuery, {name:"getPenerimaanBarangsQuery"}),
  graphql(getPurchaseOrdersQuery, {name:"getPurchaseOrdersQuery"}),
  graphql(addPenerimaanBarang, {name:"addPenerimaanBarang"}),
  graphql(hapusPenerimaanBarang, {name:"hapusPenerimaanBarang"}),
)(PenerimaanBarang);
