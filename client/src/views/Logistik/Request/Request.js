import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getRequestsQuery, addRequestMutation, hapusRequestMutation, getListRequestsQuery, hapusManyListRequestMutation} from '../queries/queries';
import { Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class Request extends Component {

   constructor(props){
    super(props);
    const username= localStorage.getItem("username")

    let loggedIn = true 
      if(username == null){
        loggedIn = false
      }
    this.state = {
      divisi_id: localStorage.getItem("divisi_id"),
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
   this.props.hapusRequestMutation({
      variables:{
        id: request_id,        
      },
      refetchQueries:[{query:getRequestsQuery}],
    });
   this.props.hapusManyListRequestMutation({
      variables:{
        id: request_id,        
      },
      refetchQueries:[{query:getRequestsQuery}],
    });
  }

  displayRequest(){
    var data1 = this.props.getRequestsQuery;
    var no = 0;
    if(data1.loading){
      return (<div>Loading Permintaan Barang...</div>);
    } else {
      return data1.requests.map(request => {
        no++;
        return(
          <tr>
            <td key={request.id}>{no}</td>
            <td key={request.id}>{request.divisi.nama}</td>
            <td key={request.id}>{request.tanggal}</td>
            <td key={request.id}>{request.status}</td>
            <td key={request.id}>
              <Link to={ `/request/detailRequest/${request.id}` }>
                <i className="fa fa-file"></i>
              </Link>
            </td>
            <td key={request.id}>
              <Link to={ `/request/editRequest/${request.id}` }>
                Edit
              </Link>
            </td>
            <td key={request.id}>
                <Button onClick={this.onDelete.bind(this, request.id)}>Hapus</Button>
            </td>
          </tr>
        );
      });
    }
  }

  addRequestHandler(){
    this.props.addRequestMutation({
      variables:{
        tanggal: '03-04-2020',
        status: 'Pending',
        divisi_id: this.state.divisi_id,
      },
      refetchQueries:[{query:getRequestsQuery}],
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
                  <Link to="/request/createRequest" className={'float-right mb-0'}>
                    <Button color="primary" onClick={this.addRequestHandler.bind(this)}>
                        Buat Permintaan
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
  graphql(getRequestsQuery, {name:"getRequestsQuery"}),
  graphql(getListRequestsQuery, {name:"getListRequestsQuery"}),
  graphql(addRequestMutation, {name:"addRequestMutation"}),
  graphql(hapusRequestMutation, {name:"hapusRequestMutation"}),
  graphql(hapusManyListRequestMutation, {name:"hapusManyListRequestMutation"}),
)(Request);
