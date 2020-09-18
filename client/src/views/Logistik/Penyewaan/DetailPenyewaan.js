import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class DetailPenyewaan extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Purchase Order
                <Link to="/penyewaan/penyewaan" className={'float-right mb-0'}>
                  <Button label color="secondary">
                      Kembali
                  </Button>
                </Link>
              </CardHeader>
              <CardBody>
              <Row>
                <Col sm="5">
                  <Card>
                    <CardBody>
                      <h6>Kode : PO001</h6>
                      <h6>Tanggal : 01-02-2020</h6>
                      <h6>Vendor : CV. Sumber Abadi</h6>
                      <h6>Jenis : Material Bangunan</h6>
                      <h6>Project : Renovasi Bangunan</h6>
                      <h6>Status : On Progres</h6>
                    </CardBody>
                  </Card>
                </Col>
                <Col>
                  <Table hover bordered striped responsive size="sm">
                    <thead>
                    <tr>
                      <th>Nama Material</th>
                      <th>Jumlah</th>
                      <th>Satuan</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Pasir</td>
                      <td>20</td>
                      <td>Truk</td>
                    </tr>
                    <tr>
                      <td>Paku</td>
                      <td>10</td>
                      <td>Kg</td>
                    </tr>
                    <tr>
                      <td>Seng</td>
                      <td>100</td>
                      <td>Lembar</td>
                    </tr>
                    <tr>
                      <td>Semen</td>
                      <td>50</td>
                      <td>Sak</td>
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
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default DetailPenyewaan;
