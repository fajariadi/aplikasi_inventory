import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import { Link, Redirect } from 'react-router-dom';
import * as compose from 'lodash.flowright';
import {getPurchaseOrderQuery, getPurchaseOrdersQuery, getPenerimaanBarangsQuery, getPersediaanBarangsQuery} from '../queries/queries';
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

class BuatPenerimaanBarang extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
          return(
            <option key={order.id} value={order.id}>{order.kode}</option>
          )
      });
    }
  }
  displayNewPenerimaanbarang(){
    var data = this.props.getPenerimaanBarangsQuery;
    var tanggal = '';
    var kode='';
    var nama='';
    data.penerimaanBarangs.map(request => {
      return(
        tanggal = request.tanggal,
        kode = request.kode,
        nama = request.akun.karyawan.nama
      );
    });
    return(
        <CardBody>
        <Form className="form-horizontal">
          <Row> 
            <Col md="4">
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="name">Kode Penerimaan Barang</Label>
                </Col>
                <Col md="6">
                <Input type="text" name="kode" id="kode" value={kode} disabled></Input> 
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
            <Col md="4">
              <FormGroup row>
              <Col md="3">
                  <Label htmlFor="name">Penerima</Label>
                </Col>
                <Col md="9">
                <Input type="text" name="kode" id="kode" value={nama} disabled></Input> 
                </Col> 
              </FormGroup>
            </Col>  
          </Row>
        </Form>
        </CardBody>
      
    );
  }

  displayPurchaseOrderDetail(){
    const {purchaseOrder} = this.props.data;
    if(purchaseOrder){
      return(
        <CardBody>
          <Form className="form-horizontal">
          <Row> 
            <Col md="4">
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="name">Kode Purchase Order</Label>
                </Col>
                <Col md="6">
                <Input type="text" name="kode" id="kode" value={purchaseOrder.kode} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>  
            <Col md="4">
              <FormGroup row>
              <Col md="3">
                  <Label htmlFor="name">Nama vendor</Label>
                </Col>
                <Col md="9">
                <Input type="text" name="kode" id="kode" value={purchaseOrder.vendor.nama} disabled></Input> 
                </Col> 
              </FormGroup>
            </Col>  
          </Row>
          
        </Form>
          <hr />
          <Table hover bordered striped responsive size="sm">
            <thead align="center">
              <tr>
                <th>Nama Barang</th>
                <th>Satuan</th>
                <th>Jumlah</th>
              </tr>
            </thead>
            <tbody align="center">
              {
                purchaseOrder.listItemPurchaseOrder.map(item => {
                  return(
                    <tr key={item.id}>
                      <td>{item.nama_barang}</td>
                      <td>{item.satuan}</td>
                      <td>{item.jumlah_barang}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          <div align="center">
            <Link to="/penerimaanBarang/penerimaanBarang">
                <Button onClick={(e) => {this.Submit(purchaseOrder.vendor.jenis_usaha)}} color="primary">Submit</Button>
            </Link>
          </div>
        </CardBody>
      )
    }
  }

  Submit(jenis_usaha){
    var sama = false;
    if(jenis_usaha !== 'Perkakas'){
        var data = this.props.getPersediaanBarangsQuery;
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>Form Buat Penerimaan Barang
                <Link to="/penerimaanBarang/penerimaanBarang" className={'float-right mb-0'}>
                  <Button color="danger">
                      Batal
                  </Button>
                </Link>
              </CardHeader>
              {this.displayNewPenerimaanbarang()}
              {this.displayPurchaseOrderDetail()}
            </Card>
          </Col>
        </Row>
        
      </div>

    );
  }
}

export default compose(
    graphql(getPurchaseOrderQuery, {
        options:(props) => {
          return{
            variables:{
              id: props.match.params.id
            }
          }
        }
      }),
  graphql(getPenerimaanBarangsQuery, {name:"getPenerimaanBarangsQuery"}),
  graphql(getPurchaseOrdersQuery, {name:"getPurchaseOrdersQuery"}),
  graphql(getPersediaanBarangsQuery, {name:"getPersediaanBarangsQuery"}),
  
)(BuatPenerimaanBarang);
