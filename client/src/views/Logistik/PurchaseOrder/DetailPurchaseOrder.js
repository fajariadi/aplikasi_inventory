import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import jspdf from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import { getPurchaseOrderQuery, hapusPurchaseOrderMutation, getListItemPurchaseOrdersQuery, updateStatusListRequestOnOrder, updateStatusListItemPurchaseOrder, hapusManyListItemPurchaseOrder, getPurchaseOrdersQuery, updateStatusPurchaseOrder, getListRequestsQuery } from '../queries/queries';
import { Card, Button, CardBody, CardHeader, Col, Row, Table, Form, FormGroup, Label, Input } from 'reactstrap';

class DetailPurchaseOrder extends Component {
  constructor(props) {
    super(props);
    const username = localStorage.getItem("username")

    let loggedIn = true
    if (username == null) {
      loggedIn = false
    }
    this.state = {
      loggedIn,
      akun_id: localStorage.getItem("user_id"),
      divisi: localStorage.getItem("divisi"),
    }
  }
  displayPurchaseOrderDetail() {
    const { purchaseOrder } = this.props.data;
    if (purchaseOrder) {
      return (
        <CardBody>
          <Form className="form-horizontal">
            <Row>
              <Col md="4">
                <FormGroup row>
                  <Col md="6">
                    <Label htmlFor="name">Kode Purchase Order</Label>
                  </Col>
                  <Col md="6">
                    <Input type="text" name="kode" id="kode" value={purchaseOrder.kode} disabled></Input>
                  </Col>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="name">Status</Label>
                  </Col>
                  <Col md="9">
                    <Input type="text" name="kode" id="kode" value={purchaseOrder.status} disabled></Input>
                  </Col>
                </FormGroup>
              </Col>
              {this.renderElement3(purchaseOrder.status, purchaseOrder.tanggal_setuju, purchaseOrder.tanggal)}
            </Row>
            <Row>
              <Col md="4">
                <FormGroup row>
                  <Col md="6">
                    <Label htmlFor="name">Nama Vendor</Label>
                  </Col>
                  <Col md="6">
                    <Input type="text" name="kode" id="kode" value={purchaseOrder.vendor.nama} disabled></Input>
                  </Col>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="name">No Kontak</Label>
                  </Col>
                  <Col md="9">
                    <Input type="text" name="kode" id="kode" value={purchaseOrder.vendor.noTlp} disabled></Input>
                  </Col>
                </FormGroup>
              </Col>
            </Row>

          </Form>
          <hr />
          <Table hover bordered striped responsive size="sm">
            <thead align="center">
              <tr>
                <th>Nama Barang</th>
                <th>Satuan</th>
                <th>Jumlah</th>
                <th>Harga</th>
              </tr>
            </thead>
            <tbody align="center">
              {
                purchaseOrder.listItemPurchaseOrder.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.nama_barang}</td>
                      <td>{item.satuan}</td>
                      <td>{item.jumlah_barang}</td>
                      <td>{item.harga}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          <hr />
          <Row>
            <Col>
              {this.renderElement(purchaseOrder.akun.id, purchaseOrder.status)}
            </Col>
            <Col>
              {this.renderElement2(purchaseOrder.tanggal_setuju)}
            </Col>
          </Row>
        </CardBody>
      )
    }
  }

  renderElement(akun_id, status) {
    if (this.state.akun_id === akun_id && status !== 'Disetujui') {
      return (
        <div align="center">
          <Button onClick={this.onDelete.bind(this, this.props.match.params.id, status)} color="danger">
            <i className="fa fa-trash">Hapus Pembelian Barang</i>
          </Button>
        </div>
      )
    }
  }

  renderElement2(tanggal) {
    if (this.state.divisi === "Purchasing" && tanggal === '') {
      return (
        <div align="center">
          <Button onClick={this.onSetujuiPurchaseOrder.bind(this, this.props.match.params.id)} color="success">
            <i className="fa fa-check">Pembelian Disetujui</i>
          </Button>
          <Button onClick={this.onTolakPurchaseOrder.bind(this, this.props.match.params.id)} color="danger">
            <i className="fa fa-times">Pembelian Ditolak</i>
          </Button>
        </div>
      )
    }
  }
  renderElement3(status, tanggal_setuju, tanggal) {
    if (status === 'Disetujui' || status === 'Ditolak') {
      return (
        <Col md="4">
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="name">Tanggal Diproses</Label>
            </Col>
            <Col md="9">
              <Input type="text" name="kode" id="kode" value={tanggal_setuju} disabled></Input>
            </Col>
          </FormGroup>
        </Col>
      )
    } else {
      return (
        <Col md="4">
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="name">Tanggal Pengajuan</Label>
            </Col>
            <Col md="9">
              <Input type="text" name="kode" id="kode" value={tanggal} disabled></Input>
            </Col>
          </FormGroup>
        </Col>
      )
    }
  }
  onSetujuiPurchaseOrder(orderid) {
    this.props.updateStatusPurchaseOrder({
      variables: {
        id: orderid,
        status: 'Disetujui',
        tanggal_setuju: new Date().toLocaleDateString(),
      },
      refetchQueries: [{ query: getPurchaseOrdersQuery }],
    });
    this.props.updateStatusListRequestOnOrder({
      variables: {
        order_id: orderid,
        status: 'Delivery',
      },
      refetchQueries: [{ query: getListRequestsQuery }],
    });
    this.props.updateStatusListItemPurchaseOrder({
      variables: {
        purchaseOrder_id: orderid,
        status: 'Delivery',
      },
      refetchQueries: [{ query: getListItemPurchaseOrdersQuery }],
    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Pembelian Barang Disetujui',
      showConfirmButton: true,
    })
  }

