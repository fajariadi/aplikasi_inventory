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
import './laporan.css';

class BukuBesar extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
           <Col md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Buku Besar

              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th colspan="9">
                    <div className="floatleft">Akun : Kas</div>
                    <div className="floatright">No. 101</div>
                    </th>
                  </tr>
                  <tr  className="text-center">
                    <th rowspan="2" className="align-middle">Tanggal Transaksi</th>
                    <th rowspan="2" className="align-middle">Keterangan</th>
                    <th rowspan="2" className="align-middle">Referensi</th>
                    <th rowspan="2" className="align-middle">Debet</th>
                    <th rowspan="2" className="align-middle">Kredit</th>
                    <th colspan="2">Saldo</th>
                  </tr>
                  <tr className="text-center">
                    <th>Debet</th>
                    <th>Kredit</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>01-02-2020</td>
                    <td>Modal Awal</td>
                    <td>INC-001</td>
                    <td>200.000.000</td>
                    <td>0</td>
                    <td>200.000.000</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>02-02-2020</td>
                    <td>Beban Sewa</td>
                    <td>EXP-001</td>
                    <td>0</td>
                    <td>50.000.000</td>
                    <td>150.000.000</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>02-02-2020</td>
                    <td>Beban Gaji</td>
                    <td>EXP-002</td>
                    <td>0</td>
                    <td>8.000.000</td>
                    <td>142.000.000</td>
                    <td>0</td>
                  </tr>
                  </tbody>
                </Table>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th colspan="9">
                    <div className="floatleft">Akun : Modal Awal</div>
                    <div className="floatright">No. 301</div>
                    </th>
                  </tr>
                  <tr  className="text-center">
                    <th rowspan="2" className="align-middle">Tanggal Transaksi</th>
                    <th rowspan="2" className="align-middle">Keterangan</th>
                    <th rowspan="2" className="align-middle">Referensi</th>
                    <th rowspan="2" className="align-middle">Debet</th>
                    <th rowspan="2" className="align-middle">Kredit</th>
                    <th colspan="2">Saldo</th>
                  </tr>
                  <tr className="text-center">
                    <th>Debet</th>
                    <th>Kredit</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>01-02-2020</td>
                    <td>Modal Awal</td>
                    <td>INC-001</td>
                    <td>0</td>
                    <td>200.000.000</td>
                    <td>0</td>
                    <td>200.000.000</td>
                  </tr>
                  </tbody>
                </Table>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th colspan="9">
                    <div className="floatleft">Akun : Beban Sewa</div>
                    <div className="floatright">No. 302</div>
                    </th>
                  </tr>
                  <tr  className="text-center">
                    <th rowspan="2" className="align-middle">Tanggal Transaksi</th>
                    <th rowspan="2" className="align-middle">Keterangan</th>
                    <th rowspan="2" className="align-middle">Referensi</th>
                    <th rowspan="2" className="align-middle">Debet</th>
                    <th rowspan="2" className="align-middle">Kredit</th>
                    <th colspan="2">Saldo</th>
                  </tr>
                  <tr className="text-center">
                    <th>Debet</th>
                    <th>Kredit</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>02-02-2020</td>
                    <td>Beban Sewa</td>
                    <td>EXP-001</td>
                    <td>50.000.000</td>
                    <td>0</td>
                    <td>50.000.000</td>
                    <td>0</td>
                  </tr>
                  </tbody>
                </Table>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th colspan="9">
                    <div className="floatleft">Akun : Beban Gaji</div>
                    <div className="floatright">No. 303</div>
                    </th>
                  </tr>
                  <tr  className="text-center">
                    <th rowspan="2" className="align-middle">Tanggal Transaksi</th>
                    <th rowspan="2" className="align-middle">Keterangan</th>
                    <th rowspan="2" className="align-middle">Referensi</th>
                    <th rowspan="2" className="align-middle">Debet</th>
                    <th rowspan="2" className="align-middle">Kredit</th>
                    <th colspan="2">Saldo</th>
                  </tr>
                  <tr className="text-center">
                    <th>Debet</th>
                    <th>Kredit</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>02-02-2020</td>
                    <td>Beban Gaji</td>
                    <td>EXP-002</td>
                    <td>8.000.000</td>
                    <td>0</td>
                    <td>8.000.000</td>
                    <td>0</td>
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

export default BukuBesar;
