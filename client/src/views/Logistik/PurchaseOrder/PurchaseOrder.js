import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import * as compose from 'lodash.flowright';
import {graphql} from 'react-apollo';
import { getPurchaseOrdersQuery, addPurchaseOrderMutation } from '../queries/queries';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem,Button, PaginationLink, Row, Table } from 'reactstrap';

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
      }
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
          <tr key={order.id}>
            <td>{no}</td>
            <td>{order.kode}</td>
            <td>{order.vendor.nama}</td>
            <td>{order.tanggal}</td>
            <td>{order.status}</td>
            <td>
              <Link to={`/purchaseOrder/detailPurchaseOrder/${order.id}`}>
              <Button color="primary" size="sm">
                <i className="fa fa-file"></i>
                </Button>
              </Link>
            </td>
          </tr>
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
                <Row>
                <Col>
                  Daftar Purchase Order
                </Col>
                <Col>
                    <Button color="primary" size="sm"  className={'float-right mb-0'} onClick={this.addPurchaseOrder.bind(this)}>
                        <i className="fa fa-plus"></i> Buat Purchase Order
                    </Button>
                </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead align="center">
                  <tr>
                    <th>No</th>
                    <th>Kode</th>
                    <th>Nama Vendor</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                  </thead>
                  <tbody align="center">
                  {this.displayAllPurchaseOrder()}
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
      </div>

    );
  }
}

export default compose(
  graphql(getPurchaseOrdersQuery, {name:"getPurchaseOrdersQuery"}),
  graphql(addPurchaseOrderMutation, {name:"addPurchaseOrderMutation"}),
) (PurchaseOrder);
