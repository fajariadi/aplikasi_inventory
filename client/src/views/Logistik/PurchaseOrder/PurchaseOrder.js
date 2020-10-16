import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as compose from 'lodash.flowright';
import {graphql} from 'react-apollo';
import { getPurchaseOrdersQuery } from '../queries/queries';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem,Button, PaginationLink, Row, Table } from 'reactstrap';
import { isEmpty } from 'lodash';

class PurchaseOrder extends Component {

  displayAllPurchaseOrder(){
    var data = this.props.getPurchaseOrdersQuery;
    var no = 0;
    if(data.loading){
      return (<div>Loading Purchase Order...</div>);
    } else {
      return data.purchaseOrders.map(order => {
        no++;
        return(
          <tr>
            <td key={order.id}>{no}</td>
            <td key={order.id}>{order.kode}</td>
            <td key={order.id}>{order.divisi.nama}</td>
            <td key={order.id}>{order.tanggal}</td>
            <td key={order.id}>{order.status}</td>
            <td key={order.id}>
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
  render() {
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
                  <Link to="/purchaseOrder/buatPurchaseOrder" className={'float-right mb-0'}>
                    <Button label color="primary" size="sm">
                        <i className="fa fa-plus"></i> Buat Purchase Order
                    </Button>
                  </Link>
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
) (PurchaseOrder);
