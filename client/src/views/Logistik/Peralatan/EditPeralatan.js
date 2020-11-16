import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import {getPeralatanQuery, updatePeralatanMutation, getPeralatansQuery} from '../queries/queries';
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
      nama:'',
      jumlah: 0,
      sewa: 0,
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
    const {peralatan} = this.props.data;
    var nam = '';
    var jum = 0;
    var har = 0;
    var sew = 0;
    if (this.state.nama === ''){
      nam = peralatan.nama
    } else {
      nam = this.state.nama
    }
    if (this.state.jumlah === 0){
      jum = peralatan.jumlah
    } else {
      jum = this.state.jumlah
    }
    if (this.state.sewa === 0){
      sew = peralatan.sewa
    } else {
      sew = this.state.sewa 
    }
    if (this.state.harga === 0){
      har = peralatan.harga
    } else {
      har = this.state.harga
    }
    this.props.updatePeralatanMutation({
      variables:{
        id:this.props.match.params.id,
        nama: nam,
        jumlah: parseInt(jum),
        harga: parseInt(har),
        sewa: parseInt(sew),
      },
      refetchQueries:[{query:getPeralatansQuery}]
    });
  }

  displayPeralatan(){
    const {peralatan} = this.props.data;
    if(peralatan){
        return(
          <div>
            <FormGroup>
                <Label htmlFor="name">Nama Peralatan</Label>
                <Input type="text" id="nama"  defaultValue={peralatan.nama} onChange={(e) =>this.setState({nama:e.target.value})} required />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="name">Jumlah</Label>
                <Input type="number" id="jumlah" defaultValue={peralatan.jumlah} onChange={(e) =>this.setState({jumlah:e.target.value})}  required />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="name">Harga</Label>
                <Input type="number" id="harga" defaultValue={peralatan.harga} onChange={(e) =>this.setState({harga:e.target.value})}  required />
                </FormGroup>
                <FormGroup>
                <Label htmlFor="name">Sewa</Label>
                <Input type="number" id="sewa" defaultValue={peralatan.sewa} onChange={(e) =>this.setState({sewa:e.target.value})} required />
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
                <i className="fa fa-align-justify"></i> Form Edit Data Peralatan
                <Link to="/peralatan/peralatan" className={'float-right mb-0'}> 
                  <Button label color="primary">
                      Kembali
                  </Button>
                </Link>
              </CardHeader>
              <CardBody>
                <Form onSubmit={(e) => {this.submitForm(e)}}>
                {this.displayPeralatan()}
                <Link to="/peralatan/peralatan">
                  <Button type="submit" color="primary" onClick={(e) => {this.submitForm(e)}} >Simpan</Button>
                </Link>
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
      graphql(updatePeralatanMutation, {name:"updatePeralatanMutation"}),
      graphql(getPeralatansQuery, {name:"getPeralatansQuery"})
)(EditPeralatan);



