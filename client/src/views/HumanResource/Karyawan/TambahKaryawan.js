import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroup,
} from 'reactstrap';

class TambahKaryawan extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>

          <Col>
            <Card>
              <CardHeader>
                Tambah Karyawan Baru
                <Link to="/karyawan/datakaryawan" className={'float-right mb-0'}>
                  <Button label color="danger">
                      Batal
                  </Button>
                </Link>
              </CardHeader>
              <CardBody>
              <FormGroup>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input type="text" name="nama_karyawan" id="nama_karyawan" placeholder="Nama Lengkap"/>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Tanggal Lahir</Label>
                <Input type="date" id="tgl_lahir" required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Jenis Kelamin</Label>
                <Input type="select" name="jenis_kelamin" id="jenis_kelamin">
                  <option value="">Pria</option>
                  <option value="">Wanita</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Agama</Label>
                <Input type="select" name="agama" id="agama">
                  <option value="islam">Islam</option>
                  <option value="budha">Budha</option>
                  <option value="hindu">Hindu</option>
                  <option value="katolik">Katolik</option>
                  <option value="kristen">Kristen</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Kota Asal</Label>
                <Input type="text" name="kota" id="kota" placeholder="Kota Asal"   />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Domisili Sekarang</Label>
                <Input type="text" name="domisili" id="domisili" placeholder="Domisili Sekarang"   />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">No Kontak</Label>
                <Input type="text" name="no_kontak" id="no_kontak" placeholder="No Kontak"   />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Alamat Email"   />
              </FormGroup>
                <Button type="Submit" size="sm" color="primary" className={'float-right mb-0'}><i className="fa fa-pencil"></i> Submit</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default TambahKaryawan;
