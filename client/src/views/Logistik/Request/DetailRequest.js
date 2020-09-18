import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {graphql} from 'react-apollo';
import { getRequestQuery} from '../queries/queries';
import { Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class DetailRequest extends Component {
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
    const {request} = this.props.data;
    if(request){
      return(
        <CardBody>
          <Row>
            <Col md="4">
              <h5>Divisi : {request.divisi.nama}</h5>
            </Col>
            <Col md="4">
              <h5>Tanggal : {request.tanggal}</h5>
            </Col>
            <Col md="4">
              <h5>Status : {request.status}</h5>
            </Col>
          </Row>
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
                request.listRequest.map(item => {
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
                  <Link to="/request/request" className={'float-right mb-0'}>
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

export default
  graphql(getRequestQuery, {
    options:(props) => {
      return{
        variables:{
          id: props.match.params.id
        }
      }
    }
  })(DetailRequest);
