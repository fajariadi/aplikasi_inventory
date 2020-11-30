import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getVendorsQuery, getPurchaseOrdersQuery, addListItemPurchaseOrder, updateAllStatusListRequest, getListRequestsQuery, updateVendorPurchaseOrderMutation, hapusPurchaseOrderMutation} from '../queries/queries';
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
  Input
} from 'reactstrap';

class BuatPurchaseOrder extends Component {
  constructor(props){
    super(props);
    this.state = {
      orderItems: [],
      kode:'',
      status: 'Active',
      satuan:'',
      jenis:'',
      orderid:'',
      jenis_usaha:'',
    }
  }

  displayNewPurchaseOrder(){
    var data = this.props.getPurchaseOrdersQuery;
    var tanggal = '';
    var status = '';
    var kode='';
    var nama='';
    var id='';
    data.purchaseOrders.map(order => {
      return(
        tanggal = order.tanggal,
        status = order.status,
        kode = order.kode,
        nama = order.akun.karyawan.nama,
        id = order.id
      );
    });
    return(
      <div>
        <Form className="form-horizontal">
          <Row> 
            <Col md="4">
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="name">Kode Purchase Order</Label>
                </Col>
                <Col md="8">
                <Input type="text" name="kode" id="kode" value={kode} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>  
            <Col md="4">
              <FormGroup row>
              <Col md="4">
                  <Label htmlFor="name">Status</Label>
                </Col>
                <Col md="8">
                <Input type="text" name="kode" id="kode" value={status} disabled></Input> 
                </Col> 
              </FormGroup>
            </Col>    
          </Row>
          <Row>
          <Col md="4">
              <FormGroup row>
              <Col md="4">
                  <Label htmlFor="name">Dibuat Oleh</Label>
                </Col>
                <Col md="8">
                  <Input type="text" name="kode" id="kode" value={nama} disabled></Input> 
                </Col> 
              </FormGroup>
            </Col>  
            <Col md="4">
              <FormGroup row>
              <Col md="4">
                  <Label htmlFor="name">Tanggal</Label>
                </Col>
                <Col md="8">
                  <Input type="text" name="kode" id="kode" value={tanggal} disabled></Input> 
                </Col> 
              </FormGroup>
            </Col> 
            <Col md="4">
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="name">Vendor</Label>
              </Col>
              <Col md="8">
                <Input type="select" name="vendor" id="vendor" onChange={(e) =>this.updateVendorPurchaseOrder(id, e.target.value)}>
                  <option >Pilih Vendor</option>
                  {this.displayVendor()} 
                </Input>
              </Col> 
            </FormGroup>
            </Col>
          </Row>
          </Form>
      </div>
      
    );
  }

  updateVendorPurchaseOrder(order_id, vendor){
    var id = vendor.substring(0,24);
    var jenis = vendor.substring(25);
    this.setState({jenis_usaha: jenis});
    this.setState({orderid: order_id});
    this.props.updateVendorPurchaseOrderMutation({
      variables:{
        id:order_id,
        vendor_id: id,
      },
      refetchQueries:[{query:getPurchaseOrdersQuery}],
    });
  }

  displayListPermintaanBarang(){
    var items = [];
    var total = 0;
    if(this.state.jenis_usaha !== ''){
      var data = this.props.getListRequestsQuery;
      if(JSON.stringify(data) !== '{}') {
        return data.listrequests.map(barang => {
          if(barang.jenis === this.state.jenis_usaha){
            if(barang.status === 'Active'){
              var har = 0;
              var sama = false; var jum = 0;
              if(items.length === 0){
                har = parseInt(barang.jumlah_barang)*parseInt(barang.harga);
                total = total+har;
                const newItem = { nama: barang.nama_barang, jumlah: barang.jumlah_barang, satuan: barang.satuan, jenis: barang.jenis, harga: har};
                items.push(newItem);
              } else {
                items.map(item => {
                  if(item.nama === barang.nama_barang){
                    sama = true;
                    jum = parseInt(item.jumlah)+parseInt(barang.jumlah_barang);
                  }
                });
                if (sama === true){
                  var hrg=0;
                   har = parseInt(barang.jumlah_barang)*parseInt(barang.harga);
                   items.map(item =>{
                     if (item.nama === barang.nama_barang){
                       hrg = har + item.harga
                     }
                   })
                   total = total+har;
                    items = items.map(
                      el => el.nama === barang.nama_barang? { ...el, jumlah : jum}: el
                    )
                    items = items.map(
                      el => el.nama === barang.nama_barang? { ...el, harga : hrg}: el
                    )
                } else {
                  har = parseInt(barang.jumlah_barang)*parseInt(barang.harga);
                  total = total+har;
                  const newItem = { nama: barang.nama_barang, jumlah: barang.jumlah_barang, satuan: barang.satuan, jenis: barang.jenis, harga: har};
                  items.push(newItem);
                }
              }
              return (
                <tr key={barang.id}>
                  <td>{barang.nama_barang}</td>
                  <td>{barang.satuan}</td>
                  <td>{barang.jumlah_barang}</td>
                  <td>{barang.harga}</td>
                  <td>{har}</td>
                </tr>
              )
              }
            }
          }
        )
      } else {
        return(
          <div align="center">Tidak Ada Barang yang Perlu Dibeli</div>
        )
      }
    } else{
      return(
        <div align="center">Pilih Vendor</div>
      )
    }
  }

