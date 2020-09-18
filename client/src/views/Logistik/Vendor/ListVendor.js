import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import {getVendorsQuery, addVendorMutation} from '../queries/queries';
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
 } from 'reactstrap';

class ListVendor extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: null,
      nama: '',
      jenis_usaha:''
    }
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
          </tr>
        );
      });
    }
  }
  submitForm(e){
    e.preventDefault();
    this.props.addVendorMutation({
      variables:{
        nama:this.state.nama,
        jenis_usaha: this.state.jenis_usaha,
      },
      refetchQueries:[{query:getVendorsQuery}]
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                Daftar Vendor
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Vendor</th>
                    <th>Jenis Usaha</th>
                  </tr>
                  </thead>
                  <tbody>
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
          <Col>
          <Card>
            <CardHeader>
              <i className="fa fa-plus-square"></i> Form Tambah Vendor
            </CardHeader>
            <CardBody>
              <Form onSubmit={this.submitForm.bind(this)}> 
                <FormGroup>
                  <Label>Nama Vendor</Label>
                  <Input type="text" id="nama" onChange={(e) =>this.setState({nama:e.target.value})} placeholder="Masukkan Nama Vendor" required />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="name">Jenis Usaha</Label>
                  <Input type="text" id="jenis" onChange={(e) =>this.setState({jenis_usaha:e.target.value})} placeholder="Jenis Usaha" required />
                </FormGroup>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
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
  graphql(getVendorsQuery, {name:"getVendorsQuery"}),
  graphql(addVendorMutation, {name:"addVendorMutation"})
)(ListVendor);
