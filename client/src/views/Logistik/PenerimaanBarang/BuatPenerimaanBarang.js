import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import { Link } from 'react-router-dom';
import * as compose from 'lodash.flowright';
import {getPurchaseOrderQuery, getAllInventarisQuery, updateJumlahInventaris, getPurchaseOrdersQuery, getPenerimaanBarangsQuery, getPersediaanBarangsQuery, getListRequestsQuery, getBarangsQuery, addPersediaanBarang, updateJumlahPersediaanBarang, updateStatusListRequestOnOrder, updateStatusDonePurchaseOrder} from '../queries/queries';
import { 
  Form,
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
  Row, 
  Table,
  Button,
  FormGroup,
  Label,
  Input,
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
                <Button onClick={this.Submit.bind(this, purchaseOrder.vendor.jenis_usaha)} color="primary">Submit</Button>
            </Link>
          </div>
        </CardBody>
      )
    }
  }

  Submit(jenis_usaha){
    if(jenis_usaha !== 'Perkakas'){
        const {purchaseOrder} = this.props.data;
        purchaseOrder.listItemPurchaseOrder.map(item => {
            var pers_id = '';
            var jumlah1=0;
            var data = this.props.getPersediaanBarangsQuery;
            data.persediaanBarangs.map(stock => {
                if (item.nama_barang === stock.barang.nama_barang){
                    pers_id = stock.barang.id
                    jumlah1 = stock.jumlah
                }
            });   
            if(pers_id !== ''){
                this.props.updateJumlahPersediaanBarang({
                    variables:{
                      barang_id: pers_id,
                      jumlah: parseInt(item.jumlah_barang)+parseInt(jumlah1),
                    },
                    refetchQueries:[{query:getPersediaanBarangsQuery}],
                });
            } else {
                var id1='';
                var data = this.props.getBarangsQuery;
                data.barangs.map(bar => {
                    if(item.nama_barang === bar.nama_barang){
                        id1 = bar.id
                    }
                });
                this.props.addPersediaanBarang({
                    variables:{
                      barang_id: id1,
                      jumlah: parseInt(item.jumlah_barang),
                      status: 'Available',
                    },
                    refetchQueries:[{query:getPersediaanBarangsQuery}],
                });
            }
        });
    } else {
        const {purchaseOrder} = this.props.data;
        purchaseOrder.listItemPurchaseOrder.map( item => {
            var data = this.props.getAllInventarisQuery;
            var inv_id = '';
            var jumlah1=0;
            data.allInventaris.map (inv => {
                if (item.nama_barang === inv.barang.nama_barang){
                    inv_id = inv.barang.id
                    jumlah1 = inv.jumlah
                }
            });
            if(inv_id !== ''){
                this.props.updateJumlahInventaris({
                    variables:{
                      barang_id: inv_id,
                      jumlah: parseInt(item.jumlah_barang)+parseInt(jumlah1),
                    },
                    refetchQueries:[{query:getAllInventarisQuery}],
                });
            } else {
                var id1='';
                var data = this.props.getBarangsQuery;
                data.barangs.map(bar => {
                    if(item.nama_barang === bar.nama_barang){
                        id1 = bar.id
                    }
                });
                this.props.addInventaris({
                    variables:{
                      barang_id: id1,
                      jumlah: parseInt(item.jumlah_barang),
                      status: 'Available',
                      jumlah_dipakai: 0,
                      jumlah_diperbaiki: 0,
                    },
                    refetchQueries:[{query:getAllInventarisQuery}]
                  });
            }
        });
    }
    this.props.updateStatusDonePurchaseOrder({
        variables:{
            id: this.props.match.params.id,
            status: 'Done',
          },
          refetchQueries:[{query:getPurchaseOrdersQuery}],
    });
    this.props.updateStatusListRequestOnOrder({
        variables:{
            order_id: this.props.match.params.id,
            status: 'Ready',
          },
          refetchQueries:[{query:getListRequestsQuery}],
    });
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
  graphql(getListRequestsQuery, {name:"getListRequestsQuery"}),
  graphql(getBarangsQuery, {name:"getBarangsQuery"}),
  graphql(getAllInventarisQuery, {name:"getAllInventarisQuery"}),
  graphql(addPersediaanBarang, {name:"addPersediaanBarang"}),
  graphql(updateJumlahPersediaanBarang, {name:"updateJumlahPersediaanBarang"}),
  graphql(updateJumlahInventaris, {name:"updateJumlahInventaris"}),
  graphql(updateStatusListRequestOnOrder, {name:"updateStatusListRequestOnOrder"}),
  graphql(updateStatusDonePurchaseOrder, {name:"updateStatusDonePurchaseOrder"}),
  
)(BuatPenerimaanBarang);
