import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import Swal from 'sweetalert2';
import {getVendorQuery, getVendorsQuery, updateVendorMutation} from '../queries/queries';
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

class EditVendor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nama:'',
      jenis_usaha: '',
      alamat: '',
      email: '',
      noTlp:'',
      modalIsOpen: false,  
    };
  }

  submitForm(e){
    const {vendor} = this.props.data;
    var nam='';
    var jenis='';
    var almt='';
    var eml='';
    var no='';
    if (this.state.nama === ''){
      nam = vendor.nama
    } else {
      nam = this.state.nama
    }
    if (this.state.jenis_usaha === ''){
      jenis = vendor.jenis_usaha
    } else {
      jenis = this.state.jenis_usaha
    }
    if (this.state.alamat === ''){
      almt = vendor.alamat 
    } else {
      almt = this.state.alamat 
    }
    if (this.state.email === ''){
      eml = vendor.email
    } else {
      eml = this.state.email
    }
    if (this.state.noTlp === ''){
      no = vendor.noTlp
    } else {
      no = this.state.noTlp
    }

    this.props.updateVendorMutation({
      variables:{
        id:this.props.match.params.id,
        nama: nam,
        jenis_usaha: jenis,
        alamat: almt,
        email: eml,
        noTlp: no,
      },
      refetchQueries:[{query:getVendorsQuery}],
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Data Vendor Berhasil Diubah',
      showConfirmButton: true,
    })
  }

  displayVendor(){
    const {vendor} = this.props.data;
    if(vendor){
        return(
          <div>
            <FormGroup>
                <Label htmlFor="name">Nama Vendor</Label>
                <Input type="text" id="name"  defaultValue={vendor.nama} onChange={(e) =>this.setState({nam:e.target.value})} required />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="name">Jenis Usaha</Label>
                <Input type="text" id="jenis" defaultValue={vendor.jenis_usaha} onChange={(e) =>this.setState({jenis_usaha:e.target.value})}  required />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="name">Alamat</Label>
                <Input type="text" id="alamat" defaultValue={vendor.alamat} onChange={(e) =>this.setState({alamat:e.target.value})}  required />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="name">Email</Label>
                <Input type="text" id="email" defaultValue={vendor.email} onChange={(e) =>this.setState({email:e.target.value})}  required />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="name">No Telepon</Label>
                <Input type="text" id="noTlp" defaultValue={vendor.noTlp} onChange={(e) =>this.setState({noTlp:e.target.value})}  required />
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
                <i className="fa fa-align-justify"></i> Form Edit Data Vendor
                <Link to="/vendor/vendor" className={'float-right mb-0'}> 
                  <Button label color="primary">
                      Kembali
                  </Button>
                </Link>
              </CardHeader>
              <CardBody>
                <Form>
                {this.displayVendor()}
                <Link to="/vendor/vendor">
                  <Button type="submit" color="primary" onClick={(e) => {this.submitForm(e)}} >Submit</Button>
                </Link>
                <Link to="/vendor/vendor">
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
    graphql(getVendorQuery, {
        options:(props) => {
          return{
            variables:{
              id: props.match.params.id
            }
          }
        }
      }),
    graphql(updateVendorMutation, {name:"updateVendorMutation"}),
    graphql(getVendorsQuery, {name:"getVendorsQuery"})
)(EditVendor);



