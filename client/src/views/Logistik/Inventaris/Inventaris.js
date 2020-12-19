import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import {getAllInventarisQuery} from '../queries/queries';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
  Pagination, 
  PaginationItem, 
  PaginationLink, 
  Row, 
  Table,

} from 'reactstrap';

class Inventaris extends Component {

  displayInventaris(){
    var data = this.props.getAllInventarisQuery;
    var no = 0;
    if(data.loading){
      return
    } else {
      return data.allInventaris.map(inventaris => {
         no++;
        return(
          <tr key={inventaris.id}>
            <td>{no}</td>
            <td>{inventaris.barang.nama_barang}</td>
            <td>{inventaris.jumlah}</td>
            <td>{inventaris.jumlah_diperbaiki}</td>
            <td>{inventaris.jumlah_dipakai}</td>
            <td>{inventaris.jumlah-inventaris.jumlah_diperbaiki-inventaris.jumlah_dipakai}</td>
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
                <i className="fa fa-align-justify"></i>Inventaris
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead align="center">
                  <tr>
                    <th>No</th>
                    <th>Nama Barang</th>
                    <th>Jumlah</th>
                    <th>Diperbaiki</th>
                    <th>Dipakai</th>
                    <th>Tersedia</th>
                  </tr>
                  </thead>
                  <tbody align="center">
                  {this.displayInventaris()}
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
  graphql(getAllInventarisQuery, {name:"getAllInventarisQuery"}),
)(Inventaris);
