import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import {getAlatsQuery, addAlatMutation} from '../queries/queries';
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
} from 'reactstrap';

class Inventaris extends Component {

  constructor(props) {
    super(props);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.state = {
      collapse: false,
      accordion: [true, false, false],
      custom: [true, false],
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
      nama:'',
      jumlah: 22,
    };
  }

  displayAlats(){
    var data = this.props.getAlatsQuery;
    var no = 0;
    if(data.loading){
      return (<div>Loading Alat...</div>);
    } else {
      return data.alats.map(alat => {
         no++;
        return(
          <tr>
            <td key={alat.id}>{no}</td>
            <td key={alat.id}>{alat.nama}</td>
            <td key={alat.id}>{alat.jumlah}</td>
          </tr>
        );
      });
    }
  }

  submitForm(e){
    e.preventDefault();
    this.props.addAlatMutation({
      variables:{
        nama:this.state.nama,
        jumlah: parseInt(this.state.jumlah),
      },
      refetchQueries:[{query:getAlatsQuery}]
    });
  }

  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }


  render() {
    return (
      <div className="animated fadeIn">
        <Row>
           <Col md="8">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Daftar Inventaris
                <Button size="sm" className="float-right mb-0">
                  <i className="fa fa-cloud-download"></i> Unduh
                </Button>
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Peralatan</th>
                    <th>Jumlah</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.displayAlats()}
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
            <div id="accordion">
              <Card className="mb-0">
                <CardHeader id="headingOne">
                  <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
                    <h5 className="m-0 p-0">Form Tambah Peralatan</h5>
                  </Button>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                  <CardBody>
                    <Form onSubmit={this.submitForm.bind(this)}>
                      <FormGroup>
                        <Label>Nama Peralatan</Label>
                        <Input type="text" onChange={(e) =>this.setState({nama:e.target.value})} placeholder="Masukkan Nama Peralatan" required />
                      </FormGroup>
                      <FormGroup>
                        <Label>Jumlah</Label>
                        <Input type="number" onChange={(e) =>this.setState({jumlah:e.target.value})} placeholder="Masukkan Jumlah Material" required />
                      </FormGroup>
                      <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                      <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                    </Form>
                  </CardBody>
                </Collapse>
              </Card>

              <Card className="mb-0">
                <CardHeader id="headingTwo">
                  <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1)} aria-expanded={this.state.accordion[1]} aria-controls="collapseTwo">
                      <h5 className="m-0 p-0">Form Pendataan Alat Rusak</h5>
                  </Button>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion" id="collapseTwo">
                  <CardBody>
                    <FormGroup>
                      <Label htmlFor="name">Nama Peralatan</Label>
                      <Input type="text" id="name" placeholder="Masukkan Nama Peralatan" required />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="name">Jumlah</Label>
                      <Input type="number" id="jumlah" placeholder="Masukkan Jumlah Material" required />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="name">Satuan</Label>
                      <Input type="select" name="satuan" id="satuan">
                        <option value="Kg">Kg</option>
                        <option value="Buah">Buah</option>
                        <option value="Meter">Meter</option>
                        <option value="Lembar">Lembar</option>
                      </Input>
                    </FormGroup>
                    <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                    <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                  </CardBody>
                </Collapse>
              </Card>
            </div>
          </Col>
        </Row>
      </div>

    );
  }
}

export default compose(
  graphql(getAlatsQuery, {name:"getAlatsQuery"}),
  graphql(addAlatMutation, {name:"addAlatMutation"})
)(Inventaris);
