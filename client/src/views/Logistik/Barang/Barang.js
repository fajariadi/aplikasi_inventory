import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import Swal from 'sweetalert2';
import { getBarangsQuery, addBarangMutation, hapusBarangMutation } from '../queries/queries';
import {
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
  Modal,
  ModalHeader,
  ModalBody,
  Form,
} from 'reactstrap';

import Table1 from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

class Barang extends Component {

  constructor(props) {
    super(props);
    this.state = {
      jabatan: localStorage.getItem('jabatan'),
      nama_barang: '',
      jenis_barang: '',
      satuan: '',
      harga: '',
      modalIsOpen: false,
      success: false,
      page: 0, 
      setPage: 0,
      rowsPerPage: 5,
      setRowsPerPage: 5,
    };
  }


  getDataBarang(){
    var data = this.props.getBarangsQuery;
    var no = 0;
    if (data.loading) {
      return
    } else {
      data.barangs.map(barang => {
        no++
      })
    }
    return no
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  submitForm(e) {
    e.preventDefault();
    this.toggleModal();
    this.props.addBarangMutation({
      variables: {
        nama_barang: this.state.nama_barang,
        jenis_barang: this.state.jenis_barang,
        satuan: this.state.satuan,
        harga: parseInt(this.state.harga),
      },
      refetchQueries: [{ query: getBarangsQuery }]
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Data Barang Berhasil Disimpan',
      showConfirmButton: true,
    })
  }

  onDelete(barang_id) {
    Swal.fire({
      title: 'Apakah anda Yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Saya Yakin!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.hapusBarangMutation({
          variables: {
            id: barang_id,
          },
          refetchQueries: [{ query: getBarangsQuery }],
        });
        Swal.fire(
          'Dihapus!',
          'Data Barang Telah Dihapus',
          'success'
        )
      }
    })
  }

  displayBarang() {
    var data = this.props.getBarangsQuery;
    var mulai = this.state.setPage*this.state.setRowsPerPage;
    var akhir = this.state.setPage*this.state.setRowsPerPage+this.state.setRowsPerPage;
    var no = 0;
    if (data.loading) {
      return (<h5>Loading Daftar Barang...</h5>);
    } else {
      return data.barangs.map(barang => {
        no++;
        if (no > mulai && no < akhir+1){
          return (
            <TableRow key={barang.id}>
              <TableCell component="th" scope="row">
                {no}
              </TableCell>
              <TableCell align="center">{barang.nama_barang}</TableCell>
              <TableCell align="center">{barang.jenis_barang}</TableCell>
              <TableCell align="center">{barang.satuan}</TableCell>
              <TableCell align="center">{barang.harga}</TableCell>
              {this.displayTombolEdit(barang.id)}
              {this.displayTombolHapus(barang.id)}
            </TableRow>
          );
        }
      });
    }
  }

  displayTombolTambah() {
    if (this.state.jabatan === 'Admin') {
      return (
        <Button size="sm" color="primary" className="float-right mb-0" onClick={this.toggleModal.bind(this)}>
          <i className="fa fa-plus"></i> Tambah Data Barang
        </Button>
      )
    }
  }

  displayTombolEdit(barang_id) {
    if (this.state.jabatan === 'Admin') {
      return (
        <TableCell align="center">
          <Link to={`/barang/editBarang/${barang_id}`}>
            <Button color="success" size="sm">
              <i className="fa fa-pencil"></i>
            </Button>
          </Link>
        </TableCell>
      )
    }
  }

  displayTombolHapus(barang_id) {
    if (this.state.jabatan === 'Admin') {
      return (
        <TableCell align="center">
          <Button onClick={this.onDelete.bind(this, barang_id)} color="danger" size="sm">
            <i className="fa fa-trash"></i>
          </Button>
        </TableCell>
      )
    }
  }

  displayTabel() {
    if (this.state.jabatan === 'Admin') {
      return (
        <TableRow>
          <TableCell>No</TableCell>
          <TableCell align="center">Nama Barang</TableCell>
          <TableCell align="center">Jenis Barang</TableCell>
          <TableCell align="center">Satuan</TableCell>
          <TableCell align="center">Harga</TableCell>
          <TableCell align="center">Edit</TableCell>
          <TableCell align="center">Hapus</TableCell>
        </TableRow>
      )
    } else {
      return (
        <TableRow>
          <TableCell>No</TableCell>
          <TableCell align="center">Nama Barang</TableCell>
          <TableCell align="center">Jenis Barang</TableCell>
          <TableCell align="center">Satuan</TableCell>
          <TableCell align="center">Harga</TableCell>
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
                <i className="fa fa-align-justify"></i> Data Barang
                {this.displayTombolTambah()}
              </CardHeader>
              <CardBody>
                <TableContainer component={Paper}>
                  <Table1 aria-label="simple table">
                    <TableHead>
                      {this.displayTabel()}
                    </TableHead>
                    <TableBody>
                      {this.displayBarang()}
                    </TableBody>
                  </Table1>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={this.getDataBarang()}
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
          <ModalHeader>Form Tambah Data Barang</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => { this.submitForm(e) }}>
              <FormGroup>
                <Label htmlFor="name">Nama Barang</Label>
                <Input type="text" id="name" placeholder="Masukkan Nama Barang" onChange={(e) => this.setState({ nama_barang: e.target.value })} required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Jenis Barang</Label>
                <Input type="text" id="jenis" placeholder="Masukkan Jenis Barang" onChange={(e) => this.setState({ jenis_barang: e.target.value })} required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Satuan</Label>
                <Input type="select" name="satuan" id="satuan" onChange={(e) => this.setState({ satuan: e.target.value })}>
                  <option>Satuan</option>
                  <option value="Kg">Kg</option>
                  <option value="Buah">Buah</option>
                  <option value="Meter">Meter</option>
                  <option value="Lembar">Lembar</option>
                  <option value="Liter">Liter</option>
                  <option value="Sak">Sak</option>
                  <option value="m">m</option>
                  <option value="m2">m2</option>
                  <option value="m3">m3</option>
                  <option value="Roll">Roll</option>
                  <option value="Kardus">Kardus</option>
                  <option value="Batang">Batang</option>
                  <option value="Truk">Truk</option>
                  <option value="Drum">Drum</option>
                  <option value="Takaran">Takaran</option>
                  <option value="Unit">Unit</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Harga Barang</Label>
                <Input type="number" id="harga" placeholder="Masukkan Harga Barang" onChange={(e) => this.setState({ harga: e.target.value })} required />
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
  graphql(getBarangsQuery, { name: "getBarangsQuery" }),
  graphql(addBarangMutation, { name: "addBarangMutation" }),
  graphql(hapusBarangMutation, { name: "hapusBarangMutation" })
)(Barang);
