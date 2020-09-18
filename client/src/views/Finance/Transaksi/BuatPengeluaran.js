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

class BuatPengeluaran extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>

          <Col>
            <Card>
              <CardHeader>
                Buat Transaksi Pengeluaran Baru
                <Link to="/transaksi/pengeluaran" className={'float-right mb-0'}>
                  <Button label color="danger">
                      Batal
                  </Button>
                </Link>
              </CardHeader>
              <CardBody>

              <FormGroup>
                <Label htmlFor="name">Klien</Label>
                <Input type="select" name="klien" id="klien">
                  <option value="">...</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Keterangan</Label>
                <Input type="text" name="Keterangan" id="keterangan" placeholder="Keterangan">
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Jumlah Dana</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Rp.</InputGroupAddon>
                <Input type="number" id="jumlahdana" placeholder="Masukkan Jumlah Dana" required />
                <InputGroupAddon addonType="append">.00</InputGroupAddon>
              </InputGroup>
              </FormGroup>
              <FormGroup>
              <Label htmlFor="name">Jumlah Terbayar</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">Rp.</InputGroupAddon>
                <Input type="number" id="terbayar" placeholder="Masukkan Jumlah Terbayar" required />
                <InputGroupAddon addonType="append">.00</InputGroupAddon>
              </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Tanggal Transaksi</Label>
                <Input type="date" id="tgltrans" placeholder="Masukkan Tanggal Transaksi" required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Akun Debet</Label>
                <Input type="select" name="akun_deb" id="akun_kre">
                    <option value="303">Beban Gaji</option>
                    <option value="302">Beban Sewa</option>
                    <option value="301">Modal Awal</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Akun Kredit</Label>
                <Input type="select" name="akun_kre" id="akun_kre">
                    <option value="101">Kas</option>
                </Input>
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

export default BuatPengeluaran;
