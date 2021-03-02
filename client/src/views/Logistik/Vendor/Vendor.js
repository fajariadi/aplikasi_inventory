import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import { Link } from 'react-router-dom';
import * as compose from 'lodash.flowright';
import Swal from 'sweetalert2';
import {getVendorsQuery, addVendorMutation, hapusVendorMutation} from '../queries/queries';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Col,   
  Button, 
  Row, 
  Form, 
  FormGroup, 
  Label,
  Input,
  ModalHeader, ModalBody, Modal
 } from 'reactstrap';

 import Table1 from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

class Vendor extends Component {
  constructor(props){
    super(props);
    this.state = {
      jabatan: localStorage.getItem('jabatan'),
      selected: null,
      nama: '',
      jenis:'',
      alamat:'',
      email:'',
      noTlp:'',
      modalIsOpen: false,
      page: 0, 
      setPage: 0,
      rowsPerPage: 5,
      setRowsPerPage: 5,
    }
  }
  
  getDataVendor(){
    var data = this.props.getVendorsQuery;
    var no = 0;
    if (data.loading) {
      return
    } else { // eslint-disable-next-line
      data.vendors.map(barang => {
        no++
      })
    }
    return no
  }
  toggleModal(){
    this.setState({
      modalIsOpen: ! this.state.modalIsOpen
    });
  }

  onDelete(vendor_id){
    Swal.fire({
      title: 'Apakah anda Yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Saya Yakin!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.hapusVendorMutation({
          variables:{
            id: vendor_id,        
          },
          refetchQueries:[{query:getVendorsQuery}],
        });
        Swal.fire(
          'Dihapus!',
          'Data Vendor Telah Dihapus',
          'success'
        )
      }
    })
  }

  displayVendors(){
    var data = this.props.getVendorsQuery;
    var mulai = this.state.setPage*this.state.setRowsPerPage;
    var akhir = this.state.setPage*this.state.setRowsPerPage+this.state.setRowsPerPage;
    var no = 0;
    if(data.loading){
      return;
    } else { // eslint-disable-next-line
      return data.vendors.map(vendor => {
         no++;
         if (no > mulai && no < akhir+1){
          return (
            <TableRow key={vendor.id}>
              <TableCell component="th" scope="row">
                {no}
              </TableCell>
              <TableCell align="center">{vendor.nama}</TableCell>
              <TableCell align="center">{vendor.jenis_usaha}</TableCell>
              <TableCell align="center">{vendor.alamat}</TableCell>
              <TableCell align="center">{vendor.email}</TableCell>
              <TableCell align="center">{vendor.noTlp}</TableCell>
              {this.displayTombolEdit(vendor.id)}
              {this.displayTombolHapus(vendor.id)}
            </TableRow>
          );
        }
      });
    }
  }
  submitForm(e){
    e.preventDefault();
    this.toggleModal();
    this.props.addVendorMutation({
      variables:{
        nama:this.state.nama,
        jenis_usaha: this.state.jenis,
        alamat: this.state.alamat,
        email: this.state.email,
        noTlp: this.state.noTlp,
      },
      refetchQueries:[{query:getVendorsQuery}]
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Data Vendor Berhasil Disimpan',
      showConfirmButton: true,
    })
  }

  displayTombolTambah(){
    if(this.state.jabatan === 'Admin'){
      return(
        <Button size="sm" color="primary" className="float-right mb-0" onClick={this.toggleModal.bind(this)}>
          <i className="fa fa-plus"></i> Tambah Data Vendor
        </Button>
      )
    }
  }
   displayTombolEdit(vendor_id){
    if(this.state.jabatan === 'Admin'){
      return(
        <TableCell align="center">
          <Link to={`/vendor/editVendor/${vendor_id}`}>
            <Button color="success" size="sm">
              <i className="fa fa-pencil"></i>
            </Button>
          </Link>
        </TableCell>
      )
    }
   }
  
   displayTombolHapus(vendor_id){
    if(this.state.jabatan === 'Admin'){
      return(
        <TableCell align="center">
          <Button onClick={this.onDelete.bind(this, vendor_id)} color="danger" size="sm">
            <i className="fa fa-trash"></i>
          </Button>
        </TableCell>
      )
    }
   }

   displayTabel(){
     if(this.state.jabatan === 'Admin'){
        return(
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell align="center">Nama Vendor</TableCell>
            <TableCell align="center">Jenis Usaha</TableCell>
            <TableCell align="center">Alamat</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">No Telepon</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Hapus</TableCell>
          </TableRow>
        )
     } else {
       return(
        <TableRow>
          <TableCell>No</TableCell>
          <TableCell align="center">Nama Vendor</TableCell>
          <TableCell align="center">Jenis Usaha</TableCell>
          <TableCell align="center">Alamat</TableCell>
          <TableCell align="center">Email</TableCell>
          <TableCell align="center">No Telepon</TableCell>
        </TableRow>
       )
     }
   }

   handleChangePage = (event, newPage) => {
    this.setState({ setPage : newPage})
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ 
      setRowsPerPage : parseInt(event.target.value, 10),
      rowsPerPage : parseInt(event.target.value, 10),
      setPage : 0
    })
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
              <i className="fa fa-align-justify"></i>Data Vendor
              {this.displayTombolTambah()}
              </CardHeader>
              <CardBody>
              <TableContainer component={Paper}>
                  <Table1 aria-label="simple table">
                    <TableHead>
                      {this.displayTabel()}
                    </TableHead>
                    <TableBody>
                      {this.displayVendors()}
                    </TableBody>
                  </Table1>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={this.getDataVendor()}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.setPage}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.modalIsOpen}>
          <ModalHeader>Form Tambah Data Peralatan</ModalHeader>
          <ModalBody>
          <Form onSubmit={(e) => {this.submitForm(e)}}>
              <FormGroup>
                <Label htmlFor="name">Nama Vendor</Label>
                <Input type="text" id="name" placeholder="Masukkan Nama Vendor" onChange={(e) =>this.setState({nama:e.target.value})} required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Jenis Usaha</Label>
                <Input type="text" id="jumlah" placeholder="Masukkan Jenis Usaha" onChange={(e) =>this.setState({jenis:e.target.value})} required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Alamat</Label>
                <Input type="text" id="alamat" placeholder="Masukkan Alamat" onChange={(e) =>this.setState({alamat:e.target.value})} required />
              </FormGroup>                
              <FormGroup>
                <Label htmlFor="name">Email</Label>
                <Input type="text" id="email" placeholder="Masukkan Email" onChange={(e) =>this.setState({email:e.target.value})} required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">No Telepon</Label>
                <Input type="text" id="noTlp" placeholder="Masukkan No Telepon" onChange={(e) =>this.setState({noTlp:e.target.value})} required />
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
  graphql(getVendorsQuery, {name:"getVendorsQuery"}),
  graphql(addVendorMutation, {name:"addVendorMutation"}),
  graphql(hapusVendorMutation, {name:"hapusVendorMutation"})
)(Vendor);
