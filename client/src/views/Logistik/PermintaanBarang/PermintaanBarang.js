import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getPermintaanBarangsQuery, addPermintaanBarangMutation, hapusPermintaanBarangMutation, getListRequestsQuery, hapusManyListRequestMutation} from '../queries/queries';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import Table1 from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

class PermintaanBarang extends Component {

   constructor(props){
    super(props);
    const username= localStorage.getItem("username")

    let loggedIn = true 
      if(username == null){
        loggedIn = false
      }
    this.state = {
      akun_id: localStorage.getItem("user_id"),
      jabatan: localStorage.getItem("jabatan"),
      kode:'',
      nama:'',
      jumlah:'',
      satuan:'',
      div_id:'',
      request_id:'',
      addRequest:false,
      loggedIn,
      page: 0, 
      setPage: 0,
      rowsPerPage: 5,
      setRowsPerPage: 5,
      }
  }

  getDataPermintaanBarang(){
    var data = this.props.getPermintaanBarangsQuery;
    var no = 0;
    if (data.loading) {
      return
    } else { // eslint-disable-next-line
      data.permintaanBarangs.map(permintaan => {
        no++
      })
    }
    return no
  }

  onDelete(request_id){
   this.props.hapusPermintaanBarangMutation({
      variables:{
        id: request_id,        
      },
      refetchQueries:[{query:getPermintaanBarangsQuery}],
    });
   this.props.hapusManyListRequestMutation({
      variables:{
        id: request_id,        
      },
      refetchQueries:[{query:getPermintaanBarangsQuery}],
    });
  }

  displayRequest(){
    var data1 = this.props.getPermintaanBarangsQuery;
    var no = 0;
    if(data1.loading){
      return
    } else {
      return data1.permintaanBarangs.map(request => {
        no++;
        return(
          <TableRow key={request.id}>
            <TableCell component="th" scope="row">
              {no}
            </TableCell>
            <TableCell align="center">{request.kode}</TableCell>
            <TableCell align="center">{request.divisi.nama}</TableCell>
            <TableCell align="center">{request.tanggal}</TableCell>
            <TableCell align="center">{request.status}</TableCell>
            <TableCell align="center">
              <Link to={`/permintaanBarang/detailPermintaanBarang/${request.id}`}>
                <Button color="primary" size="sm">
                  <i className="fa fa-file"></i>
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        );
      });
    }
  }
  getKodeBaru(){
    var newKode = 'R';
    var kode = '';
    var nomor = 1;
    var data = this.props.getPermintaanBarangsQuery; // eslint-disable-next-line
    data.permintaanBarangs.map(request => {
      if(request.kode !== ''){
        kode = request.kode
      } 
    })
    if(kode !== ''){
      nomor = parseInt(kode.substring(1,4))+1
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

  addRequestHandler(){
    this.props.addPermintaanBarangMutation({
      variables:{
        tanggal: new Date().toLocaleDateString(), 
        status: 'Belum Disetujui',
        akun_id: this.state.akun_id,
        kode: this.getKodeBaru(),
        divisi_id: localStorage.getItem("divisi_id"),
        tanggal_setuju: '',
        disetujui_id: '5f7d7b275e9e27240c35abcf',
      },
      refetchQueries:[{query:getPermintaanBarangsQuery}],
    });
    this.props.history.push("/permintaanBarang/buatPermintaanBarang");
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

  displayTombolBuatPermintaan(){
    if (this.state.jabatan !== 'Admin'){
      return(
        <Button color="primary" onClick={this.addRequestHandler.bind(this)} className={'float-right mb-0'} size="sm">
          <i className="fa fa-plus mr-2"></i>Buat Permintaan Barang
        </Button>
      )
    }
  }

  render() {
    if(this.state.loggedIn === false){
      return <Redirect to="/login" />
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                  Daftar Permintaan Barang
                  {this.displayTombolBuatPermintaan()} 
              </CardHeader>
              <CardBody>
                <TableContainer component={Paper}>
                  <Table1 aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell align="center">Kode</TableCell>
                        <TableCell align="center">Divisi</TableCell>
                        <TableCell align="center">Tanggal</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Detail</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.displayRequest()}
                    </TableBody>
                  </Table1>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={this.getDataPermintaanBarang()}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.setPage}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default compose(
  graphql(getPermintaanBarangsQuery, {name:"getPermintaanBarangsQuery"}),
  graphql(getListRequestsQuery, {name:"getListRequestsQuery"}),
  graphql(addPermintaanBarangMutation, {name:"addPermintaanBarangMutation"}),
  graphql(hapusPermintaanBarangMutation, {name:"hapusPermintaanBarangMutation"}),
  graphql(hapusManyListRequestMutation, {name:"hapusManyListRequestMutation"}),
)(PermintaanBarang);
