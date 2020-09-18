import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getDivisisQuery, addDivisiMutation, hapusDivisiMutation} from '../queries/queries';
import {  
  Card, 
  CardBody, 
  CardHeader, 
  Col, 
  Button, 
  Row, 
  Table,
  FormGroup,
  Form,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader
} from 'reactstrap';

class OfferRoom extends Component {
  constructor(props){
    super(props);
    this.state = {
      nama:'',
      modalIsOpen: false,
    }
  }

  onDelete(divisi_id){
    this.props.hapusDivisiMutation({
      variables:{
        id: divisi_id,        
      },
      refetchQueries:[{query:getDivisisQuery}],
    });
  }

  toggleModal(divisi_id){
    this.setState({
      modalIsOpen: ! this.state.modalIsOpen
    });
  }

  displayDivisis(){
    var data = this.props.getDivisisQuery;
    if(data.loading){
      return (<div>Loading Divisi...</div>);
    } else {
      return data.divisis.map(divisi => {
        return(
          <tr>
            <td key={divisi.id}>{divisi.nama}</td>
            <td key={divisi.id}>
             <Button onClick={this.toggleModal.bind(this, divisi.id)}>Edit</Button>
            </td>
            <td key={divisi.id}>
              <Button onClick={this.onDelete.bind(this, divisi.id)}>Hapus</Button>
            </td>

          </tr>
        );
      });
    }
  }

  submitRequest(e){
   e.preventDefault();
   var data = this.props.addDivisiMutation({
      variables:{
        nama:this.state.nama,
      },
      refetchQueries:[{query:getDivisisQuery}]
    });
    data.divisi.map(div =>{
        console.log(div.id)
    });
  }
  
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Form Request
                <Link to="/request/request" className={'float-right mb-0'}>
                  <Button label color="danger">
                      Batal
                  </Button>
                </Link>
              </CardHeader>
              <CardBody>
               <Form onSubmit={(e) => {this.submitRequest(e)}}>
                <Row form>
                  <Col md="4">
                    <FormGroup>
                      <Label htmlFor="name" hidden>Nama Divisi</Label>
                      <Input type="text" id="nama" onChange={(e) =>this.setState({nama:e.target.value})} placeholder="Masukkan Nama Barang" required />
                    </FormGroup>
                  </Col>
                  <Col md="2">
                    <Button type="Submit" size="sm" color="success"><i className="fa fa-plus-circle"></i> Submit</Button>
                  </Col>
                  </Row>
                </Form>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Edit</th>
                    <th>Hapus</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.displayDivisis()}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.modalIsOpen}>
          <ModalHeader>Form Tambah Barang</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => {this.addItem(e)}}>
              <FormGroup>
                <Label htmlFor="name">Nama Barang</Label>
                <Input type="select" name="nama" onChange={(e) =>this.setState({nama:e.target.value})} id="nama" required></Input>
              </FormGroup>
              <Button type="submit" color="primary">Tambah</Button>
              <Button color="danger" onClick={this.toggleModal.bind(this)}>Batal</Button>
            </Form>
          </ModalBody>  
        </Modal>
      </div>

    );
  }
}

export default compose(
  graphql(getDivisisQuery, {name:"getDivisisQuery"}),
  graphql(addDivisiMutation, {name:"addDivisiMutation"}),
  graphql(hapusDivisiMutation, {name:"hapusDivisiMutation"})
)(OfferRoom);
