import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import {getPersediaanBarangsQuery} from '../queries/queries';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
  Row, 
  Table,
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
      return
    } else {
      return data.persediaanBarangs.map(persediaan => {
         no++;
        return(
          <tr key={persediaan.id}>
            <td>{no}</td>
            <td>{persediaan.barang.nama_barang}</td>
            <td>{persediaan.barang.jenis_barang}</td>
            <td>{persediaan.barang.satuan}</td>
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
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead align="center">
                  <tr>
                    <th>No</th>
                    <th>Nama Barang</th>
                    <th>Jenis</th>
                    <th>Satuan</th>
                    <th>Jumlah</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody align="center">
                  {this.displayPersediaanBarangs()}
                  </tbody>
                </Table>
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
