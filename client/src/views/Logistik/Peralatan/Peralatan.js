import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import { Link } from 'react-router-dom';
import * as compose from 'lodash.flowright';
import {getPeralatansQuery, addPeralatanMutation, hapusPeralatanMutation} from '../queries/queries';
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
  Collapse,
  Modal, ModalBody, ModalHeader
} from 'reactstrap';

class Peralatan extends Component {

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

  toggleModal(){
    this.setState({
      modalIsOpen: ! this.state.modalIsOpen
    });
  }

  onDelete(alat_id){
    this.props.hapusPeralatanMutation({
      variables:{
        id: alat_id,        
      },
      refetchQueries:[{query:getPeralatansQuery}],
    });
  }

  displayPeralatans(){
    var data = this.props.getPeralatansQuery;
    var no = 0;
    if(data.loading){
      return (<div>Loading Alat...</div>);
    } else {
      return data.peralatans.map(alat => {
         no++;
        return(
          <tr>
            <td key={alat.id}>{no}</td>
            <td key={alat.id}>{alat.nama}</td>
            <td key={alat.id}>{alat.jumlah}</td>
            <td key={alat.id}>{alat.harga}</td>
            <td key={alat.id}>{alat.sewa}</td>
            <td key={alat.id}>
              <Link to={`/peralatan/editPeralatan/${alat.id}`}>
              <Button color="success" size="sm">
                <i className="fa fa-pencil"></i>
              </Button>
              </Link>
            </td>
            <td>
              <Button onClick={this.onDelete.bind(this, alat.id)} color="danger" size="sm">
                <i className="fa fa-trash"></i>
              </Button>
            </td>
          </tr>
        );
      });
    }
  }

  submitForm(e){
    e.preventDefault();
    this.toggleModal();
    this.props.addPeralatanMutation({
      variables:{
        nama:this.state.nama,
        jumlah: parseInt(this.state.jumlah),
        harga: parseInt(this.state.harga),
        sewa: parseInt(this.state.sewa)
      },
      refetchQueries:[{query:getPeralatansQuery}]
    });
  }

  
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>Data Peralatan
                <Button size="sm" color="primary" className="float-right mb-0" onClick={this.toggleModal.bind(this)}>
                  <i className="fa fa-plus"></i> Tambah Data Peralatan
                </Button>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead align="center">
                  <tr>
                    <th>No</th>
                    <th>Nama Peralatan</th>
                    <th>Jumlah</th>
                    <th>Harga / unit (Rp)</th>
                    <th>Harga Sewa / unit (Rp)</th>
                    <th>Edit</th>
                    <th>Hapus</th>
                  </tr>
                  </thead>
                  <tbody align="center">
                  {this.displayPeralatans()}
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
          <ModalHeader>Form Tambah Data Peralatan</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => {this.submitForm(e)}}>
              <FormGroup>
                <Label htmlFor="name">Nama Peralatan</Label>
                <Input type="text" id="name" placeholder="Masukkan Nama Perlatan" onChange={(e) =>this.setState({nama:e.target.value})} required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Jumlah</Label>
                <Input type="number" id="jumlah" placeholder="Masukkan Jumlah Peralatan" onChange={(e) =>this.setState({jumlah:e.target.value})} required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Harga Beli</Label>
                <Input type="number" id="harga" placeholder="Masukkan Harga Beli" onChange={(e) =>this.setState({harga:e.target.value})} required />
              </FormGroup>                
              <FormGroup>
                <Label htmlFor="name">Harga Sewa</Label>
                <Input type="number" id="sewa" placeholder="Masukkan Harga Sewa" onChange={(e) =>this.setState({sewa:e.target.value})} required />
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
  graphql(getPeralatansQuery, {name:"getPeralatansQuery"}),
  graphql(addPeralatanMutation, {name:"addPeralatanMutation"}),
  graphql(hapusPeralatanMutation, {name:"hapusPeralatanMutation"}),
)(Peralatan);
