import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import { Link } from 'react-router-dom';
import * as compose from 'lodash.flowright';
import {getPersediaanBarangsQuery} from '../queries/queries';
import { 
  Form,
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
  Modal, ModalBody, ModalHeader
} from 'reactstrap';

class PersediaanBarang extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nama:'',
      jumlah: 0,
      modalIsOpen: false,  
      harga: 0,
      sewa: 0,
    };
  }

 

  displayPersediaanBarangs(){
    var data = this.props.getPersediaanBarangsQuery;
    var no = 0;
    if(data.loading){
      return (<div>Loading Persediaan...</div>);
    } else {
      return data.persediaanBarangs.map(persediaan => {
         no++;
        return(
          <tr key={persediaan.id}>
            <td>{no}</td>
            <td>{persediaan.barang.nama_barang}</td>
            <td>{persediaan.jumlah}</td>
            <td>{persediaan.status}</td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>Persediaan Barang
                <Button size="sm" color="primary" className="float-right mb-0">
                  <i className="fa fa-plus"></i> Tambah Persediaan Barang
                </Button>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead align="center">
                  <tr>
                    <th>No</th>
                    <th>Nama Barang</th>
                    <th>Jumlah</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody align="center">
                  {this.displayPersediaanBarangs()}
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
  graphql(getPersediaanBarangsQuery, {name:"getPersediaanBarangsQuery"}),
)(PersediaanBarang);
