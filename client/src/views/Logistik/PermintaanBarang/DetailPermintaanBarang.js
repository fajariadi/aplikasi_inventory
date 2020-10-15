import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getPermintaanBarangQuery, addBarangMutation} from '../queries/queries';
import { Button, Card, CardBody, CardHeader, Col, Row, Table, Form, FormGroup, Label, Input } from 'reactstrap';

class DetailPermintaanBarang extends Component {
  constructor(props){
    super(props);
    const username= localStorage.getItem("username")

    let loggedIn = true 
      if(username == null){
        loggedIn = false
      }
    this.state = {
      loggedIn
      }
  }

  displayRequestDetail(){
    const {permintaanBarang} = this.props.data;
    if(permintaanBarang){
      return(
        <CardBody>
          <Form className="form-horizontal">
          <Row> 
            <Col md="4">
              <FormGroup row>
                <Col md="6">
                  <Label htmlFor="name">Kode Permintaan</Label>
                </Col>
                <Col md="6">
                <Input type="text" name="kode" id="kode" value={permintaanBarang.kode} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>  
            <Col md="4">
              <FormGroup row>
              <Col md="3">
                  <Label htmlFor="name">Status</Label>
                </Col>
                <Col md="9">
                <Input type="text" name="kode" id="kode" value={permintaanBarang.status} disabled></Input> 
                </Col> 
              </FormGroup>
            </Col>  
          </Row>
          <Row>
            <Col md="4">
            <FormGroup row>
            <Col md="6">
                  <Label htmlFor="name">Dibuat Oleh</Label>
                </Col>
                <Col md="6">
                <Input type="text" name="kode" id="kode" value={permintaanBarang.akun.karyawan.nama} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>
            <Col md="4">
            <FormGroup row>
               <Col md="3">
                  <Label htmlFor="name">Divisi</Label>
                </Col>
                <Col md="9">
                <Input type="text" name="kode" id="kode" value={permintaanBarang.akun.karyawan.divisi.nama} disabled></Input> 
                </Col>  
              </FormGroup>
            </Col>
            <Col md="4">
            <FormGroup row>  
            <Col md="3">
                  <Label htmlFor="name">Tanggal</Label>
                </Col>
                <Col md="9">
                <Input type="text" name="kode" id="kode" value={permintaanBarang.tanggal} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>
          </Row>
        </Form>
          <hr />
          <Table hover bordered striped responsive size="sm">
            <thead>
              <tr>
                <th>Nama Barang</th>
                <th>Jumlah</th>
                <th>Satuan</th>
                <th>Jenis</th>
              </tr>
            </thead>
            <tbody>
              {
                permintaanBarang.listRequest.map(item => {
                  return(
                    <tr>
                      <td key={item.id}>{item.nama_barang}</td>
                      <td key={item.id}>{item.jumlah_barang}</td>
                      <td key={item.id}>{item.satuan}</td>
                      <td key={item.id}>{item.jenis}</td>
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
    if(this.state.loggedIn === false){
      return <Redirect to="/login" />
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
               <Row>
                <Col>
                  Detail Permintaan Barang
                </Col>
                <Col>
                  <Link to="/permintaanBarang/permintaanBarang" className={'float-right mb-0'}>
                    <Button label color="primary" size="sm">
                        Kembali
                    </Button>
                  </Link>
                </Col>
                </Row>
              </CardHeader>
              {this.displayRequestDetail()}                  
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default compose(
  graphql(getPermintaanBarangQuery, {
      options:(props) => {
        return{
          variables:{
            id: props.match.params.id
          }
        }
      }
    }),
graphql(addBarangMutation, {name:"addBarangMutation"})
)(DetailPermintaanBarang);
