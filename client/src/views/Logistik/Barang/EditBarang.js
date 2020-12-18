import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import Swal from 'sweetalert2';
import {getBarangQuery, updateBarangMutation, getBarangsQuery} from '../queries/queries';
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

class EditBarang extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:'',
      nama_barang:'',
      jenis_barang: '',
      satuan: '',
      harga: 0,
      modalIsOpen: false,  
    };
  }

  toggleModal(){
    this.setState({
      modalIsOpen: ! this.state.modalIsOpen
    });
  }

  submitForm(e){
    const {barang} = this.props.data;
    var nama='';
    var jenis='';
    var sat='';
    var har=0;
    if (this.state.nama_barang === ''){
      nama = barang.nama_barang
    } else {
      nama = this.state.nama_barang
    }
    if (this.state.jenis_barang === ''){
      jenis = barang.jenis_barang
    } else {
      jenis = this.state.jenis_barang
    }
    if (this.state.satuan === ''){
      sat = barang.satuan 
    } else {
      sat = this.state.satuan 
    }
    if (this.state.harga === 0){
      har = barang.harga
    } else {
      har = this.state.harga
    }
    this.props.updateBarangMutation({
      variables:{
        id:this.props.match.params.id,
        nama_barang: nama,
        jenis_barang: jenis,
        satuan: sat,
        harga: parseInt(har),
      },
      refetchQueries:[{query:getBarangsQuery}],
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Data Barang Berhasil Diubah',
      showConfirmButton: true,
    })
  }

  displayBarang(){
    const {barang} = this.props.data;
    if(barang){
       return(
         <div>
           <FormGroup>
                <Label htmlFor="name">Nama Barang</Label>
                <Input type="text" id="name" defaultValue={barang.nama_barang} onChange={(e) =>this.setState({nama_barang:e.target.value})} required />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="name">Jenis Barang</Label>
                <Input type="text" id="jenis" defaultValue={barang.jenis_barang} onChange={(e) =>this.setState({jenis_barang:e.target.value})}  required />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="name">Satuan</Label>
                <Input type="select" name="satuan" id="satuan" defaultValue={barang.satuan} onChange={(e) =>this.setState({satuan:e.target.value})} >
                    <option>Satuan</option>
                    <option value="Kg">Kg</option>
                    <option value="Buah">Buah</option>
                    <option value="Meter">Meter</option>
                    <option value="Lembar">Lembar</option>
                    <option value="Liter">Liter</option>
                    <option value="Sak">Sak</option>
                    <option value="m2">m2</option>
                    <option value="m3">m3</option>
                    <option value="Roll">Roll</option>
                    <option value="Kardus">Kardus</option>
                    <option value="Batang">Batang</option>
                    <option value="Truk">Truk</option>
                    <option value="Drum">Drum</option>
                    <option value="Takaran">Takaran</option>
                </Input>
                </FormGroup>
                <FormGroup>
                <Label htmlFor="name">Harga Barang</Label>
                <Input type="number" id="harga" defaultValue={barang.harga} onChange={(e) =>this.setState({harga:e.target.value})}  required />
                </FormGroup>
         </div>
       )
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Form Edit Data Barang
                <Link to="/barang/barang" className={'float-right mb-0'}> 
                  <Button label color="primary">
                      Kembali
                  </Button>
                </Link>
              </CardHeader>
              <CardBody>
                <Form>
                {this.displayBarang()}
                <Link to="/barang/barang">
                  <Button type="submit" color="primary" onClick={(e) => {this.submitForm(e)}} >Submit</Button>
                </Link>
                <Link to="/barang/barang">
                  <Button color="danger">Batal</Button>
                </Link>
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
    graphql(getBarangQuery, {
        options:(props) => {
          return{
            variables:{
              id: props.match.params.id
            }
          }
        }
      }),
  graphql(updateBarangMutation, {name:"updateBarangMutation"}),
  graphql(getBarangsQuery, {name:"getBarangsQuery"})
)(EditBarang);



