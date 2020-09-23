import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import {getPeralatanQuery} from '../queries/queries';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Col,  
  Row, 
  Button,
  FormGroup,
  Label,
  Input,
  Form,
} from 'reactstrap';

class EditPeralatan extends Component {

  constructor(props) {
    super(props);
    this.state = {
        id:'',
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
    this.props.addBarangMutation({
      variables:{
        nama_barang:this.state.nama_barang,
        jenis_barang: this.state.jenis_barang,
        satuan: this.state.satuan,
        harga:parseInt(this.state.harga),
      },
      refetchQueries:[{query:getPeralatanQuery}]
    });
  }

  displayBarang(){
    const {barang} = this.props.data;
    var nama = '' ;
    var jenis = '' ;
    var sat = '';
    var har = '';
    if(barang){
        console.log(barang.nama_barang);
    }
  }

  inputHandle(e){
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
        [name] : value
    })
  }

  render() {
    return (
      <div className="animated fadeIn">
          {this.displayBarang()}
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Form Edit Data Peralatan
                <Link to="/barang/barang" className={'float-right mb-0'}> 
                  <Button label color="primary">
                      Kembali
                  </Button>
                </Link>
              </CardHeader>
              <CardBody>
                <Form onSubmit={(e) => {this.submitForm(e)}}>
                <FormGroup>
                <Label htmlFor="name">Nama Barang</Label>
                <Input type="text" id="name"  onChange={this.inputHandle.bind(this)} required />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="name">Jenis Barang</Label>
                <Input type="text" id="jenis" onChange={this.inputHandle.bind(this)}  required />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="name">Satuan</Label>
                <Input type="select" name="satuan" id="satuan" onChange={this.inputHandle.bind(this)} >
                    <option>Satuan</option>
                    <option value="Kg">Kg</option>
                    <option value="Buah">Buah</option>
                    <option value="Meter">Meter</option>
                    <option value="Lembar">Lembar</option>
                    <option value="Liter">Liter</option>
                    <option value="Sak">Sak</option>
                    <option value="m3">m3</option>
                </Input>
                </FormGroup>
                <FormGroup>
                <Label htmlFor="name">Harga Barang</Label>
                <Input type="number" id="harga" onChange={this.inputHandle.bind(this)}  required />
                </FormGroup>
                <Button type="submit" color="primary">Submit</Button>
                <Button color="danger" onClick={this.toggleModal.bind(this)}>Batal</Button>
            </Form>
                </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default compose(
    graphql(getPeralatanQuery, {
        options:(props) => {
          return{
            variables:{
              id: props.match.params.id
            }
          }
        }
      }),
)(EditPeralatan);



