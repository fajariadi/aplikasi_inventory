import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import Swal from 'sweetalert2';
import {getPurchaseOrderQuery, getAllInventarisQuery, hapusPenerimaanBarang, updateJumlahInventaris, getPurchaseOrdersQuery, getPenerimaanBarangsQuery, getPersediaanBarangsQuery, getListRequestsQuery, getBarangsQuery, addPersediaanBarang, updateJumlahPersediaanBarang, updateStatusListRequestOnOrder, updateStatusDonePurchaseOrder} from '../queries/queries';
import { 
  Form,
  CardBody, 
  Col, 
  Row, 
  Table,
  Button,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
      panel1: true,
      panel2: true,
    };
  }

 
  toggleModal(){
    this.setState({
      modalIsOpen: ! this.state.modalIsOpen
    });
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
            <Col md="5">
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
                  <Label htmlFor="name">Penerima</Label>
                </Col>
                <Col md="9">
                <Input type="text" name="kode" id="kode" value={nama} disabled></Input> 
                </Col> 
              </FormGroup>
            </Col>  
            <Col md="3">
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
            <Col md="4">
              <FormGroup row>
              <Col md="3">
                  <Label htmlFor="name">Tanggal Pembelian</Label>
                </Col>
                <Col md="9">
                <Input type="text" name="kode" id="kode" value={purchaseOrder.tanggal_setuju} disabled></Input> 
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
            <Button onClick={this.Submit.bind(this, purchaseOrder.vendor.jenis_usaha)} color="primary">Submit</Button>
          </div>
        </CardBody>
      )
    }
  }
  
  handlePanel1Change = (panel) => (event) => {
    this.setState({
      panel1: ! this.state.panel1
    });
  };
  handlePanel2Change = (panel) => (event) => {
    this.setState({
      panel2: ! this.state.panel2
    });
  };

  Submit(jenis_usaha){
    Swal.fire({
      title: 'Apakah Barang telah Sesuai?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Tidak',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya'
    }).then((result) => {
      if (result.isConfirmed) {
        if(jenis_usaha !== 'Perkakas'){
          const {purchaseOrder} = this.props.data; // eslint-disable-next-line
          purchaseOrder.listItemPurchaseOrder.map(item => {
              var pers_id = '';
              var jumlah1=0;
              var data = this.props.getPersediaanBarangsQuery; // eslint-disable-next-line
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
                  var id1=''; // eslint-disable-next-line
                  var data = this.props.getBarangsQuery; // eslint-disable-next-line
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
            const {purchaseOrder} = this.props.data; // eslint-disable-next-line
            purchaseOrder.listItemPurchaseOrder.map( item => {
                var data = this.props.getAllInventarisQuery;
                var inv_id = '';
                var jumlah1=0; // eslint-disable-next-line
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
                    var id1=''; // eslint-disable-next-line
                    var data = this.props.getBarangsQuery; // eslint-disable-next-line
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
        this.props.history.push("/penerimaanBarang/penerimaanBarang");
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Penerimaan Barang Berhasil Disimpan',
          showConfirmButton: true,
        });
      } else {
        var data = this.props.getPenerimaanBarangsQuery;
        var penerimaan_id='';
        data.penerimaanBarangs.map(request => {
          return(
            penerimaan_id = request.id
          );
        });
        this.props.hapusPenerimaanBarang({
          variables:{
            id: penerimaan_id,        
          },
          refetchQueries:[{query:getPenerimaanBarangsQuery}],
        });
        this.props.history.push("/penerimaanBarang/penerimaanBarang");
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Penerimaan Barang Dibatalkan',
          showConfirmButton: true,
        });
      }
    })
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
           <Col>
            <Accordion square expanded={this.state.panel1} onChange={this.handlePanel1Change()}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            Form Penerimaan Barang
            </AccordionSummary>
            <AccordionDetails>
                <Row>
                  <Col className="text-center">
                    {this.displayNewPenerimaanbarang()}
                  </Col>
                </Row>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={this.state.panel2} onChange={this.handlePanel2Change()}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            Purchase Order Details
            </AccordionSummary>
            <AccordionDetails>
              {this.displayPurchaseOrderDetail()}
            </AccordionDetails>
          </Accordion>
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
  graphql(hapusPenerimaanBarang, {name:"hapusPenerimaanBarang"}),
  
)(BuatPenerimaanBarang);
