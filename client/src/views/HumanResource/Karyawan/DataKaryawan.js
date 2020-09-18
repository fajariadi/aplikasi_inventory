import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem,Button, PaginationLink, Row, Table } from 'reactstrap';

class DataKaryawan extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Row>
                <Col>
                  Daftar Karyawan
                </Col>
                <Col>
                  <Link to="/karyawan/tambahKaryawan" className={'float-right mb-0'}>
                    <Button label color="primary" size="sm">
                        <i className="fa fa-plus"></i> Tambah Data Karyawan
                    </Button>
                  </Link>
                </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>No</th>
                    <th>ID Karyawan</th>
                    <th>Nama</th>
                    <th>Tanggal Lahir</th>
                    <th>Jenis Kelamin</th>
                    <th>Agama</th>
                    <th>Kota Asal</th>
                    <th>Domisili Sekarang</th>
                    <th>No Kontak</th>
                    <th>Email</th>
                    <th>Jabatan</th>
                    <th>Aksi</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>1</td>
                    <td>KY-001</td>
                    <td>Izza Armani</td>
                    <td>14-11-1995</td>
                    <td>Pria</td>
                    <td>Islam</td>
                    <td>Tulungagung</td>
                    <td>Jl. Kelapa Kopyor No. 212, Jakarta</td>
                    <td>082234678834</td>
                    <td>izzarmani@gmail.com</td>
                    <td>HRD Staff</td>
                    <td align="center"><Button type="Submit" size="sm" color="primary" ><i className="fa fa-pencil"></i></Button>
                     &nbsp; <Button type="Submit" size="sm" color="primary" ><i className="fa fa-trash"></i></Button></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>KY-002</td>
                    <td>Izzalea Arinni Nurwati</td>
                    <td>14-07-1991</td>
                    <td>Wanita</td>
                    <td>Kristen</td>
                    <td>Tulungagung</td>
                    <td>Jl. Gula Aren No. 144, Jakarta</td>
                    <td>085634223756</td>
                    <td>lea_inni@gmail.com</td>
                    <td>Akuntan Staff</td>
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

export default DataKaryawan;
