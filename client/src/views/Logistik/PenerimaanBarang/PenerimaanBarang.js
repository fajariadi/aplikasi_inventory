import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import * as compose from 'lodash.flowright';
import Swal from 'sweetalert2';
import { hapusPenerimaanBarang, getPurchaseOrdersQuery, getPenerimaanBarangsQuery, addPenerimaanBarang } from '../queries/queries';
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


class PenerimaanBarang extends Component {

  constructor(props) {
    super(props);
    this.state = {
      akun_id: localStorage.getItem("user_id"),
      divisi: localStorage.getItem("divisi"),
      jabatan: localStorage.getItem("jabatan"),
      sortType: 'desc',
      nama: '',
      purchase_id: '',
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

  getCountPenerimaanBarang() {
    var data = this.props.getPenerimaanBarangsQuery;
    var no = 0;
    if (data.loading) {
      return
    } else if (data !== undefined) { // eslint-disable-next-line
      data.penerimaanBarangs.map(barang => {
        no++
      })
    } else {
      this.getCountPenerimaanBarang();
    }
    return no
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  displayPurchaseOrder() {
    var data = this.props.getPurchaseOrdersQuery;
    if (data.loading) {
      return (<div>Loading order...</div>);
    } else {
      if (data !== undefined) { // eslint-disable-next-line
      return data.purchaseOrders.map(order => {
        if (order.status === 'Disetujui') {
          return (
            <option key={order.id} value={order.id}>{order.kode}</option>
          )
        }
      });
      } else {
        this.displayPurchaseOrder();
      }
    }
  }

  displayPenerimaanBarang() {
    var data1 = this.props.getPenerimaanBarangsQuery;
    var mulai = this.state.setPage*this.state.setRowsPerPage;
    var akhir = this.state.setPage*this.state.setRowsPerPage+this.state.setRowsPerPage;
    var no = 0;
    if (data1.loading) {
      return
    } else {
      if (data1.penerimaanBarangs !== undefined) { 
        data1.penerimaanBarangs.sort((a, b) =>{
          const isReversed = (this.state.sortType === 'asc') ? 1 : -1;
          return isReversed * a.kode.localeCompare(b.kode)
        }); // eslint-disable-next-line
        return data1.penerimaanBarangs.map(request => {
          no++;
          if (no > mulai && no < akhir+1){
            return (
              <TableRow key={request.id}>
                <TableCell component="th" scope="row">
                  {no}
                </TableCell>
                <TableCell align="center">{request.kode}</TableCell>
                <TableCell align="center">{request.purchaseOrder.vendor.nama}</TableCell>
                <TableCell align="center">{request.tanggal}</TableCell>
                <TableCell align="center">
                  <Link to={`/penerimaanBarang/detailPenerimaanBarang/${request.id}`}>
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
      } else {
        window.location.reload(false);
      }
    }
  }

  displayTombolHapus(request_id){
    if (this.state.jabatan !== 'Admin' && this.state.divisi === "Logistic") {
      return(
        <TableCell align="center">
          <Button onClick={this.onDelete.bind(this, request_id)} color="danger" size="sm">
            <i className="fa fa-trash"></i>
          </Button>
        </TableCell>
      )
    }
  }

  onDelete(penerimaan_id) {
    Swal.fire({
      title: 'Apakah anda Yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Saya Yakin!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.hapusPenerimaanBarang({
          variables: {
            id: penerimaan_id,
          },
          refetchQueries: [{ query: getPenerimaanBarangsQuery }],
        });
        Swal.fire(
          'Dihapus!',
          'Penerimaan Barang Telah Dihapus',
          'success'
        )
      }
    })
  }

  getKodeBaru() {
    var newKode = 'PB';
    var kode = '';
    var nomor = 1;
    var data = this.props.getPenerimaanBarangsQuery; // eslint-disable-next-line
    data.penerimaanBarangs.map(request => {
      if (request.kode !== '') {
        kode = request.kode
      }
    })
    if (kode !== '') {
      nomor = parseInt(kode.substring(2, 5)) + 1
    }
    if (nomor < 10) {
      kode = newKode + "00" + nomor;
    } else if (nomor >= 10 && nomor < 100) {
      kode = newKode + "0" + nomor;
    } else {
      kode = newKode + "" + nomor;
    }
    return kode;
  }

  submit() {
    if (this.state.purchase_id !== '') {
      this.props.addPenerimaanBarang({
        variables: {
          kode: this.getKodeBaru(),
          tanggal: new Date().toLocaleDateString(),
          akun_id: this.state.akun_id,
          purchase_id: this.state.purchase_id,
        },
        refetchQueries: [{ query: getPenerimaanBarangsQuery }],
      });
      this.props.history.push(`/penerimaanBarang/buatPenerimaanBarang/${this.state.purchase_id}`);
    }
  }

  handleChangePage = (event, newPage) => {
    this.setState({ setPage: newPage })
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      setRowsPerPage: parseInt(event.target.value, 10),
      rowsPerPage: parseInt(event.target.value, 10),
      setPage: 0
    })
  };

  displayTombolBuatPenerimaan() {
    if (this.state.jabatan !== 'Admin' && this.state.divisi === "Logistic") {
      return (
        <Button size="sm" color="primary" className="float-right mb-0" onClick={this.toggleModal.bind(this)}>
          <i className="fa fa-plus"></i> Tambah Penerimaan Barang
        </Button>
      )
    }
  }

  displayTabel() {
    if (this.state.jabatan !== 'Admin' && this.state.divisi === "Logistic") {
      return (
        <TableRow>
          <TableCell>No</TableCell>
          <TableCell align="center">Kode</TableCell>
          <TableCell align="center">Pengirim</TableCell>
          <TableCell align="center">Tanggal</TableCell>
          <TableCell align="center">Detail</TableCell>
          <TableCell align="center">Hapus</TableCell>
        </TableRow>
      )
    } else {
      return (
        <TableRow>
          <TableCell>No</TableCell>
          <TableCell align="center">Kode</TableCell>
          <TableCell align="center">Pengirim</TableCell>
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
                Penerimaan Barang
                {this.displayTombolBuatPenerimaan()}
              </CardHeader>
              <CardBody>
                <TableContainer component={Paper}>
                  <Table1 aria-label="simple table">
                    <TableHead>
                      {this.displayTabel()}
                    </TableHead>
                    <TableBody>
                      {this.displayPenerimaanBarang()}
                    </TableBody>
                  </Table1>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={this.getCountPenerimaanBarang()}
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
          <ModalHeader>Pilih Purchase Order</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label htmlFor="name">Kode Purchase Order</Label>
                <Input type="select" name="id" onChange={(e) => this.setState({ purchase_id: e.target.value })} id="id" required>
                  <option value="">Kode</option>
                  {this.displayPurchaseOrder()}
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
  graphql(getPenerimaanBarangsQuery, { name: "getPenerimaanBarangsQuery" }),
  graphql(getPurchaseOrdersQuery, { name: "getPurchaseOrdersQuery" }),
  graphql(addPenerimaanBarang, { name: "addPenerimaanBarang" }),
  graphql(hapusPenerimaanBarang, { name: "hapusPenerimaanBarang" }),
)(PenerimaanBarang);
