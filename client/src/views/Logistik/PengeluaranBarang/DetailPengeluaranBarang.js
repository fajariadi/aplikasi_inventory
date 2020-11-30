import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import { Link } from 'react-router-dom';
import * as compose from 'lodash.flowright';
import {getPengeluaranBarangQuery} from '../queries/queries';
import { 
  Form,
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
  Row, 
  Table,
  Button,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

class DetailPengeluaranBarang extends Component {

  constructor(props) {
    super(props);
  }

  displayPengeluaranBarangDetail(){
    const {pengeluaranBarang} = this.props.data;
    if (pengeluaranBarang){
      return(
        <CardBody>
          <Form className="form-horizontal">
          <Row> 
            <Col md="4">
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="name">Kode pengeluaran Barang</Label>
                </Col>
                <Col md="6">
                <Input type="text" name="kode" id="kode" value={pengeluaranBarang.kode} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>  
            <Col md="4">
              <FormGroup row>
              <Col md="3">
                  <Label htmlFor="name">Tanggal</Label>
                </Col>
                <Col md="9">
                <Input type="text" name="kode" id="kode" value={pengeluaranBarang.tanggal} disabled></Input> 
                </Col> 
              </FormGroup>
            </Col>  
            <Col md="4">
              <FormGroup row>
              <Col md="3">
                  <Label htmlFor="name">Penerima</Label>
                </Col>
                <Col md="9">
                <Input type="text" name="kode" id="kode" value={pengeluaranBarang.akun.karyawan.nama} disabled></Input> 
                </Col> 
              </FormGroup>
            </Col>  
          </Row>
          <Row> 
            <Col md="4">
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="name">Kode Permintaan Barang</Label>
                </Col>
                <Col md="6">
                <Input type="text" name="kode" id="kode" value={pengeluaranBarang.permintaanBarang.kode} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>  
            <Col md="4">
              <FormGroup row>
              <Col md="3">
                  <Label htmlFor="name">Dibuat Oleh</Label>
                </Col>
                <Col md="9">
                <Input type="text" name="kode" id="kode" value={pengeluaranBarang.permintaanBarang.akun.karyawan.nama} disabled></Input> 
                </Col> 
              </FormGroup>
            </Col>  
            <Col md="4">
              <FormGroup row>
              <Col md="3">
                  <Label htmlFor="name">Divisi</Label>
                </Col>
                <Col md="9">
                <Input type="text" name="kode" id="kode" value={pengeluaranBarang.permintaanBarang.akun.karyawan.divisi.nama} disabled></Input> 
                </Col> 
              </FormGroup>
            </Col>
          </Row>
          
        </Form>
          <hr />
          <Table hover bordered striped responsive size="sm">
            <thead align="center">
              <tr>
                <th>Nama Barang</th>
                <th>Satuan</th>
                <th>Jumlah</th>
              </tr>
            </thead>
            <tbody align="center">
              {
                pengeluaranBarang.permintaanBarang.listRequest.map(item => {
                  return(
                    <tr key={item.id}>
                      <td>{item.nama_barang}</td>
                      <td>{item.satuan}</td>
                      <td>{item.jumlah_barang}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </CardBody>
      )
    }
  }


  render() {
    return (
      <div className="animated fadeIn">
        <Row>
           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>Detail Pengeluaran Barang
                <Link to="/pengeluaranBarang/pengeluaranBarang" className={'float-right mb-0'}>
                    <Button color="secondary" size="sm">
                        Kembali
                    </Button>
                  </Link>
              </CardHeader>
              {this.displayPengeluaranBarangDetail()}
            </Card>
          </Col>
        </Row>
        
      </div>

    );
  }
}

export default compose(
    graphql(getPengeluaranBarangQuery, {
        options:(props) => {
          return{
            variables:{
              id: props.match.params.id
            }
          }
        }
      }),  
)(DetailPengeluaranBarang);
