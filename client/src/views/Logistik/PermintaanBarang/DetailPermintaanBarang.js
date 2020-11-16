import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getPermintaanBarangQuery, getPermintaanBarangsQuery, hapusPermintaanBarangMutation, hapusManyListRequestMutation, updateStatusPermintaanBarang, updateStatusListRequest, getListRequestsQuery} from '../queries/queries';
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
      loggedIn,
      akun_id: localStorage.getItem("user_id"),
      divisi: localStorage.getItem("divisi"),
      }
  }

  onDelete(request_id){
    this.props.hapusPermintaanBarangMutation({
       variables:{
         id: request_id,        
       },
       refetchQueries:[{query:getPermintaanBarangsQuery}],
     });
    this.props.hapusManyListRequestMutation({
       variables:{
         id: request_id,        
       },
       refetchQueries:[{query:getPermintaanBarangsQuery}],
     });
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
            {this.renderElement3(permintaanBarang.status, permintaanBarang.tanggal_setuju)}
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
            <thead align="center">
              <tr>
                <th>Nama Barang</th>
                <th>Jumlah</th>
                <th>Satuan</th>
                <th>Jenis</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody align="center">
              {
                permintaanBarang.listRequest.map(item => {
                  return(
                    <tr key={item.id}>
                      <td>{item.nama_barang}</td>
                      <td>{item.jumlah_barang}</td>
                      <td>{item.satuan}</td>
                      <td>{item.jenis}</td>
                      <td>{item.status}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          <hr />
          <Row>
            <Col>
              {this.renderElement(permintaanBarang.akun.id, permintaanBarang.status)} 
            </Col>
            <Col>
              {this.renderElement2(permintaanBarang.tanggal_setuju)}
            </Col>
          </Row>
        </CardBody>
      )
    }
  }

  renderElement(akun_id, status){
    if (this.state.akun_id === akun_id && status === 'Belum Disetujui'){
      return(
        <div align="center">
        <Link to={ `/permintaanBarang/editPermintaanBarang/${this.props.match.params.id}` }>
          <Button color="warning">
            <i className="fa fa-pencil" >Edit Permintaan Barang</i>
            </Button>
        </Link>
        <Link to="/permintaanBarang/permintaanBarang">
          <Button onClick={this.onDelete.bind(this, this.props.match.params.id)} color="danger">
            <i className="fa fa-trash">Hapus Permintaan Barang</i>
          </Button>
        </Link>
      </div>
      )
    } else {
      return(
        <div align="center">
          <Link to="/permintaanBarang/permintaanBarang">
          <Button onClick={this.onDelete.bind(this, this.props.match.params.id)} color="danger">
            <i className="fa fa-trash">Hapus Permintaan Barang</i>
          </Button>
        </Link>
        </div>
      )
    }
  }

  renderElement2(tanggal){
    if(this.state.divisi ===  "Logistic" && tanggal === '' ){
      return(
        <div align="center">
          <Link to="/permintaanBarang/permintaanBarang">
            <Button onClick={this.onSetujuiPermintaan.bind(this, this.props.match.params.id)} color="success">
              <i className="fa fa-check">Setujui Permintaan Barang</i>
            </Button>
          </Link>
          <Link to="/permintaanBarang/permintaanBarang">
            <Button onClick={this.onTolakPermintaan.bind(this, this.props.match.params.id)} color="danger">
              <i className="fa fa-times">Tolak Permintaan Barang</i>
            </Button>
          </Link>
        </div> 
      )
    }
  }
  renderElement3(status, tanggal){
    if(status === 'Disetujui' || status === 'Ditolak'){
      return(
        <Col md="4">
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="name">Tanggal Diproses</Label>
            </Col>
            <Col md="9">
              <Input type="text" name="kode" id="kode" value={tanggal} disabled></Input> 
            </Col> 
          </FormGroup>
        </Col> 
      )
    } 
  }

  onSetujuiPermintaan(permintaan_id){
    this.props.updateStatusPermintaanBarang({
      variables:{
        id:permintaan_id,
        status: 'Disetujui',
        tanggal_setuju: new Date().toLocaleDateString(),
      },
      refetchQueries:[{query:getPermintaanBarangsQuery}],
    });
    this.props.updateStatusListRequest({
      variables:{
        id:permintaan_id,
        status: 'Active',
      },
      refetchQueries:[{query:getListRequestsQuery}],
    });
  }

  onTolakPermintaan(permintaan_id){
    this.props.updateStatusPermintaanBarang({
      variables:{
        id:permintaan_id,
        status: 'Ditolak',
        tanggal_setuju: new Date().toLocaleDateString(),
      },
      refetchQueries:[{query:getPermintaanBarangsQuery}],
    });
    this.props.updateStatusListRequest({
      variables:{
        id:permintaan_id,
        status: 'Ditolak',
      },
      refetchQueries:[{query:getListRequestsQuery}],
    });
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
                    <Button color="primary" size="sm">
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

export default compose (
  graphql(getPermintaanBarangQuery, {
      options:(props) => {
        return{
          variables:{
            id: props.match.params.id
          }
        }
      }
    }),
    graphql(updateStatusListRequest, {name:"updateStatusListRequest"}),
    graphql(updateStatusPermintaanBarang, {name:"updateStatusPermintaanBarang"}),
    graphql(getPermintaanBarangsQuery, {name:"getPermintaanBarangsQuery"}),
    graphql(getListRequestsQuery, {name:"getListRequestsQuery"}),
    graphql(hapusPermintaanBarangMutation, {name:"hapusPermintaanBarangMutation"}),
    graphql(hapusManyListRequestMutation, {name:"hapusManyListRequestMutation"}),
)(DetailPermintaanBarang);
