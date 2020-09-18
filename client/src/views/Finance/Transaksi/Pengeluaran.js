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

class Pengeluaran extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
           <Col md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Daftar Pengeluaran
                <Link to="/transaksi/buatPengeluaran" className={'float-right mb-0'}>
                  <Button label color="primary">
                      <i className="fa fa-plus-square"></i> Buat Transaksi Pengeluaran Baru
                  </Button>
                </Link>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>No</th>
                    <th>Tanggal Transaksi</th>
                    <th>Kode Invoice</th>
                    <th>Klien</th>
                    <th>Tgl Jatuh Tempo</th>
                    <th>Status</th>
                    <th>Sisa Tagihan</th>
                    <th>Total</th>
                    <th>Aksi</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>1</td>
                    <td>02-02-2020</td>
                    <td>EXP-001</td>
                    <td>Karyawan AMF-HAQ</td>
                    <td>20-02-2020</td>
                    <td>Paid</td>
                    <td>0</td>
                    <td>8.000.000</td>
                    <td align="center"><Button type="Submit" size="sm" color="primary" ><i className="fa fa-pencil"></i></Button>
                     &nbsp; <Button type="Submit" size="sm" color="primary" ><i className="fa fa-trash"></i></Button></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>02-02-2020</td>
                    <td>EXP-002</td>
                    <td>Everyday Apart. & Co.</td>
                    <td>09-02-2020</td>
                    <td>Paid</td>
                    <td>0</td>
                    <td>50.000.000</td>
                    <td align="center"><Button type="Submit" size="sm" color="primary" ><i className="fa fa-pencil"></i></Button>
                     &nbsp; <Button type="Submit" size="sm" color="primary" ><i className="fa fa-trash"></i></Button></td>
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

export default Pengeluaran;
