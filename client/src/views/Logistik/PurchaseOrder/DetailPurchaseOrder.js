import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import Swal from 'sweetalert2';
import {getPurchaseOrderQuery, hapusPurchaseOrderMutation, updateStatusListRequestOnOrder ,updateStatusListItemPurchaseOrder,  hapusManyListItemPurchaseOrder, getPurchaseOrdersQuery, updateStatusPurchaseOrder, getListRequestsQuery} from '../queries/queries';
import { Card, Button, CardBody, CardHeader, Col, Row, Table, Form, FormGroup, Label, Input } from 'reactstrap';

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
              {this.renderElement(purchaseOrder.akun.id, purchaseOrder.status)} 
            </Col>
            <Col>
              {this.renderElement2(purchaseOrder.tanggal_setuju)}
            </Col>
          </Row>
        </CardBody>
      )
    }
  }

  renderElement(akun_id, status){
    if (this.state.akun_id === akun_id && status !== 'Disetujui'){
      return(
        <div align="center">
            <Button onClick={this.onDelete.bind(this, this.props.match.params.id)} color="danger">
              <i className="fa fa-trash">Hapus Permintaan Barang</i>
            </Button>
        </div>
      )
    }
  }

  renderElement2(tanggal){
    if(this.state.divisi ===  "Logistic" && tanggal === ''){
      return(
        <div align="center">
            <Button onClick={this.onSetujuiPurchaseOrder.bind(this, this.props.match.params.id)} color="success">
              <i className="fa fa-check">Setujui Permintaan Barang</i>
            </Button>
            <Button onClick={this.onTolakPurchaseOrder.bind(this, this.props.match.params.id)} color="danger">
              <i className="fa fa-times">Tolak Permintaan Barang</i>
            </Button>
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
  onSetujuiPurchaseOrder(orderid){
    this.props.updateStatusPurchaseOrder({
      variables:{
        id:orderid,
        status: 'Disetujui',
        tanggal_setuju: new Date().toLocaleDateString(),
      },
      refetchQueries:[{query:getPurchaseOrdersQuery}],
    });
    this.props.updateStatusListRequestOnOrder({
      variables:{
        order_id: orderid,
        status: 'Delivery',
      },
      refetchQueries:[{query:getPurchaseOrdersQuery}],
    });
    this.props.updateStatusListItemPurchaseOrder({
      variables:{
        purchaseOrder_id: orderid,
        status: 'Delivery',
      },
      refetchQueries:[{query:getPurchaseOrdersQuery}],
    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Pembelian Barang Disetujui',
      showConfirmButton: true,
    })
  }

  onTolakPurchaseOrder(order_id){
    this.props.updateStatusPurchaseOrder({
      variables:{
        id:order_id,
        status: 'Ditolak',
        tanggal_setuju: new Date().toLocaleDateString(),
      },
      refetchQueries:[{query:getPurchaseOrdersQuery}],
    });
    this.props.updateStatusListRequestOnOrder({
      variables:{
        order_id: order_id,
        status: 'Active',
      },
      refetchQueries:[{query:getPurchaseOrdersQuery}],
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Pembelian Barang Ditolak',
      showConfirmButton: true,
    })
  }

  onDelete(orderid){
    Swal.fire({
      title: 'Apakah anda Yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Saya Yakin!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.hapusPurchaseOrderMutation({
          variables:{
            id: orderid,        
          },
          refetchQueries:[{query:getPurchaseOrdersQuery}],
        });
        this.props.hapusManyListItemPurchaseOrder({
          variables:{
            id: orderid,        
          },
          refetchQueries:[{query:getPurchaseOrdersQuery}],
        });
        this.props.history.push("/purchaseOrder/purchaseOrder");
        Swal.fire(
          'Dihapus!',
          'Pembelian Barang Telah Dihapus',
          'success'
        )
      }
    })
   
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
  graphql(updateStatusPurchaseOrder, {name:"updateStatusPurchaseOrder"}),
  graphql(updateStatusListItemPurchaseOrder, {name:"updateStatusListItemPurchaseOrder"}),
  graphql(updateStatusListRequestOnOrder, {name:"updateStatusListRequestOnOrder"}),
  graphql(getListRequestsQuery, {name:"getListRequestsQuery"}),
  
  
  )(DetailPurchaseOrder);
