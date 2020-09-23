import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import { Link } from 'react-router-dom';
import * as compose from 'lodash.flowright';
import {getVendorsQuery, addVendorMutation, hapusVendorMutation} from '../queries/queries';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
  Pagination, 
  PaginationItem,
  Button, 
  PaginationLink, 
  Row, 
  Table,
  Form, 
  FormGroup, 
  Label,
  Input,
  ModalHeader, ModalBody, Modal
 } from 'reactstrap';

class Vendor extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: null,
      nama: '',
      jenis:'',
      alamat:'',
      email:'',
      noTlp:'',
      modalIsOpen: false,
    }
  }

  toggleModal(){
    this.setState({
      modalIsOpen: ! this.state.modalIsOpen
    });
  }

  onDelete(vendor_id){
    this.props.hapusVendorMutation({
      variables:{
        id: vendor_id,        
      },
      refetchQueries:[{query:getVendorsQuery}],
    });
  }

  displayVendors(){
    var data = this.props.getVendorsQuery;
    var no = 0;
   
    if(data.loading){
      console.log(data);
      return (<div>Loading books...</div>);
    } else {
      return data.vendors.map(vendor => {
         no++;
        return(
          <tr>
            <td key={vendor.id}>{no}</td>
            <td key={vendor.id}>{vendor.nama}</td>
            <td key={vendor.id}>{vendor.jenis_usaha}</td>
            <td key={vendor.id}>{vendor.alamat}</td>
            <td key={vendor.id}>{vendor.email}</td>
            <td key={vendor.id}>{vendor.noTlp}</td>
            <td key={vendor.id}>
              <Link to={`/vendor/editVendor/${vendor.id}`}>
              <Button color="success" size="sm">
                <i className="fa fa-pencil"></i>
              </Button>
              </Link>
            </td>
            <td>
              <Button onClick={this.onDelete.bind(this, vendor.id)} color="danger" size="sm">
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
    this.props.addVendorMutation({
      variables:{
        nama:this.state.nama,
        jenis_usaha: this.state.jenis,
        alamat: this.state.alamat,
        email: this.state.email,
        noTlp: this.state.noTlp,
      },
      refetchQueries:[{query:getVendorsQuery}]
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
              <i className="fa fa-align-justify"></i>Data Vendor
                <Button size="sm" color="primary" className="float-right mb-0" onClick={this.toggleModal.bind(this)}>
                  <i className="fa fa-plus"></i> Tambah Data Vendor
                </Button>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead align="center">
                  <tr>
                    <th>No</th>
                    <th>Nama Vendor</th>
                    <th>Jenis Usaha</th>
                    <th>Alamat</th>
                    <th>Email</th>
                    <th>No Telepon</th>
                    <th>Edit</th>
                    <th>Hapus</th>
                  </tr>
                  </thead>
                  <tbody align="center">
                    {this.displayVendors()}
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
                <Label htmlFor="name">Nama Vendor</Label>
                <Input type="text" id="name" placeholder="Masukkan Nama Vendor" onChange={(e) =>this.setState({nama:e.target.value})} required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Jenis Usaha</Label>
                <Input type="text" id="jumlah" placeholder="Masukkan Jenis Usaha" onChange={(e) =>this.setState({jenis:e.target.value})} required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Alamat</Label>
                <Input type="text" id="alamat" placeholder="Masukkan Alamat" onChange={(e) =>this.setState({alamat:e.target.value})} required />
              </FormGroup>                
              <FormGroup>
                <Label htmlFor="name">Email</Label>
                <Input type="text" id="email" placeholder="Masukkan Email" onChange={(e) =>this.setState({email:e.target.value})} required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">No Telepon</Label>
                <Input type="text" id="noTlp" placeholder="Masukkan No Telepon" onChange={(e) =>this.setState({noTlp:e.target.value})} required />
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
  graphql(getVendorsQuery, {name:"getVendorsQuery"}),
  graphql(addVendorMutation, {name:"addVendorMutation"}),
  graphql(hapusVendorMutation, {name:"hapusVendorMutation"})
)(Vendor);
