import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
} from 'reactstrap';

class TambahMaterial extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Form Tambah Material
                <Link to="/material/stock" className={'float-right mb-0'}>
                  <Button label color="danger">
                      Batal
                  </Button>
                </Link>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label htmlFor="name">Nama Material</Label>
                      <Input type="text" id="name" placeholder="Masukkan Nama Material" required />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label htmlFor="name">Jumlah</Label>
                      <Input type="number" id="jumlah" placeholder="Masukkan Jumlah Material" required />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label htmlFor="name">Satuan</Label>
                       <Input type="select" name="satuan" id="satuan">
                        <option value="Kg">Kg</option>
                        <option value="Buah">Buah</option>
                        <option value="Meter">Meter</option>
                        <option value="Lembar">Lembar</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="2">
                    <FormGroup>
                      <hr />
                      <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                      <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default TambahMaterial;
