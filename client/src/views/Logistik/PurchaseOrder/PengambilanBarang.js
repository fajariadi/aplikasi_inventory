import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem,Button, PaginationLink, Row, Table } from 'reactstrap';

class PengambilanBarang extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Pengambilan Barang Order
                <Link to="/order/createOrder" className={'float-right mb-0'}>
                  <Button label color="primary">
                      Buat Order
                  </Button>
                </Link>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Kode</th>
                    <th>Tanggal</th>
                    <th>Vendor</th>
                    <th>Jenis</th>
                    <th>Nama Project</th>
                    <th>Status</th>
                    <th>Detail Order</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>PO001</td>
                    <td>01-02-2020</td>
                    <td>CV. Sumber Abadi</td>
                    <td>Material Bangunan</td>
                    <td>Project Renovasi</td>
                    <td>On Progress</td>
                    <td>
                      <Link to="/order/detailOrder" className="ml-auto">
                        Lihat
                      </Link>
                    </td>
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

export default PengambilanBarang;
