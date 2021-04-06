import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import { Link} from 'react-router-dom';
import * as compose from 'lodash.flowright';
import Swal from 'sweetalert2';
import {hapusPengeluaranBarang, getPermintaanBarangsQuery, getPengeluaranBarangsQuery, addPengeluaranBarang} from '../queries/queries';
import { 
  Form,
  Card, 
  CardBody, 
  CardHeader, 
  Col,  
  Row, 
  Button,
  FormGroup,
  Label,
  Input,
  Modal, ModalBody, ModalHeader
} from 'reactstrap';

import Table1 from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

class PengeluaranBarang extends Component {

  constructor(props) {
    super(props);
    this.state = {
      akun_id: localStorage.getItem("user_id"),
      jabatan: localStorage.getItem("jabatan"),
      divisi: localStorage.getItem("divisi"),
      sortType: 'desc',
      nama:'',
      permintaan_id:'',
      jumlah: 0,
      modalIsOpen: false,  
      harga: 0,
      sewa: 0,
      page: 0, 
      setPage: 0,
      rowsPerPage: 5,
      setRowsPerPage: 5,
    };
  }

  getCountPengeluaranBarang(){
    var data = this.props.getPengeluaranBarangsQuery;
    var no = 0;
    if (data.loading) {
      return
    } else { // eslint-disable-next-line
      data.pengeluaranBarangs.map(barang => {
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

  displayPermintaanBarangs(){
    var data = this.props.getPermintaanBarangsQuery;
    if(data.loading){
      return (<div>Loading Permintaan...</div>);
    } else { // eslint-disable-next-line
    return  data.permintaanBarangs.map(permintaan => {
        var lanjut = true;
          if(permintaan.status === 'Disetujui'){ // eslint-disable-next-line
            permintaan.listRequest.map(item => {
              if(item.status !== 'Ready'){
                lanjut = false;
              }
            })
            if(lanjut){
              return(
                  <option key={permintaan.id} value={permintaan.id}>{permintaan.kode}</option>
                )
            }
          }
      });
    }
  }

  displayPengeluaranBarang(){
    var data1 = this.props.getPengeluaranBarangsQuery;
    var mulai = this.state.setPage*this.state.setRowsPerPage;
    var akhir = this.state.setPage*this.state.setRowsPerPage+this.state.setRowsPerPage;
    var no = 0;
    if(data1.loading){
      return
    } else {
      if (data1.pengeluaranBarangs !== undefined){
        data1.pengeluaranBarangs.sort((a, b) =>{
          const isReversed = (this.state.sortType === 'asc') ? 1 : -1;
          return isReversed * a.kode.localeCompare(b.kode)
        }); // eslint-disable-next-line
        return data1.pengeluaranBarangs.map(request => {
          no++;
          if (no > mulai && no < akhir+1){
            return(
              <TableRow key={request.id}>
                <TableCell component="th" scope="row">
                  {no}
                </TableCell>
                <TableCell align="center">{request.kode}</TableCell>
                <TableCell align="center">{request.tanggal}</TableCell>
                <TableCell align="center">
                <Link to={`/pengeluaranBarang/detailPengeluaranBarang/${request.id}`}>
                  <Button color="primary" size="sm">
                    <i className="fa fa-file"></i>
                    </Button>
                  </Link>
                </TableCell>
                {this.displayTombolHapus(request.id)}
              </TableRow>
            );
          }
        });
      }else {
        window.location.reload(false);
      }
    } 
  }

  displayTombolHapus(request_id){
    if (this.state.jabatan !== "Admin" && this.state.divisi === "Logistic"){
      return(
        <TableCell align="center">
          <Button onClick={this.onDelete.bind(this, request_id)} color="danger" size="sm">
            <i className="fa fa-trash"></i>
          </Button>
        </TableCell>
      )
    }
  }

  onDelete(pengeluaran_id){
    Swal.fire({
      title: 'Apakah anda Yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Saya Yakin!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.hapusPengeluaranBarang({
          variables:{
            id: pengeluaran_id,        
          },
          refetchQueries:[{query:getPengeluaranBarangsQuery}],
        });
        Swal.fire(
          'Dihapus!',
          'Data Barang Telah Dihapus',
          'success'
        )
      }
    })
    
  }

  getKodeBaru(){
    var newKode = 'PE';
    var kode = '';
    var nomor = 1;
    var data = this.props.getPengeluaranBarangsQuery; 
    data.pengeluaranBarangs.sort((a, b) =>{
      const isReversed = (this.state.sortType === 'desc') ? 1 : -1;
      return isReversed * a.kode.localeCompare(b.kode)
    });// eslint-disable-next-line
    data.pengeluaranBarangs.map(request => {
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
    if(this.state.permintaan_id !== ''){
      this.props.addPengeluaranBarang({
        variables:{
          kode: this.getKodeBaru(),
          tanggal: new Date().toLocaleDateString(),
          akun_id: this.state.akun_id,
          permintaan_id: this.state.permintaan_id,
        },
        refetchQueries:[{query:getPengeluaranBarangsQuery}],
      });
      this.props.history.push(`/pengeluaranBarang/buatPengeluaranBarang/${this.state.permintaan_id}`);
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

  displayTombolBuatPengeluaran(){
    if (this.state.jabatan !== 'Admin' && this.state.divisi === "Logistic"){
      return(
        <Button size="sm" color="primary" className="float-right mb-0" onClick={this.toggleModal.bind(this)}>
          <i className="fa fa-plus"></i> Buat Pengeluaran Barang
        </Button>
      )
    }
  }

  displayTabel(){
    if (this.state.jabatan !== "Admin" && this.state.divisi === "Logistic"){
      return(
        <TableRow>
          <TableCell>No</TableCell>
          <TableCell align="center">Kode</TableCell>
          <TableCell align="center">Tanggal</TableCell>
          <TableCell align="center">Detail</TableCell>
          <TableCell align="center">Hapus</TableCell>
        </TableRow>
      )
    } else {
      return(
        <TableRow>
          <TableCell>No</TableCell>
          <TableCell align="center">Kode</TableCell>
          <TableCell align="center">Tanggal</TableCell>
          <TableCell align="center">Detail</TableCell>
        </TableRow>
      )
    }
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
           <Col>
            <Card>
              <CardHeader>
                Pengeluaran Barang
                {this.displayTombolBuatPengeluaran()}
              </CardHeader>
              <CardBody>
                <TableContainer component={Paper}>
                  <Table1 aria-label="simple table">
                    <TableHead>
                      {this.displayTabel()}
                    </TableHead>
                    <TableBody>
                    {this.displayPengeluaranBarang()}
                    </TableBody>
                  </Table1>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={this.getCountPengeluaranBarang()}
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
          <ModalHeader>Pilih Permintaan Barang</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup> 
              <Label htmlFor="name">Kode Permintaan Barang</Label>
                <Input type="select" name="id" onChange={(e) =>this.setState({permintaan_id:e.target.value})} id="id" required>
                  <option value="">Kode</option>
                  {this.displayPermintaanBarangs()}
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
  graphql(getPengeluaranBarangsQuery, {name:"getPengeluaranBarangsQuery"}),
  graphql(getPermintaanBarangsQuery, {name:"getPermintaanBarangsQuery"}),
  graphql(addPengeluaranBarang, {name:"addPengeluaranBarang"}),
  graphql(hapusPengeluaranBarang, {name:"hapusPengeluaranBarang"}),
)(PengeluaranBarang);
