import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import { Link } from 'react-router-dom';
import * as compose from 'lodash.flowright';
import {getAllInventarisQuery, addInventaris, getBarangsQuery} from '../queries/queries';
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

class Inventaris extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nama:'',
      barang_id:'',
      jumlah: 0,
      modalIsOpen: false,  
      harga: 0,
      sewa: 0,
    };
  }

  displayInventaris(){
    var data = this.props.getAllInventarisQuery;
    var no = 0;
    if(data.loading){
      return
    } else {
      return data.allInventaris.map(inventaris => {
         no++;
        return(
          <tr key={inventaris.id}>
            <td>{no}</td>
            <td>{inventaris.barang.nama_barang}</td>
            <td>{inventaris.jumlah}</td>
            <td>{inventaris.jumlah_diperbaiki}</td>
            <td>{inventaris.jumlah_dipakai}</td>
            <td>{inventaris.jumlah-inventaris.jumlah_diperbaiki-inventaris.jumlah_dipakai}</td>
          </tr>
        );
      });
    }
  }

  displayBarang(){
    var data = this.props.getBarangsQuery;
    if(data.loading){
      return (<div>Loading Barang...</div>);
    } else {
      return data.barangs.map(barang => {
        if(barang.jenis_barang === 'Perkakas'){
          return(
            <option key={barang.id} value={barang.id}>{barang.nama_barang}</option>
          )
        }
      });
    }
  }

  toggleModal(){
    this.setState({
      modalIsOpen: ! this.state.modalIsOpen
    });
  }

  submitForm(e){
    e.preventDefault();
    this.toggleModal();
    this.props.addInventaris({
      variables:{
        barang_id:this.state.barang_id,
        jumlah: parseInt(this.state.jumlah),
        status: 'Available',
        jumlah_dipakai: 0,
        jumlah_diperbaiki: 0,
      },
      refetchQueries:[{query:getAllInventarisQuery}]
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>Inventaris
                <Button size="sm" color="primary" className="float-right mb-0" onClick={this.toggleModal.bind(this)}>
                  <i className="fa fa-plus"></i> Tambah Inventaris
                </Button>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead align="center">
                  <tr>
                    <th>No</th>
                    <th>Nama Barang</th>
                    <th>Jumlah</th>
                    <th>Diperbaiki</th>
                    <th>Dipakai</th>
                    <th>Tersedia</th>
                  </tr>
                  </thead>
                  <tbody align="center">
                  {this.displayInventaris()}
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
        <Modal isOpen={this.state.modalIsOpen}>
          <ModalHeader>Form Inventaris</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => {this.submitForm(e)}}>
              <FormGroup>
              <Label htmlFor="name">Nama Barang</Label>
                <Input type="select" name="nama" onChange={(e) =>this.setState({barang_id:e.target.value})} id="nama" required>
                  <option>Nama Barang</option>
                  {this.displayBarang()}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Jumlah</Label>
                <Input type="number" id="jumlah" placeholder="Masukkan Jumlah Peralatan" onChange={(e) =>this.setState({jumlah:e.target.value})} required />
              </FormGroup>              
              <Button type="submit" color="primary">Submit</Button>
              <Button color="danger" onClick={this.toggleModal.bind(this)}>Batal</Button>
            </Form>
          </ModalBody>  
        </Modal>
      </div>

    );
  }
}

export default compose(
  graphql(getAllInventarisQuery, {name:"getAllInventarisQuery"}),
  graphql(addInventaris, {name:"addInventaris"}),
  graphql(getBarangsQuery, {name:"getBarangsQuery"}),
)(Inventaris);
