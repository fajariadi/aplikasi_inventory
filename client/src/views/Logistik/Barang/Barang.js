import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import {getBarangsQuery, addBarangMutation, hapusBarangMutation} from '../queries/queries';
import { 
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
  Modal,
  ModalHeader,
  ModalBody,
  Form,
} from 'reactstrap';

class Barang extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nama_barang:'',
      jenis_barang: '',
      satuan: '',
      harga: '',
      modalIsOpen: false,  
    };
  }

  toggleModal(){
    this.setState({
      modalIsOpen: ! this.state.modalIsOpen
    });
  }

  submitForm(e){
    e.preventDefault();
    this.toggleModal();
    this.props.addBarangMutation({
      variables:{
        nama_barang:this.state.nama_barang,
        jenis_barang: this.state.jenis_barang,
        satuan: this.state.satuan,
        harga:parseInt(this.state.harga),
      },
      refetchQueries:[{query:getBarangsQuery}]
    });
  }

  onDelete(barang_id){
    this.props.hapusBarangMutation({
      variables:{
        id: barang_id,        
      },
      refetchQueries:[{query:getBarangsQuery}],
    });
  }

  displayBarang(){
    var data = this.props.getBarangsQuery;
    var no = 0;
    if(data.loading){
      return (<div>Loading Daftar Barang...</div>);
    } else {
      return data.barangs.map(barang => {
        no++;
        return(
          <tr key={barang.id}>
            <td>{no}</td>
            <td>{barang.nama_barang}</td>
            <td>{barang.jenis_barang}</td>
            <td>{barang.satuan}</td>
            <td>{barang.harga}</td>
            <td>
              <Link to={`/barang/editBarang/${barang.id}`}>
              <Button color="success" size="sm">
                <i className="fa fa-pencil"></i>
              </Button>
              </Link>
            </td>
            <td>
              <Button onClick={this.onDelete.bind(this, barang.id)} color="danger" size="sm">
                <i className="fa fa-trash"></i>
              </Button>
            </td>
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
                <i className="fa fa-align-justify"></i> Data Barang
                <Button size="sm" color="primary" className="float-right mb-0" onClick={this.toggleModal.bind(this)}>
                  <i className="fa fa-plus"></i> Tambah Data Barang
                </Button>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead align="center">
                  <tr>
                    <th>No</th>
                    <th>Nama Barang</th>
                    <th>Jenis Barang</th>
                    <th>Satuan</th>
                    <th>Harga (Rp)</th>
                    <th>Edit</th>
                    <th>Hapus</th>
                  </tr>
                  </thead>
                  <tbody align="center">
                    {this.displayBarang()}
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
          <ModalHeader>Form Tambah Data Barang</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => {this.submitForm(e)}}>
              <FormGroup>
                <Label htmlFor="name">Nama Barang</Label>
                <Input type="text" id="name" placeholder="Masukkan Nama Barang" onChange={(e) =>this.setState({nama_barang:e.target.value})} required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Jenis Barang</Label>
                <Input type="text" id="jenis" placeholder="Masukkan Jenis Barang" onChange={(e) =>this.setState({jenis_barang:e.target.value})} required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Satuan</Label>
                <Input type="select" name="satuan" id="satuan" onChange={(e) =>this.setState({satuan:e.target.value})}>
                  <option>Satuan</option>
                  <option value="Kg">Kg</option>
                  <option value="Buah">Buah</option>
                  <option value="Meter">Meter</option>
                  <option value="Lembar">Lembar</option>
                  <option value="Liter">Liter</option>
                  <option value="Sak">Sak</option>
                  <option value="m">m</option>
                  <option value="m2">m2</option>
                  <option value="m3">m3</option>
                  <option value="Roll">Roll</option>
                  <option value="Kardus">Kardus</option>
                  <option value="Batang">Batang</option>
                  <option value="Truk">Truk</option>
                  <option value="Drum">Drum</option>
                  <option value="Takaran">Takaran</option>
                  <option value="Takaran">Unit</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Harga Barang</Label>
                <Input type="number" id="harga" placeholder="Masukkan Harga Barang" onChange={(e) =>this.setState({harga:e.target.value})} required />
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
  graphql(getBarangsQuery, {name:"getBarangsQuery"}),
  graphql(addBarangMutation, {name:"addBarangMutation"}),
  graphql(hapusBarangMutation, {name:"hapusBarangMutation"})
)(Barang);
