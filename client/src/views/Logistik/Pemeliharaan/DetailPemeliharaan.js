import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import { Link } from 'react-router-dom';
import * as compose from 'lodash.flowright';
import Swal from 'sweetalert2';
import {getPemeliharaanQuery, getPemeliharaansQuery,updateStatusPemeliharaan,hapusPemeliharaan, updateJumlahDiperbaikiInventaris,updateRusakInventaris, getAllInventarisQuery} from '../queries/queries';
import { 
  Form,
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

class DetailPemeliharaan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      jabatan: localStorage.getItem("jabatan"),
      divisi: localStorage.getItem("divisi"),
      nama:'',
      barang_id:'',
      karyawan_id:'',
      jumlah: 0,
      modalIsOpen: false,  

    };
  }

    displayDetailPemeliharaan(){
        const {pemeliharaan} = this.props.data;
        if(pemeliharaan){
        return(
            <CardBody>
            <Form className="form-horizontal">
            <Row> 
                <Col md="4">
                <FormGroup row>
                    <Col md="6">
                    <Label htmlFor="name">Nama Teknisi</Label>
                    </Col>
                    <Col md="6">
                    <Input type="text" name="kode" id="kode" value={pemeliharaan.karyawan.nama} disabled></Input> 
                    </Col>
                </FormGroup>
                </Col>  
                <Col md="4">
                <FormGroup row>
                <Col md="3">
                    <Label htmlFor="name">Tanggal</Label>
                    </Col>
                    <Col md="9">
                    <Input type="text" name="kode" id="kode" value={pemeliharaan.tanggal} disabled></Input> 
                    </Col> 
                </FormGroup>
                </Col>  
                <Col md="4">
                <FormGroup row>
                <Col md="3">
                    <Label htmlFor="name">Status</Label>
                    </Col>
                    <Col md="9">
                    <Input type="text" name="kode" id="kode" value={pemeliharaan.status} disabled></Input> 
                    </Col> 
                </FormGroup>
                </Col>  
            </Row>
            <Row> 
                <Col md="8">
                <FormGroup row>
                    <Col md="3">
                    <Label htmlFor="name">Nama Inventaris</Label>
                    </Col>
                    <Col md="9">
                    <Input type="text" name="kode" id="kode" value={pemeliharaan.inventaris.barang.nama_barang} disabled></Input> 
                    </Col>
                </FormGroup>
                </Col>    
                <Col md="4">
                <FormGroup row>
                <Col md="3">
                    <Label htmlFor="name">Jumlah</Label>
                    </Col>
                    <Col md="9">
                    <Input type="text" name="kode" id="kode" value={pemeliharaan.jumlah} disabled></Input> 
                    </Col> 
                </FormGroup>
                </Col>  
            </Row>
            </Form>
            {this.renderElement(pemeliharaan.status, pemeliharaan.inventaris.id, pemeliharaan.inventaris.barang.id, pemeliharaan.jumlah)}
            </CardBody>
        )
        }   
    }

    renderElement(status, inventaris_id, barang_id, jumlah){
      if (this.state.jabatan !== "Admin" && this.state.divisi === "Logistic"){
        if(status === 'Diperbaiki'){
          return(
            <div align="center">
              <Button size="sm" color="success" onClick={this.onSelesai.bind(this, inventaris_id)}>
                <i className="fa fa-check"></i> Selesai
              </Button>
              <Button size="sm" color="danger" onClick={this.onRusak.bind(this, inventaris_id,barang_id, jumlah)}>
                <i className="fa fa-trash"></i> Rusak                
              </Button>
            </div>
          )
        } else {
          return(
            <div align="center">
              <Button size="sm" color="danger" onClick={this.onDelete.bind(this)}>
                <i className="fa fa-trash"></i> Hapus
              </Button>
            </div>
          )
        }
      }      
    }

    onRusak(inventaris_id, barang_id, jumlah_rusak){
        Swal.fire({
            title: 'Apakah anda Yakin?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Saya Yakin!'
          }).then((result) => {
            if (result.isConfirmed) {
                var data = this.props.getAllInventarisQuery;
                var jumlah = 0; // eslint-disable-next-line
                data.allInventaris.map (inv => {
                    if(inv.barang.id === barang_id){
                      return(
                          jumlah = inv.jumlah
                      )
                    }
                });
                var rusak = jumlah-jumlah_rusak;
                this.props.updateRusakInventaris({
                    variables:{
                        id:inventaris_id,
                        jumlah: rusak,
                        jumlah_diperbaiki: 0,
                    },
                    refetchQueries:[{query:getAllInventarisQuery}]
                });
                this.props.updateStatusPemeliharaan({
                    variables:{
                        id:this.props.match.params.id,
                        status: 'Rusak',
                    },
                    refetchQueries:[{query:getPemeliharaansQuery}]
                });
                this.props.history.push("/pemeliharaan/pemeliharaan");
              Swal.fire(
                'Dihapus!',
                'Inventaris Dihapus',
                'success'
              )
            }
          })
    }

    onSelesai(inventaris_id){
        Swal.fire({
            title: 'Apakah anda Yakin?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Saya Yakin!'
          }).then((result) => {
            if (result.isConfirmed) {
                this.props.updateJumlahDiperbaikiInventaris({
                    variables:{
                        id:inventaris_id,
                        jumlah_diperbaiki: 0,
                    },
                    refetchQueries:[{query:getAllInventarisQuery}]
                });
                this.props.updateStatusPemeliharaan({
                    variables:{
                        id:this.props.match.params.id,
                        status: 'Selesai',
                    },
                    refetchQueries:[{query:getPemeliharaansQuery}]
                });
                this.props.history.push("/pemeliharaan/pemeliharaan");
              Swal.fire(
                'Selesai',
                'Inventaris Selesai Diperbaiki',
                'success'
              )
            }
          })
    }


  onDelete(){
    Swal.fire({
      title: 'Apakah anda Yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Saya Yakin!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.hapusPemeliharaan({
          variables:{
            id: this.props.match.params.id,        
          },
          refetchQueries:[{query:getPemeliharaansQuery}],
        });
        this.props.history.push("/pemeliharaan/pemeliharaan");
        Swal.fire(
          'Dihapus!',
          'Pemeliharaan Telah Dihapus',
          'success'
        )
      }
    })
  }


  render() {
    return (
      <div className="animated fadeIn">
        <Row>
           <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>Detail Pemeliharaan Inventaris
                <Link to="/pemeliharaan/pemeliharaan" className={'float-right mb-0'}>
                    <Button size="sm" color="primary">
                    <i className="fa fa-"></i> Kembali
                    </Button>
                </Link>
              </CardHeader>
              {this.displayDetailPemeliharaan()}
            </Card>
          </Col>     
        </Row>
      </div>

    );
  }
}

export default compose(
    graphql(getPemeliharaanQuery, {
        options:(props) => {
          return{
            variables:{
              id: props.match.params.id
            }
          }
        }
      }),
      graphql(getPemeliharaansQuery, {name:"getPemeliharaansQuery"}),
      graphql(getAllInventarisQuery, {name:"getAllInventarisQuery"}),
      graphql(updateJumlahDiperbaikiInventaris, {name:"updateJumlahDiperbaikiInventaris"}),
      graphql(updateRusakInventaris, {name:"updateRusakInventaris"}),
      graphql(updateStatusPemeliharaan, {name:"updateStatusPemeliharaan"}),
      graphql(hapusPemeliharaan, {name:"hapusPemeliharaan"}),
      
)(DetailPemeliharaan);
