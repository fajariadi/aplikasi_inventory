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
      kode:'P001',
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
          <tr>
            <td key={request.id}>{no}</td>
            <td key={request.id}>{request.kode}</td>
            <td key={request.id}>{request.akun.karyawan.divisi.nama}</td>
            <td key={request.id}>{request.tanggal}</td>
            <td key={request.id}>{request.status}</td>
            <td key={request.id}>
              <Link to={ `/permintaanBarang/detailPermintaanBarang/${request.id}` }>
              <Button color="primary" size="sm">
                <i className="fa fa-file"></i>
                </Button>
              </Link>
            </td>
            <td key={request.id}>
              <Link to={ `/permintaanBarang/editPermintaanBarang/${request.id}` }>
              <Button color="success" size="sm">
                <i className="fa fa-pencil"></i>
                </Button>
              </Link>
            </td>
            <td key={request.id}>
                <Button onClick={this.onDelete.bind(this, request.id)} color="danger" size="sm">
                <i className="fa fa-trash"></i>
                </Button>
            </td>
          </tr>
        );
      });
    }
  }

  addRequestHandler(){
    this.props.addPermintaanBarangMutation({
      variables:{
        tanggal: '03-04-2020',
        status: 'Pending',
        akun_id: this.state.akun_id,
        kode: this.state.kode
      },
      refetchQueries:[{query:getPermintaanBarangsQuery}],
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
                  <h5>Permintaan Barang</h5>
                </Col>
                <Col>
                  <Link to="/permintaanBarang/buatPermintaanBarang" className={'float-right mb-0'}>
                    <Button color="primary" onClick={this.addRequestHandler.bind(this)}>
                    <i className="fa fa-plus mr-2"></i>Buat Permintaan
                    </Button>
                  </Link>
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
                    <th>Detail</th>
                    <th>Edit</th>
                    <th>Hapus</th>
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
