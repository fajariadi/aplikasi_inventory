import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import * as compose from 'lodash.flowright';
import {graphql} from 'react-apollo';
import { getPurchaseOrdersQuery, addPurchaseOrderMutation } from '../queries/queries';
import { Card, CardBody, CardHeader, Col, Button, Row } from 'reactstrap';

import Table1 from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

class PurchaseOrder extends Component {
  constructor(props){
    super(props);
    const username= localStorage.getItem("username")

    let loggedIn = true 
      if(username == null){
        loggedIn = false
      }
    this.state = {
      loggedIn,
      akun_id: localStorage.getItem("user_id"),
      jabatan: localStorage.getItem("jabatan"),
      page: 0, 
      setPage: 0,
      rowsPerPage: 5,
      setRowsPerPage: 5,
      }
  }

  getCountPembelianBarang(){
    var data = this.props.getPurchaseOrdersQuery;
    var no = 0;
    if (data.loading) {
      return
    } else { // eslint-disable-next-line
      data.purchaseOrders.map(barang => {
        no++
      })
    }
    return no
  }

  displayAllPurchaseOrder(){
    var data = this.props.getPurchaseOrdersQuery;
    var no = 0;
    if(data.loading){
      return
    } else {
      return data.purchaseOrders.map(order => {
        no++;
        return(
          <TableRow key={order.id}>
            <TableCell component="th" scope="row">
              {no}
            </TableCell>
            <TableCell align="center">{order.kode}</TableCell>
            <TableCell align="center">{order.vendor.nama}</TableCell>
            <TableCell align="center">{order.tanggal}</TableCell>
            <TableCell align="center">{order.status}</TableCell>
            <TableCell align="center">
              <Link to={`/purchaseOrder/detailPurchaseOrder/${order.id}`}>
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

  addPurchaseOrder(){
    this.props.addPurchaseOrderMutation({
      variables:{
        kode: this.getKodeBaru(),
        tanggal: new Date().toLocaleDateString(),
        status: 'Belum Disetujui',
        tanggal_setuju: '',
        akun_id: this.state.akun_id,
        vendor_id:'5e5deb9c2a448419e86f84a6',
      },
      refetchQueries:[{query:getPurchaseOrdersQuery}],
    })
    this.props.history.push("/purchaseOrder/buatPurchaseOrder");
  }

  getKodeBaru(){
    var kode = 'R';
    var nomor = 1; 
    var data = this.props.getPurchaseOrdersQuery; // eslint-disable-next-line
    data.purchaseOrders.map(order => {
        nomor++;
    })
    if(nomor < 10){
      kode = kode+"00"+nomor;
    }else if (nomor >= 10 && nomor < 100){
      kode = kode+"0"+nomor;
    }else {
      kode = kode+""+nomor;
    }
    return kode;
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

  displayTombolBuatPembelian(){
    if (this.state.jabatan !== 'Admin'){
      return(
        <Button color="primary" size="sm"  className={'float-right mb-0'} onClick={this.addPurchaseOrder.bind(this)}>
          <i className="fa fa-plus"></i> Buat Purchase Order
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
                Daftar Purchase Order
                {this.displayTombolBuatPembelian()}                 
              </CardHeader>
              <CardBody>
                <TableContainer component={Paper}>
                  <Table1 aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell align="center">Kode</TableCell>
                        <TableCell align="center">Vendor</TableCell>
                        <TableCell align="center">Tanggal</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Detail</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.displayAllPurchaseOrder()}
                    </TableBody>
                  </Table1>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={this.getCountPembelianBarang()}
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
  graphql(getPurchaseOrdersQuery, {name:"getPurchaseOrdersQuery"}),
  graphql(addPurchaseOrderMutation, {name:"addPurchaseOrderMutation"}),
) (PurchaseOrder);
