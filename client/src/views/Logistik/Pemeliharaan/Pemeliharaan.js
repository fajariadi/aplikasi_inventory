import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import { Link } from 'react-router-dom';
import * as compose from 'lodash.flowright';
import Swal from 'sweetalert2';
import {getPemeliharaansQuery, getAkunsQuery,hapusPemeliharaan,updateJumlahDiperbaikiInventaris,getAllInventarisQuery, addPemeliharaan, getKaryawansQuery, getBarangsQuery} from '../queries/queries';
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


class Pemeliharaan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      jabatan: localStorage.getItem("jabatan"),
      divisi: localStorage.getItem("divisi"),
      sortType:'desc',
      nama:'',
      barang_id:'',
      karyawan_id:'',
      jumlah: 0,
      modalIsOpen: false,  
      harga: 0,
      sewa: 0,
      page: 0, 
      setPage: 0,
      rowsPerPage: 5,
      setRowsPerPage: 5,
      }
  }

  getCountPemeliharaan(){
    var data = this.props.getPemeliharaansQuery;
    var no = 0;
    if (data.loading) {
      return
    } else { // eslint-disable-next-line
      data.pemeliharaans.map(pem => {
        no++
      })
    }
    return no
  }

  displayPemeliharaan(){
    var data = this.props.getPemeliharaansQuery;
    var mulai = this.state.setPage*this.state.setRowsPerPage;
    var akhir = this.state.setPage*this.state.setRowsPerPage+this.state.setRowsPerPage;
    var no = 0;
    if(data.loading){
      return
    } else {
      if (data.pemeliharaans !== undefined){
        data.pemeliharaans.sort((a, b) =>{
          const isReversed = (this.state.sortType === 'asc') ? 1 : -1;
          return isReversed * a.tanggal.localeCompare(b.tanggal)
        }); // eslint-disable-next-line
        return data.pemeliharaans.map(pem => {
           no++;
           if (no > mulai && no < akhir+1){
             return(
               <TableRow key={pem.id}>
               <TableCell component="th" scope="row">
                 {no}
               </TableCell>
               <TableCell align="center">{pem.inventaris.barang.nama_barang}</TableCell>
               <TableCell align="center">{pem.jumlah}</TableCell>
               <TableCell align="center">{pem.tanggal}</TableCell>
               <TableCell align="center">{pem.karyawan.nama}</TableCell>
               <TableCell align="center">{pem.status}</TableCell>
               <TableCell align="center">
               <Link to={`/pemeliharaan/detailPemeliharaan/${pem.id}`}>
                   <Button color="primary" size="sm">
                     <i className="fa fa-file"></i>
                     </Button>
                   </Link>
               </TableCell>
             </TableRow>
             );
           }
        });
      } else {
        window.location.reload(false);
      }
    }
  }

  onDelete(pemeliharaan_id){
    Swal.fire({
      title: 'Apakah anda Yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Saya Yakin!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.hapusPemeliharaan({
          variables:{
            id: pemeliharaan_id,        
          },
          refetchQueries:[{query:getPemeliharaansQuery}],
        });
        Swal.fire(
          'Dihapus!',
          'Pemeliharaan Telah Dihapus',
          'success'
        )
      }
    })
  }

  displayInventaris(){
    var data = this.props.getAllInventarisQuery;
    if(data.loading){
      return (<h4>Loading Inventaris...</h4>);
    } else {
      return data.allInventaris.map(inventaris => {
          return(
            <option key={inventaris.id} value={inventaris.id}>{inventaris.barang.nama_barang}</option>
          )
      });
    }
  }
  
  displayTeknisi(){
    var data = this.props.getKaryawansQuery;
    if(data.loading){
      return (<div>Loading karyawan...</div>);
    } else { // eslint-disable-next-line
      return data.karyawans.map(karyawan => {
        if(karyawan.jabatan === 'Teknisi' && karyawan.divisi.nama === 'Logistic'){
          return(
            <option key={karyawan.id} value={karyawan.id}>{karyawan.nama}</option>
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

  tambahPemeliharaan(e){
    e.preventDefault();
    this.toggleModal();
    var jumlah=0;
    const data = this.props.getAllInventarisQuery;
     // eslint-disable-next-line
        data.allInventaris.map(inven =>{
        if(inven.id === this.state.barang_id){
          jumlah = inven.jumlah
        }
      })
    
    if (jumlah < this.state.jumlah){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Jumlah Inventaris Salah',
        text: 'Jumlah melebihi jumlah inventaris',
        showConfirmButton: true,
      })
    } else {
      this.props.addPemeliharaan({
        variables:{
          jumlah: parseInt(this.state.jumlah),
          tanggal: new Date().toLocaleDateString(),
          status: 'Diperbaiki',
          karyawan_id: this.state.karyawan_id,
          inventaris_id:this.state.barang_id,
        },
        refetchQueries:[{query:getPemeliharaansQuery}]
      });
      this.props.updateJumlahDiperbaikiInventaris({
          variables:{
              id:this.state.barang_id,
              jumlah_diperbaiki: parseInt(this.state.jumlah),
          },
          refetchQueries:[{query:getAllInventarisQuery}]
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Pemeliharaan Baru Berhasil Disimpan',
        showConfirmButton: true,
      })
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

  displayTombolBuatPemeliharaan(){
    if (this.state.jabatan !== 'Admin' && this.state.divisi === "Logistic"){
      return(
        <Button size="sm" color="primary" className="float-right mb-0" onClick={this.toggleModal.bind(this)}>
          <i className="fa fa-plus"></i> Tambah Pemeliharaan
        </Button>
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
                Pemeliharaan Inventaris
                {this.displayTombolBuatPemeliharaan()}
              </CardHeader>
              <CardBody>
                <TableContainer component={Paper}>
                  <Table1 aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell align="center">Nama Inventaris</TableCell>
                        <TableCell align="center">Jumlah</TableCell>
                        <TableCell align="center">Tanggal</TableCell>
                        <TableCell align="center">Teknisi</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Detail</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.displayPemeliharaan()}
                    </TableBody>
                  </Table1>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={this.getCountPemeliharaan()}
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
          <ModalHeader>From Tambah Pemeliharaan</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => {this.tambahPemeliharaan(e)}}>
              <FormGroup>
              <Label htmlFor="name">Nama Inventaris</Label>
                <Input type="select" name="nama" onChange={(e) =>this.setState({barang_id:e.target.value})} id="nama" required>
                  <option value="">Pilih Inventaris</option>
                  {this.displayInventaris()}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Jumlah</Label>
                <Input type="number" id="jumlah" placeholder="Masukkan Jumlah Peralatan" onChange={(e) =>this.setState({jumlah:e.target.value})} required />
              </FormGroup>    
              <FormGroup>
              <Label htmlFor="name">Nama Teknisi</Label>
                <Input type="select" name="nama" onChange={(e) =>this.setState({karyawan_id:e.target.value})} id="nama" required>
                  <option value="">Pilih Teknisi</option>
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
  graphql(getKaryawansQuery, {name:"getKaryawansQuery"}),
)(Pemeliharaan);
