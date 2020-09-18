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
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

class Pemeliharaan extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
           <Col md="8">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Daftar Peralatan Rusak
                <Button size="sm" className="float-right mb-0">
                  <i className="fa fa-cloud-download"></i> Unduh
                </Button>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>No</th>
                    <th>Kode</th>
                    <th>Nama Peralatan</th>
                    <th>Jumlah</th>
                    <th>Satuan</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>1</td>
                    <td>P001</td>
                    <td>Helmet</td>
                    <td>5</td>
                    <td>Buah</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>P002</td>
                    <td>Rompi</td>
                    <td>8</td>
                    <td>Buah</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>P003</td>
                    <td>Sepatu Safety</td>
                    <td>2</td>
                    <td>Buah</td>
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


            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Daftra Maintenance
                <Button size="sm" className="float-right mb-0">
                  <i className="fa fa-cloud-download"></i> Unduh
                </Button>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>No</th>
                    <th>Kode</th>
                    <th>Nama Peralatan</th>
                    <th>Jumlah</th>
                    <th>Satuan</th>
                    <th>Teknisi</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>1</td>
                    <td>P001</td>
                    <td>Helmet</td>
                    <td>2</td>
                    <td>Buah</td>
                    <td>Doni</td>
                    <td>On Progres</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>P002</td>
                    <td>Rompi</td>
                    <td>2</td>
                    <td>Buah</td>
                    <td>Doni</td>
                    <td>On Progres</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>P003</td>
                    <td>Sepatu Safety</td>
                    <td>2</td>
                    <td>Buah</td>
                    <td>Riko</td>
                    <td>On Progres</td>
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
          <Col>
          <Card>
            <CardHeader>
              <i className="fa fa-plus-square"></i> Form Tambah Maintenance
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Label htmlFor="name">Nama Peralatan</Label>
                <Input type="text" id="name" placeholder="Masukkan Nama Peralatan" required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Jumlah</Label>
                <Input type="number" id="jumlah" placeholder="Masukkan Jumlah Material" required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Satuan</Label>
                <Input type="select" name="satuan" id="satuan">
                  <option value="Kg">Kg</option>
                  <option value="Buah">Buah</option>
                  <option value="Meter">Meter</option>
                  <option value="Lembar">Lembar</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Teknisi</Label>
                <Input type="text" id="jumlah" placeholder="Masukkan Nama Teknisi" required />
              </FormGroup>
              <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
              <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
            </CardBody>
          </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Pemeliharaan;
