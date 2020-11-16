import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import {getPurchaseOrderQuery, hapusPurchaseOrderMutation, hapusManyListItemPurchaseOrder, getPurchaseOrdersQuery} from '../queries/queries';
import { Card, Button, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Form, FormGroup, Label, Input } from 'reactstrap';

class DetailPurchaseOrder extends Component {
  constructor(props){
    super(props);
    const username= localStorage.getItem("username")

    let loggedIn = true 
      if(username == null){
        loggedIn = false
      }
    this.state = {
      loggedIn,
      akun_id: localStorage.getItem("user_id"),
      divisi: localStorage.getItem("divisi"),
      }
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
                  <Label htmlFor="name">Status</Label>
                </Col>
                <Col md="9">
                <Input type="text" name="kode" id="kode" value={purchaseOrder.status} disabled></Input> 
                </Col> 
              </FormGroup>
            </Col>  
            {this.renderElement3(purchaseOrder.status, purchaseOrder.tanggal_setuju)}
          </Row>
          <Row>
          <Col md="4">
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="name">Nama Vendor</Label>
                </Col>
                <Col md="6">
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
                <th>Harga</th>
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
                      <td>{item.harga}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          <hr />
          <Row>
            <Col>
              {this.renderElement(purchaseOrder.akun.id)} 
            </Col>
            <Col>
              {this.renderElement2(purchaseOrder.tanggal_setuju)}
            </Col>
          </Row>
        </CardBody>
      )
    }
  }

  renderElement(akun_id){
    if (this.state.akun_id === akun_id){
      return(
        <div align="center">
        <Link>
          <Button color="warning">
            <i className="fa fa-pencil" >Edit Permintaan Barang</i>
            </Button>
        </Link>
        <Link to="/purchaseOrder/purchaseOrder">
          <Button onClick={this.onDelete.bind(this, this.props.match.params.id)} color="danger">
            <i className="fa fa-trash">Hapus Permintaan Barang</i>
          </Button>
        </Link>
      </div>
      )
    }
  }

  renderElement2(tanggal){
    if(this.state.divisi ===  "Logistic" && tanggal === ''){
      return(
        <div align="center">
          <Link>
            <Button onClick={this.onSetujuiPermintaan.bind(this, this.props.match.params.id)} color="success">
              <i className="fa fa-check">Setujui Permintaan Barang</i>
            </Button>
          </Link>
          <Link >
            <Button onClick={this.onTolakPermintaan.bind(this, this.props.match.params.id)} color="danger">
              <i className="fa fa-times">Tolak Permintaan Barang</i>
            </Button>
          </Link>
        </div> 
      )
    }
  }
  renderElement3(status, tanggal){
    if(status === 'Disetujui' || status === 'Ditolak'){
      return(
        <Col md="4">
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="name">Tanggal Diproses</Label>
            </Col>
            <Col md="9">
              <Input type="text" name="kode" id="kode" value={tanggal} disabled></Input> 
            </Col> 
          </FormGroup>
        </Col> 
      )
    } 
  }
  onSetujuiPermintaan(order_id){
    this.props.updateStatusPurchaseorder({
      variables:{
        id:order_id,
        status: 'Disetujui',
        tanggal_setuju: new Date().toLocaleDateString(),
      },
      refetchQueries:[{query:getPurchaseOrdersQuery}],
    });
  }

  onTolakPermintaan(order_id){
    this.props.updateStatusPermintaanBarang({
      variables:{
        id:order_id,
        status: 'Ditolak',
        tanggal_setuju: new Date().toLocaleDateString(),
      },
      refetchQueries:[{query:getPurchaseOrdersQuery}],
    });
  }

  onDelete(order_id){
    this.props.hapusPurchaseOrderMutation({
      variables:{
        id: order_id,        
      },
      refetchQueries:[{query:getPurchaseOrdersQuery}],
    });
    this.props.hapusManyListItemPurchaseOrder({
      variables:{
        id: order_id,        
      },
      refetchQueries:[{query:getPurchaseOrdersQuery}],
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Purchase Order
                <Link to="/purchaseOrder/purchaseOrder" className={'float-right mb-0'}>
                  <Button color="secondary">
                      Kembali
                  </Button>
                </Link>
              </CardHeader>
              <CardBody>
              {this.displayPurchaseOrderDetail()}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default compose (
  graphql(getPurchaseOrderQuery, {
    options:(props) => {
      return{
        variables:{
          id: props.match.params.id
        }
      }
    }
  }),
  graphql(getPurchaseOrdersQuery, {name:"getPurchaseOrdersQuery"}),
  graphql(hapusPurchaseOrderMutation, {name:"hapusPurchaseOrderMutation"}),
  graphql(hapusManyListItemPurchaseOrder, {name:"hapusManyListItemPurchaseOrder"}),
  
  )(DetailPurchaseOrder);
