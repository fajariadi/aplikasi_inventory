import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import { Link } from 'react-router-dom';
import * as compose from 'lodash.flowright';
import {getPemeliharaansQuery, getAkunsQuery,hapusPemeliharaan,updateJumlahDiperbaikiInventaris,getAllInventarisQuery, addPemeliharaan, getBarangsQuery} from '../queries/queries';
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

class Pemeliharaan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nama:'',
      barang_id:'',
      akun_id:'',
      jumlah: 0,
      modalIsOpen: false,  
      harga: 0,
      sewa: 0,
    };
  }

  displayPemeliharaan(){
    var data = this.props.getPemeliharaansQuery;
    var no = 0;
    if(data.loading){
      return (<div>Loading Pemeliharaan...</div>);
    } else {
      return data.pemeliharaans.map(pem => {
         no++;
        return(
          <tr key={pem.id}>
            <td>{no}</td>
            <td>{pem.inventaris.barang.nama_barang}</td>
            <td>{pem.jumlah}</td>
            <td>{pem.Tanggal}</td>
            <td>{pem.akun.karyawan.nama}</td>
            <td>{pem.status}</td>
            <td>
              <Link to={`/pemeliharaan/detailPemeliharaan/${pem.id}`}>
              <Button color="primary" size="sm">
                <i className="fa fa-file"></i>
                </Button>
              </Link>
            </td>
            <td>
              <Button onClick={this.onDelete.bind(this, pem.id)} color="danger" size="sm">
                <i className="fa fa-trash"></i>
              </Button>
            </td>
          </tr>
        );
      });
    }
  }

  onDelete(pemeliharaan_id){
    this.props.hapusPemeliharaan({
      variables:{
        id: pemeliharaan_id,        
      },
      refetchQueries:[{query:getPemeliharaansQuery}],
    });
  }

  displayInventaris(){
    var data = this.props.getAllInventarisQuery;
    if(data.loading){
      return (<div>Loading Inventaris...</div>);
    } else {
      return data.allInventaris.map(inventaris => {
          return(
            <option key={inventaris.id} value={inventaris.id}>{inventaris.barang.nama_barang}</option>
          )
      });
    }
  }
  
  displayTeknisi(){
    var data = this.props.getAkunsQuery;
    if(data.loading){
      return (<div>Loading Barang...</div>);
    } else {
      return data.akuns.map(akun => {
        if(akun.karyawan.jabatan === 'Teknisi'){
          return(
            <option key={akun.id} value={akun.id}>{akun.karyawan.nama}</option>
          )
        }
      });
    }
  }

  toggleModal(){
    this.setState({
      modalIsOpen: ! this.state.modalIsOpen
    });
  }

  submitForm(e){
    e.preventDefault();
    this.toggleModal();
    this.props.addPemeliharaan({
      variables:{
        jumlah: parseInt(this.state.jumlah),
        tanggal: new Date().toLocaleDateString(),
        status: 'Diperbaiki',
        akun_id: this.state.akun_id,
        inventaris_id:this.state.barang_id,
      },
      refetchQueries:[{query:getPemeliharaansQuery}]
    });
    this.props.updateJumlahDiperbaikiInventaris({
        variables:{
            barang_id:this.state.barang_id,
            jumlah_diperbaiki: parseInt(this.state.jumlah),
          },
          refetchQueries:[{query:getAllInventarisQuery}]
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>Pemeliharaan Inventaris
                <Button size="sm" color="primary" className="float-right mb-0" onClick={this.toggleModal.bind(this)}>
                  <i className="fa fa-plus"></i> Tambah Pemeliharaan
                </Button>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead align="center">
                  <tr>
                    <th>No</th>
                    <th>Nama Inventaris</th>
                    <th>Jumlah</th>
                    <th>tanggal</th>
                    <th>Teknisi</th>
                    <th>Status</th>
                    <th>Detail</th>
                    <th>Hapus</th>
                  </tr>
                  </thead>
                  <tbody align="center">
                  {this.displayPemeliharaan()}
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
          <ModalHeader>From Tambah Pemeliharaan</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => {this.submitForm(e)}}>
              <FormGroup>
              <Label htmlFor="name">Nama Inventaris</Label>
                <Input type="select" name="nama" onChange={(e) =>this.setState({barang_id:e.target.value})} id="nama" required>
                  <option>Pilih Inventaris</option>
                  {this.displayInventaris()}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Jumlah</Label>
                <Input type="number" id="jumlah" placeholder="Masukkan Jumlah Peralatan" onChange={(e) =>this.setState({jumlah:e.target.value})} required />
              </FormGroup>    
              <FormGroup>
              <Label htmlFor="name">Nama Teknisi</Label>
                <Input type="select" name="nama" onChange={(e) =>this.setState({akun_id:e.target.value})} id="nama" required>
                  <option>Pilih Teknisi</option>
                  {this.displayTeknisi()}
                </Input>
              </FormGroup>          
              <Button type="submit" color="primary">Submit</Button>
              <Button color="danger" onClick={this.toggleModal.bind(this)}>Batal</Button>
            </Form>
          </ModalBody>  
        </Modal>
      </div>

    );
  }
}

export default compose(
  graphql(getPemeliharaansQuery, {name:"getPemeliharaansQuery"}),
  graphql(getAkunsQuery, {name:"getAkunsQuery"}),
  graphql(addPemeliharaan, {name:"addPemeliharaan"}),
  graphql(hapusPemeliharaan, {name:"hapusPemeliharaan"}),
  graphql(getBarangsQuery, {name:"getBarangsQuery"}),
  graphql(updateJumlahDiperbaikiInventaris, {name:"updateJumlahDiperbaikiInventaris"}),
  graphql(getAllInventarisQuery, {name:"getAllInventarisQuery"}),
)(Pemeliharaan);
