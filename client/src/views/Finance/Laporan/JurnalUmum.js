import React, { Component } from 'react';
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
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';

class JurnalUmum extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
           <Col md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Jurnal Umum - Februari 2020

              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Tanggal Transaksi</th>
                    <th>ID Invoice</th>
                    <th>Keterangan</th>
                    <th>Referensi</th>
                    <th>Debet</th>
                    <th>Kredit</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>01-02-2020</td>
                    <td>INC-001</td>
                    <td>Kas</td>
                    <td>101</td>
                    <td>200.000.000</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>&emsp;Modal Awal</td>
                    <td>301</td>
                    <td>0</td>
                    <td>200.000.000</td>
                  </tr>
                  <tr>
                    <td>02-02-2020</td>
                    <td>EXP-001</td>
                    <td>Beban Sewa</td>
                    <td>302</td>
                    <td>50.000.000</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>&emsp;Kas</td>
                    <td>101</td>
                    <td>0</td>
                    <td>50.000.000</td>
                  </tr>
                  <tr>
                    <td>02-02-2020</td>
                    <td>EXP-002</td>
                    <td>Beban Gaji</td>
                    <td>303</td>
                    <td>8.000.000</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>&emsp;Kas</td>
                    <td>101</td>
                    <td>0</td>
                    <td>8.000.000</td>
                  </tr>
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

export default JurnalUmum;
