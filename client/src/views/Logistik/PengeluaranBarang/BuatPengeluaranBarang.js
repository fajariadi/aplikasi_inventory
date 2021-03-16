import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import Swal from 'sweetalert2';
import {getPermintaanBarangQuery, updateStatusDoneListRequest, hapusPengeluaranBarang, hapusPersediaanBarang,  getAllInventarisQuery, updateJumlahDipakaiInventaris, getPermintaanBarangsQuery, getPengeluaranBarangsQuery, getPersediaanBarangsQuery, getListRequestsQuery, getBarangsQuery, addPersediaanBarang, updateJumlahPersediaanBarang, updateStatusDonePermintaanBarang} from '../queries/queries';
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

class BuatPengeluaranBarang extends Component {

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

  displayNewPengeluaranBarang(){
    var data = this.props.getPengeluaranBarangsQuery;
    var tanggal = '';
    var kode='';
    var nama='';
    data.pengeluaranBarangs.map(request => {
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
                  <Label htmlFor="name">Kode Pengeluaran Barang</Label>
                </Col>
                <Col md="6">
                <Input type="text" name="kode" id="kode" value={kode} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup row>
              <Col md="3">
                  <Label htmlFor="name">Dikeluarkan Oleh</Label>
                </Col>
                <Col md="9">
                <Input type="text" name="kode" id="kode" value={nama} disabled></Input> 
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
        </CardBody>
      
    );
  }

  displayPermintaanBarangDetail(){
    const {permintaanBarang} = this.props.data;
    if(permintaanBarang){
      return(
        <CardBody>
          <Form className="form-horizontal">
          <Row> 
            <Col md="4">
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="name">Kode Permintaan Barang</Label>
                </Col>
                <Col md="6">
                <Input type="text" name="kode" id="kode" value={permintaanBarang.kode} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>  
            <Col md="4">
              <FormGroup row>
              <Col md="3">
                  <Label htmlFor="name">Divisi</Label>
                </Col>
                <Col md="9">
                <Input type="text" name="kode" id="kode" value={permintaanBarang.divisi.nama} disabled></Input> 
                </Col> 
              </FormGroup>
            </Col>  
            <Col md="4">
              <FormGroup row>
              <Col md="3">
                  <Label htmlFor="name">Tanggal</Label>
                </Col>
                <Col md="9">
                <Input type="text" name="kode" id="kode" value={permintaanBarang.tanggal} disabled></Input> 
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
                permintaanBarang.listRequest.map(item => {
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
        </CardBody>
      )
    }
  }

  Submit(){
    const {permintaanBarang} = this.props.data; // eslint-disable-next-line
    permintaanBarang.listRequest.map(item => {
        if(item.jenis !== 'Perkakas'){
            var data = this.props.getPersediaanBarangsQuery;
            var jumlah1 = 0; var per_id=''; // eslint-disable-next-line
            data.persediaanBarangs.map(stock => {
                if (item.nama_barang === stock.barang.nama_barang){
                    per_id = stock.barang.id
                    jumlah1 = stock.jumlah
                }
            });  
            if ( jumlah1 > item.jumlah_barang){
              this.props.updateJumlahPersediaanBarang({
                variables:{
                  barang_id: per_id,
                  jumlah: parseInt(jumlah1)-parseInt(item.jumlah_barang),
                },
                refetchQueries:[{query:getPersediaanBarangsQuery}],
              });
            } else {
              this.props.hapusPersediaanBarang({
                variables:{
                  barang_id: per_id,        
                },
                refetchQueries:[{query:getPersediaanBarangsQuery}],
              })
            }   
        } else { // eslint-disable-next-line
            var data = this.props.getAllInventarisQuery;
            var inv_id = ''; // eslint-disable-next-line
            data.allInventaris.map (inv => {
                if (item.nama_barang === inv.barang.nama_barang){
                    inv_id = inv.barang.id
                }
            });
            this.props.updateJumlahDipakaiInventaris({
                variables:{
                  barang_id: inv_id,
                  jumlah_dipakai: parseInt(item.jumlah_barang),
                },
                refetchQueries:[{query:getAllInventarisQuery}],
            });
        }
    });
    this.props.updateStatusDonePermintaanBarang({
        variables:{
            id: this.props.match.params.id,
            status: 'Done',
          },
          refetchQueries:[{query:getPermintaanBarangsQuery}],
    });
    this.props.updateStatusDoneListRequest({
      variables:{
          request_id: this.props.match.params.id,
          status: 'Done',
        },
        refetchQueries:[{query:getListRequestsQuery}],
  });
    this.props.history.push("/pengeluaranBarang/pengeluaranBarang");
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Pengeluaran Barang Berhasil Disimpan',
      showConfirmButton: true,
    })
  }

  onDelete(){
    var data = this.props.getPengeluaranBarangsQuery;
    var pengeluaran_id = '';
    data.pengeluaranBarangs.map(request => {
      return(
        pengeluaran_id = request.id
      );
    });
    this.props.hapusPengeluaranBarang({
      variables:{
        id: pengeluaran_id,        
      },
      refetchQueries:[{query:getPengeluaranBarangsQuery}],
    });
    this.props.history.push("/pengeluaranBarang/pengeluaranBarang");
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
            Form Pengeluaran Barang
            </AccordionSummary>
            <AccordionDetails>
              <Form onSubmit={(e) => {this.addItem(e)}}>
                <Row form>
                  <Col className="text-center">
                  {this.displayNewPengeluaranBarang()}
                  </Col>
                </Row>
              </Form>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={this.state.panel2} onChange={this.handlePanel2Change()}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            Detail Permintaan Barang
            </AccordionSummary>
            <AccordionDetails>
            {this.displayPermintaanBarangDetail()}
            </AccordionDetails>
          </Accordion>
          <div align="center">  
            <Button onClick={(e) => { this.Submit(e) }} color="primary" size="sm">Submit</Button>
            <Button color="danger" onClick={this.onDelete.bind(this)} size="sm">Batal</Button>
          </div> 
              
            
          </Col>
        </Row>
        
      </div>

    );
  }
}

export default compose(
    graphql(getPermintaanBarangQuery, {
        options:(props) => {
          return{
            variables:{
              id: props.match.params.id
            }
          }
        }
      }),
  graphql(getPengeluaranBarangsQuery, {name:"getPengeluaranBarangsQuery"}),
  graphql(getPermintaanBarangsQuery, {name:"getPermintaanBarangsQuery"}),
  graphql(getPersediaanBarangsQuery, {name:"getPersediaanBarangsQuery"}),
  graphql(getListRequestsQuery, {name:"getListRequestsQuery"}),
  graphql(getBarangsQuery, {name:"getBarangsQuery"}),
  graphql(getAllInventarisQuery, {name:"getAllInventarisQuery"}),
  graphql(addPersediaanBarang, {name:"addPersediaanBarang"}),
  graphql(updateJumlahPersediaanBarang, {name:"updateJumlahPersediaanBarang"}),
  graphql(updateJumlahDipakaiInventaris, {name:"updateJumlahDipakaiInventaris"}), 
  graphql(updateStatusDonePermintaanBarang, {name:"updateStatusDonePermintaanBarang"}),
  graphql(hapusPengeluaranBarang, {name:"hapusPengeluaranBarang"}),
  graphql(updateStatusDoneListRequest, {name:"updateStatusDoneListRequest"}),
  graphql(hapusPersediaanBarang, {name:"hapusPersediaanBarang"}),
  
)(BuatPengeluaranBarang);