  onTolakPurchaseOrder(order_id) {
    this.props.updateStatusPurchaseOrder({
      variables: {
        id: order_id,
        status: 'Ditolak',
        tanggal_setuju: new Date().toLocaleDateString(),
      },
      refetchQueries: [{ query: getPurchaseOrdersQuery }],
    });
    this.props.updateStatusListRequestOnOrder({
      variables: {
        order_id: order_id,
        status: 'Active',
      },
      refetchQueries: [{ query: getListRequestsQuery }],
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Pembelian Barang Ditolak',
      showConfirmButton: true,
    })
  }

  onDelete(orderid, status) {
    Swal.fire({
      title: 'Apakah anda Yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Saya Yakin!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (status === 'Belum Disetujui') {
          this.props.updateStatusListRequestOnOrder({
            variables: {
              order_id: orderid,
              status: 'Active',
            },
            refetchQueries: [{ query: getListRequestsQuery }],
          });
        }
        this.props.hapusPurchaseOrderMutation({
          variables: {
            id: orderid,
          },
          refetchQueries: [{ query: getPurchaseOrdersQuery }],
        });
        this.props.hapusManyListItemPurchaseOrder({
          variables: {
            id: orderid,
          },
          refetchQueries: [{ query: getPurchaseOrdersQuery }],
        });
        this.props.history.push("/purchaseOrder/purchaseOrder");
        Swal.fire(
          'Dihapus!',
          'Pembelian Barang Telah Dihapus',
          'success'
        )

      }
    })
  }

  getPdf() {
    var rows2 = [];
    const { purchaseOrder } = this.props.data;
    var tanggal = '';
    var kode = '';
    var total = 0;
    var nomor = 0;
    var harga = 0;
    var namaPerusahaan='';
    var alamatPerusahaan="";
    var kontakPerusahaan="";
    if (purchaseOrder) {
      total = purchaseOrder.total_harga;
      tanggal = purchaseOrder.tanggal;
      kode = purchaseOrder.kode;
      namaPerusahaan = purchaseOrder.vendor.nama;
      alamatPerusahaan = purchaseOrder.vendor.alamat;
      kontakPerusahaan = purchaseOrder.vendor.noTlp; // eslint-disable-next-line
      purchaseOrder.listItemPurchaseOrder.map(item => {
        nomor++;
        harga = parseInt(item.harga) / parseInt(item.jumlah_barang);
        const newItem = { no: nomor, item: item.nama_barang, unit: item.satuan, qty: item.jumlah_barang, unitPrice: harga, total: item.harga };
        rows2.push(newItem);
      })
    }
    var pdf = new jspdf({
      orientation: 'p',
      unit: 'pt',
      format: 'a4',
    }
    )
    pdf.setFont("times")
    pdf.setFontSize(14);
    pdf.text(40, 50, "AMF-HAQ ENGINEERING AND CONSULTANT")
    pdf.setFontSize(12);
    pdf.text(40, 72, "Jl. Sumbawa 21, Tegal Alur")
    pdf.text(40, 84, "Jakarta Barat (11820)")
    pdf.text(40, 96, "(021) 555-3466/0812-9523-970")

    pdf.setFont("san-serif")
    pdf.setFontSize(20);
    pdf.setTextColor('#4257f5');
    pdf.text(375, 50, "PURCHASE ORDER", { align: 'left' });
    pdf.setFontSize(12);
    pdf.setTextColor('#000000');
    pdf.text(518, 72, kode, { align: 'left' });
    pdf.text(502, 84, tanggal, { align: 'left' });

    var columns = [
      { title: "Vendor", dataKey: "details" },
    ];
    var rows = [
      { "details": namaPerusahaan },
      { "details": alamatPerusahaan },
      { "details": kontakPerusahaan },
    ];
    pdf.autoTable(columns, rows, {
      columnStyles: {
        details: { fillColor: 255 },
        textColor: 60,
      },
      headStyles: {
        fillColor: [65, 105, 225]
      },
      tableWidth: 250,
      margin: { top: 116 },
    })

    var columns1 = [
      { title: "Ship To", dataKey: "details" },
    ];

    var rows1 = [
      { "details": "AMF-Haq Engineering and Consultant" },
      { "details": "Jl. Sumbawa 21, Tegal Alur, Jakarta Barat" },
      { "details": "(021) 555-3466/0812-9523-970" },
    ];

    pdf.autoTable(columns1, rows1, {
      columnStyles: {
        details: { fillColor: 255 },
        textColor: 0,
      },
      headStyles: {
        fillColor: [65, 105, 225]
      },
      startY: 116,
      tableWidth: 250,
      margin: { left: 300 },
    })
    var columns2 = [
      { title: "No", dataKey: "no" },
      { title: "Item", dataKey: "item" },
      { title: "Unit", dataKey: "unit" },
      { title: "Qty", dataKey: "qty" },
      { title: "Unit Price", dataKey: "unitPrice" },
      { title: "Total", dataKey: "total" },
    ];

    if (rows2.length < 10){
      for (let index = rows2.length; index < 10; index++) {
        const newItem = { no: '', item: '', unit: "", qty: '', unitPrice: '', total: '-' };
        rows2.push(newItem);
      }
    }
    pdf.autoTable(columns2, rows2, {
      theme: 'grid',
      headStyles: {
        fillColor: [65, 105, 225],
        halign: "center"
      },
      bodyStyles: {
        halign: "center"
      },
      columnStyles: {
        id: { fillColor: 255 }
      },
      margin: { top: 30 },
    })

    pdf.setFont("san-serif")
    pdf.setFontSize(12);
    pdf.setTextColor('#000000');
    pdf.text(400, 475, "Sub Total ", { align: 'left' });
    pdf.text(400, 497, "Tax  ", { align: 'left' });
    pdf.text(400, 519, "Shipping  ", { align: 'left' });
    pdf.text(400, 541, "Other  ", { align: 'left' });
    pdf.text(400, 562, "TOTAL  ", { align: 'left' });

    var colums3 =[{subtotal : total, dataKey: "dll"}]
    var data = [
      {dll : total},{dll : 0},
      {dll : 0}, {dll : 0},
      {dll : total}]

    pdf.autoTable(colums3, data, {
      theme: 'grid',
      bodyStyles: {
        halign: "right"
      },
      startY: 460,
      tableWidth: 85,
      margin: { left: 471 },
    })

    pdf.setFont("san-serif")
    pdf.setFontSize(10);
    pdf.setTextColor('#000000');
    pdf.text(40, 770, "Note : ", { align: 'left' });
    pdf.text(43, 780, "1. Semua pengiriman barang harus disertai Nota/Faktur dan Kwitansi", { align: 'left' });
    pdf.text(43, 790, "2. Barang akan dikembalikan jika tidak sesuai pesanan", { align: 'left' });
    pdf.text(43, 800, "3. Nomor Purchase Order harus disertakan dalam Nota/Faktur/Kwitansi", { align: 'left' });

    pdf.setFontSize(10);
    pdf.text(420, 650, "Penanggung Jawab", { align: 'left' });
    pdf.text(440, 770, "Akbar", { align: 'left' });
    pdf.text(400, 770, "______________________", { align: 'left' });
    pdf.text(415, 780, "Manajer Purchasing", { align: 'left' });

    pdf.save(kode+".pdf");
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Purchase Order
                <Link to="/purchaseOrder/purchaseOrder" className={'float-right mb-0'}>
                  <Button color="secondary">
                    Kembali
                  </Button>
                </Link>
                <Button onClick={this.getPdf.bind(this)} color="primary" className={'float-right mb-0 mr-2'}>
                  <i className="fa fa-download"></i>Unduh
                </Button>
              </CardHeader>
              <CardBody>
                {this.displayPurchaseOrderDetail()}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default compose(
  graphql(getPurchaseOrderQuery, {
    options: (props) => {
      return {
        variables: {
          id: props.match.params.id
        }
      }
    }
  }),
  graphql(getPurchaseOrdersQuery, { name: "getPurchaseOrdersQuery" }),
  graphql(hapusPurchaseOrderMutation, { name: "hapusPurchaseOrderMutation" }),
  graphql(hapusManyListItemPurchaseOrder, { name: "hapusManyListItemPurchaseOrder" }),
  graphql(getListItemPurchaseOrdersQuery, { name: "getListItemPurchaseOrdersQuery" }),
  graphql(updateStatusPurchaseOrder, { name: "updateStatusPurchaseOrder" }),
  graphql(updateStatusListItemPurchaseOrder, { name: "updateStatusListItemPurchaseOrder" }),
  graphql(updateStatusListRequestOnOrder, { name: "updateStatusListRequestOnOrder" }),
  graphql(getListRequestsQuery, { name: "getListRequestsQuery" }),


)(DetailPurchaseOrder);
