import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getPermintaanBarangsQuery, addPermintaanBarangMutation, hapusPermintaanBarangMutation, getListRequestsQuery, hapusManyListRequestMutation} from '../queries/queries';
import { Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class PermintaanBarang extends Component {

   constructor(props){
    super(props);
    const username= localStorage.getItem("username")

    let loggedIn = true 
      if(username == null){
        loggedIn = false
      }
    this.state = {
      akun_id: localStorage.getItem("user_id"),
      kode:'',
      nama:'',
      jumlah:'',
      satuan:'',
      div_id:'',
      request_id:'',
      addRequest:false,
      loggedIn
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

  displayRequest(){
    var data1 = this.props.getPermintaanBarangsQuery;
    var no = 0;
    if(data1.loading){
      return (<div>Loading Permintaan Barang...</div>);
    } else {
      return data1.permintaanBarangs.map(request => {
        no++;
        return(
          <tr key={request.id}>
            <td>{no}</td>
            <td>{request.kode}</td>
            <td>{request.akun.karyawan.divisi.nama}</td>
            <td>{request.tanggal}</td>
            <td>{request.status}</td>
            <td>
              <Link to={`/permintaanBarang/detailPermintaanBarang/${request.id}`}>
              <Button color="primary" size="sm">
                <i className="fa fa-file"></i>
                </Button>
              </Link>
            </td>
          </tr>
        );
      });
    }
  }
  getKodeBaru(){
    var newKode = 'R';
    var kode = '';
    var nomor = 1;
    var data = this.props.getPermintaanBarangsQuery; // eslint-disable-next-line
    data.permintaanBarangs.map(request => {
      if(request.kode !== ''){
        kode = request.kode
      } 
    })
    if(kode !== ''){
      nomor = parseInt(kode.substring(1,4))+1
    }
    if(nomor < 10){
      kode = newKode+"00"+nomor;
    }else if (nomor >= 10 && nomor < 100){
      kode = newKode+"0"+nomor;
    }else {
      kode = newKode+""+nomor;
    }
    return kode;
  }

  addRequestHandler(){
    this.props.addPermintaanBarangMutation({
      variables:{
        tanggal: new Date().toLocaleDateString(),
        status: 'Belum Disetujui',
        akun_id: this.state.akun_id,
        kode: this.getKodeBaru(),
        tanggal_setuju: '',
        disetujui_id: '5f7d7b275e9e27240c35abcf',
      },
      refetchQueries:[{query:getPermintaanBarangsQuery}],
    });
    this.props.history.push("/permintaanBarang/buatPermintaanBarang");
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
                  <h5>Daftar Permintaan Barang</h5>
                </Col>
                <Col>
                    <Button color="primary" onClick={this.addRequestHandler.bind(this)} className={'float-right mb-0'}>
                    <i className="fa fa-plus mr-2"></i>Buat Permintaan Barang
                    </Button>
                  
                </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead align="center">
                  <tr>
                    <th>No</th>
                    <th>Kode</th>
                    <th>Divisi</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                    <th>Aksi</th>
                    
                  </tr>
                  </thead>
                  <tbody align="center">
                  {this.displayRequest()}
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

export default compose(
  graphql(getPermintaanBarangsQuery, {name:"getPermintaanBarangsQuery"}),
  graphql(getListRequestsQuery, {name:"getListRequestsQuery"}),
  graphql(addPermintaanBarangMutation, {name:"addPermintaanBarangMutation"}),
  graphql(hapusPermintaanBarangMutation, {name:"hapusPermintaanBarangMutation"}),
  graphql(hapusManyListRequestMutation, {name:"hapusManyListRequestMutation"}),
)(PermintaanBarang);