   displayVendor(){
    var data = this.props.getVendorsQuery;
    if(data.loading){
      return (<div>Loading Divisi...</div>);
    } else {
      return data.vendors.map(vendor => {
        return(
          <option key={vendor.id} value={[vendor.id, vendor.jenis_usaha]}>{vendor.nama}</option>
        );
      });
    }
  }

  onDelete(){
    var data = this.props.getPurchaseOrdersQuery;
    var order_id = '';
    data.purchaseOrders.map(order => {
      return(
        order_id = order.id
      );
    });
    this.props.hapusPurchaseOrderMutation({
      variables:{
        id: order_id,        
      },
      refetchQueries:[{query:getPurchaseOrdersQuery}],
    });
  }

  createListPurchaseOrder(){
    var items = [];
    var total = 0;
    if(this.state.jenis_usaha !== ''){
      var data = this.props.getListRequestsQuery; 
      if(JSON.stringify(data) !== '{}') {
        data.listrequests.map(barang => {
          if(barang.jenis === this.state.jenis_usaha){
            if(barang.status === 'Active'){
                var har = 0;
                var sama = false; var jum = 0;
                if(items.length === 0){
                  har = parseInt(barang.jumlah_barang)*parseInt(barang.harga);
                  total = total+har;
                  const newItem = { nama: barang.nama_barang, jumlah: barang.jumlah_barang, satuan: barang.satuan, jenis: barang.jenis, harga: har};
                  items.push(newItem);
                } else {
                  items.map(item => {
                    if(item.nama === barang.nama_barang){
                      sama = true;
                      jum = parseInt(item.jumlah)+parseInt(barang.jumlah_barang);
                    }
                  });
                  if (sama === true){
                    var hrg=0;
                     har = parseInt(barang.jumlah_barang)*parseInt(barang.harga);
                     items.map(item =>{
                       if (item.nama === barang.nama_barang){
                         hrg = har + item.harga
                       }
                     })
                     total = total+har;
                      items = items.map(
                        el => el.nama === barang.nama_barang? { ...el, jumlah : jum}: el
                      )
                      items = items.map(
                        el => el.nama === barang.nama_barang? { ...el, harga : hrg}: el
                      )
                  } else {
                    har = parseInt(barang.jumlah_barang)*parseInt(barang.harga);
                    total = total+har;
                    const newItem = { nama: barang.nama_barang, jumlah: barang.jumlah_barang, satuan: barang.satuan, jenis: barang.jenis, harga: har};
                    items.push(newItem);
                  }
                }
            }
            
          }
        })
      } 
      console.log(items); 
      var data = this.props.getPurchaseOrdersQuery;
                var orderid = '';
                data.purchaseOrders.map(request => {
                    return(
                      orderid = request.id
                    );
                });
                
                items.map(item => {
                  return(
                    this.props.updateAllStatusListRequest({
                      variables:{
                        nama: item.nama,
                        status: "Proses",
                        order_id: orderid,
                      },
                      refetchQueries:[{query:getPurchaseOrdersQuery}],
                    })
                  )
                })
                items.map(item => {
                  return(
                    this.props.addListItemPurchaseOrder({
                      variables:{
                        nama_barang: item.nama,
                        jumlah_barang: parseInt(item.jumlah),
                        satuan: item.satuan,
                        jenis: item.jenis,
                        purchaseOrder_id: orderid,
                        harga: parseInt(item.harga),
                        status: 'Waiting',
                      },
                      refetchQueries:[{query:getPurchaseOrdersQuery}, {query:getListRequestsQuery}],
                    })
                  );
                });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Form Buat Purchase Order
                <Link to="/purchaseOrder/purchaseOrder" className={'float-right mb-0'}>
                  <Button color="danger" onClick={this.onDelete.bind(this)}>
                      Batal
                  </Button>
                </Link>
              </CardHeader>
              <CardBody>
                {this.displayNewPurchaseOrder()}
                <hr />
                <Row align="center">
                  <h5>Daftar Kebutuhan Barang</h5>
                </Row>
                <Table hover bordered striped responsive size="sm">
                  <thead align="center">
                    <tr>
                      <th>Nama Barang</th>
                      <th>Satuan</th>
                      <th>Jumlah</th>
                      <th>Harga</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody align="center">
                  {this.displayListPermintaanBarang()}
                  </tbody>
                  </Table>
                  <div align="center">
                    <Link to="/purchaseOrder/purchaseOrder">
                    <Button onClick={(e) => {this.createListPurchaseOrder(e)}} color="primary">Submit</Button>
                    </Link>
                  </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </div>

    );
  }
}

export default compose(
  
  graphql(getVendorsQuery, {name:"getVendorsQuery"}),
  graphql(getPurchaseOrdersQuery, {name:"getPurchaseOrdersQuery"}),
  graphql(getListRequestsQuery, {name:"getListRequestsQuery"}),
  graphql(updateAllStatusListRequest, {name:"updateAllStatusListRequest"}),
  graphql(updateVendorPurchaseOrderMutation, {name:"updateVendorPurchaseOrderMutation"}),
  graphql(addListItemPurchaseOrder, {name:"addListItemPurchaseOrder"}),
  graphql(hapusPurchaseOrderMutation, {name:"hapusPurchaseOrderMutation"}),
  
  
)(BuatPurchaseOrder);
