import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import Swal from 'sweetalert2';
import { getDivisisQuery, addAkunMutation, editAkunMutation, getAkunsQuery, editBiodataKaryawanMutation, uploadFotoMutation, getKaryawansQuery} from '../queries/queries';
import {  
  Card, 
  CardBody, 
  Col, 
  Button, 
  Row, 
  FormGroup,
  Form,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';


class Profile extends Component {
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      newPassword:'',
      newUsername:'',
      confirmPassword:'',
      modalIsOpen: false,
      id: localStorage.getItem('id'),
      nama: localStorage.getItem("nama"),
      tempat_lahir: localStorage.getItem("tempat_lahir"),
      tanggal_lahir: localStorage.getItem("tanggal_lahir"),
      jenis_kelamin: localStorage.getItem("jenis_kelamin"),
      agama: localStorage.getItem("agama"),
      alamat: localStorage.getItem("alamat"),
      jabatan: localStorage.getItem("jabatan"),
      divisi: localStorage.getItem("divisi"),
      email: localStorage.getItem("email"),
      no_kontak: localStorage.getItem("no_kontak"),
      username: localStorage.getItem("username"),
      password: localStorage.getItem("password"),
      karyawan_id: localStorage.getItem('karyawan_id'),
      activeTab: new Array(3).fill('1'),
      pictures: [],
      modalBiodata: false,
      modalAkun: false,
      modalFoto: false,
    };
    this.onDrop = this.onDrop.bind(this);
  }

  toggleModalBiodata(){
    this.setState({
      modalBiodata: ! this.state.modalBiodata
    });
  }

  toggleModalAkun(){
    this.setState({
      modalAkun: ! this.state.modalAkun
    });
  }

  toggleModalFoto(){
    this.setState({
      modalFoto: ! this.state.modalFoto
    });
  }

  onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
   toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

   tabPane() {
    return (
      <>
        <TabPane tabId="1">
          {this.biodata()}
          <div align="center">
            <Button color="success" size="sm" onClick={this.toggleModalBiodata.bind(this)}>
              <i className="fa fa-pencil"></i> Edit Biodata
            </Button>
          </div>
        </TabPane>
        <TabPane tabId="2">
          {this.akun()}
          <div align="center">
            <Button color="success" size="sm" onClick={this.toggleModalAkun.bind(this)}>
              <i className="fa fa-pencil"></i> Edit Akun
            </Button>
          </div>
        </TabPane>
      </>
    );
  }

  editAkun(e){
    e.preventDefault();
    this.toggleModalAkun();
    console.log(this.state.password);
    console.log(this.state.confirmPassword);
    if(this.state.password === this.state.confirmPassword){
      this.props.editAkunMutation({
        variables:{
          id: this.state.id,
          username:this.state.username,
          password:this.state.newPassword
        },
        refetchQueries:[{query:getAkunsQuery}]
      });
      localStorage.setItem("username", this.state.newUsername);
      localStorage.setItem("password", this.state.newPassword);
      this.setState({username: this.state.newUsername, password: this.state.newPassword});
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Data Akun Berhasil Diubah',
        showConfirmButton: true,
      })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Password Salah',
        showConfirmButton: true,
      })
    }
  }

  editBiodataKaryawan(e){
    e.preventDefault();
    this.toggleModalBiodata();
    var nama1=''; var tempat_lahir1=''; var tanggal_lahir1=''; var jenis_kelamin1=''; var agama1=''; var alamat1=''; var no_kontak1=''; var email1='';     
    if (this.state.nama === ''){
      nama1= localStorage.getItem('nama')
    } else {
      nama1 = this.state.nama
    }
    if (this.state.tempat_lahir === ''){
      tempat_lahir1 = localStorage.getItem('tempat_lahir')
    } else {
      tempat_lahir1 = this.state.tempat_lahir
    }
    if (this.state.tanggal_lahir === ''){
      tanggal_lahir1 = localStorage.getItem('tanggal_lahir')
    } else {
      tanggal_lahir1 = this.state.tanggal_lahir
    }
    if (this.state.jenis_kelamin === ''){
      jenis_kelamin1 = localStorage.getItem('jenis_kelamin')
    } else {
      jenis_kelamin1 = this.state.jenis_kelamin
    }
    if (this.state.agama === ''){
      agama1 = localStorage.getItem('agama')
    } else {
      agama1 = this.state.agama
    }
    if (this.state.alamat === ''){
      alamat1 = localStorage.getItem('alamat')
    } else {
      alamat1 = this.state.alamat
    }
    if (this.state.no_kontak === ''){
      no_kontak1 = localStorage.getItem('no_kontak')
    } else {
      no_kontak1 = this.state.no_kontak
    }
    if (this.state.email === ''){
      email1 = localStorage.getItem('email')
    } else {
      email1 = this.state.email
    }
    this.props.editBiodataKaryawanMutation({
      variables:{
        id:this.state.karyawan_id,
        nama: nama1,
        tempat_lahir: tempat_lahir1,
        tanggal_lahir: tanggal_lahir1,
        jenis_kelamin:jenis_kelamin1,
        agama:agama1,
        alamat:alamat1,
        no_kontak:no_kontak1,
        email:email1,
      },
      refetchQueries:[{query:getKaryawansQuery}],
    });
    localStorage.setItem("nama", nama1);
    localStorage.setItem("tanggal_lahir", tanggal_lahir1);
    localStorage.setItem("tempat_lahir", tempat_lahir1);
    localStorage.setItem("jenis_kelamin", jenis_kelamin1);
    localStorage.setItem("agama", agama1);
    localStorage.setItem("alamat", alamat1);
    localStorage.setItem("no_kontak", no_kontak1);
    localStorage.setItem("email", email1);
    this.setState({
      nama:nama1, 
      tanggal_lahir: tanggal_lahir1,
      tempat_lahir:tempat_lahir1, 
      jenis_kelamin: jenis_kelamin1,
      agama:agama1, 
      alamat: alamat1,
      no_kontak:no_kontak1, 
      email: email1,
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Biodata Karyawan Berhasil Diubah',
      showConfirmButton: true,
    })
  };


  handleFileChange(foto){
    const file = foto;
    
    if(!file) {
      return
    } else {
      
    }
  }

  editFoto(e){

  }

  biodata(){
    return(
      <Form className="form-horizontal">
          <Row> 
            <Col md="8">
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="name">Nama Lengkap</Label>
                </Col>
                <Col md="8">
                <Input type="text" name="kode" id="kode" value={this.state.nama} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>  
          </Row>
          <Row> 
            <Col md="8">
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="name">Tempat, Tanggal Lahir</Label>
                </Col>
                <Col md="8">
                <Input type="text" name="kode" id="kode" value={this.state.tempat_lahir+', '+this.state.tanggal_lahir} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>  
          </Row>
          <Row> 
            <Col md="8">
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="name">Jenis Kelamin</Label>
                </Col>
                <Col md="8">
                <Input type="text" name="kode" id="kode" value={this.state.jenis_kelamin} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>  
          </Row>
          <Row> 
            <Col md="8">
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="name">Agama</Label>
                </Col>
                <Col md="8">
                <Input type="text" name="kode" id="kode" value={this.state.agama} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>  
          </Row>
          <Row> 
            <Col md="8">
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="name">Alamat</Label>
                </Col>
                <Col md="8">
                <Input type="text" name="kode" id="kode" value={this.state.alamat} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>  
          </Row>
          <Row> 
            <Col md="8">
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="name">No Kontak</Label>
                </Col>
                <Col md="8">
                <Input type="text" name="kode" id="kode" value={this.state.no_kontak} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>  
          </Row>
          <Row> 
            <Col md="8">
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="name">Email</Label>
                </Col>
                <Col md="8">
                <Input type="text" name="kode" id="kode" value={this.state.email} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>  
          </Row>
        </Form>
    );
  }

  akun(){
    return(
      <Form className="form-horizontal"> 
         <Row> 
            <Col md="8">
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="name">Username</Label>
                </Col>
                <Col md="8">
                <Input type="text" name="kode" id="kode" value={this.state.username} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>  
          </Row>
          <Row> 
            <Col md="8">
              <FormGroup row>
                <Col md="4">
                  <Label htmlFor="name">Password</Label>
                </Col>
                <Col md="8">
                <Input type="text" name="kode" id="kode" value={this.state.password} disabled></Input> 
                </Col>
              </FormGroup>
            </Col>  
          </Row>
      </Form>
    )
  }

  toggleModal(kar_id){
    this.setState({
      karyawan_id: kar_id
    });
    this.setState({
      modalIsOpen: ! this.state.modalIsOpen
    });
  }

  displayDivisis(){
    var data = this.props.getDivisisQuery;
    if(data.loading){
      return (<div>Loading Divisi...</div>);
    } else {
      return data.divisis.map(divisi => {
        return(
          <tr>
            <td key={divisi.id}>{divisi.nama}</td>
            <td key={divisi.id}>
             <Button onClick={this.toggleModal.bind(this, divisi.id)}>Edit</Button>
            </td>
            <td key={divisi.id}>
              <Button onClick={this.onDelete.bind(this, divisi.id)}>Hapus</Button>
            </td>

          </tr>
        );
      });
    }
  }

  displayKaryawans(){
    var data = this.props.getKaryawansQuery;
    if(data.loading){
      return (<div>Loading Divisi...</div>);
    } else {
      return data.karyawans.map(karyawan => {
        return(
          <tr>
            <td key={karyawan.id}>{karyawan.nama}</td>
            <td key={karyawan.id}>{karyawan.jabatan}</td>
            <td key={karyawan.id}>{karyawan.alamat}</td>
            <td key={karyawan.id}>{karyawan.noHp}</td>
            <td key={karyawan.id}>{karyawan.avatar}</td>
            <td key={karyawan.id}>{karyawan.divisi.nama}</td>
            <td key={karyawan.id}>
              <Button onClick={this.toggleModal.bind(this, karyawan.id)}>Buat Akun</Button>
            </td>
          </tr>
        );
      });
    }
  }

  addUser(e){
   e.preventDefault();
   this.props.addUserMutation({
      variables:{
        username: this.state.username,
        password: this.state.password,
        karyawan_id: this.state.karyawan_id,

      },
      refetchQueries:[{query:getKaryawansQuery}]
    });
  }
  
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="3">
            <Row>
              <Card>
                <CardBody>
                  <center>
                    <img src={'../../assets/img/avatars/5.jpg'} style={{width: "60%"}} alt="admin@bootstrapmaster.com" />
                  </center>
                  <div align="center">
                    <Button color="success" size="sm" className="mt-4" >
                      <i className="fa fa-pencil"></i> Ganti Foto (masih error)
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Row>
            <Row xs="12">
              <Card style={{width: "100%"}} >
                <CardBody>
                <center>
                  <h4>STATUS</h4>
                  </center>
                  {/*  eslint-disable-next-line */}
                  <Form className="form-horizontal" className="mr-4 ml-4 mt-4">
                  <Row> 
                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="name">Jabatan</Label>
                        </Col>
                        <Col md="9">
                        <Input type="text" name="jabatan" id="jabatan" value={this.state.jabatan} disabled></Input> 
                        </Col>
                      </FormGroup>
                    </Col>  
                  </Row>
                  <Row> 
                    <Col md="12">
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="name">Divisi</Label>
                        </Col>
                        <Col md="9">
                        <Input type="text" name="divisi" id="divisi" value={this.state.divisi} disabled></Input> 
                        </Col>
                      </FormGroup>
                    </Col>  
                  </Row>
                  </Form>
                
                </CardBody>
              </Card>
            </Row>
          </Col>
          <Col xs="12" lg="9">          
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => { this.toggle(0, '1'); }}
                >
                  Biodata
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => { this.toggle(0, '2'); }}
                >
                  Akun
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </Col>
        </Row>
        
        <Modal isOpen={this.state.modalIsOpen}>
          <ModalHeader>Form Tambah Barang</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => {this.addUser(e)}}>
              <FormGroup>
                <Label htmlFor="name">Username</Label>
                <Input type="text" name="username" onChange={(e) =>this.setState({username:e.target.value})} id="nama" required></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Passwor</Label>
                <Input type="password" name="password" onChange={(e) =>this.setState({password:e.target.value})} id="nama" required></Input>
              </FormGroup>
              <Button type="submit" color="primary">Tambah</Button>
              <Button color="danger" onClick={this.toggleModal.bind(this)}>Batal</Button>
            </Form>
          </ModalBody>  
        </Modal>

        <Modal isOpen={this.state.modalBiodata}>
          <ModalHeader>Form Ubah Biodata</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => {this.editBiodataKaryawan(e)}} className="form-horizontal">
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="name">Nama</Label>
                </Col>
                <Col md="9">
                  <Input type="text" name="nama" defaultValue={this.state.nama} onChange={(e) =>this.setState({nama:e.target.value})} id="nama" required></Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="name">Tempat Lahir</Label>
                </Col>
                <Col md="9">
                  <Input type="text" name="nama" defaultValue={this.state.tempat_lahir} onChange={(e) =>this.setState({tempat_lahir:e.target.value})} id="nama" required></Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="name">Tanggal Lahir</Label>
                </Col>
                <Col md="9">
                  <Input type="date" name="nama" defaultValue={this.state.tanggal_lahir} onChange={(e) =>this.setState({tanggal_lahir:e.target.value})} id="nama" required></Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="name">Jenis kelamin</Label>
                </Col>
                <Col md="9">
                <Input type="select" defaultValue={this.state.jenis_kelamin}  id="jenis_kelamin" onChange={(e) =>this.setState({jenis_kelamin:e.target.value})} required >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="Pria">Pria</option>
                  <option value="Wanita">Wanita</option>
                </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="name">Agama</Label>
                </Col>
                <Col md="9">
                <Input type="select" defaultValue={this.state.agama}  id="agama" onChange={(e) =>this.setState({agama:e.target.value})} required >
                  <option value="">Pilih Agama</option>
                  <option value="Islam">Islam</option>
                  <option value="Budha">Budha</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Katolik">Katolik</option>
                  <option value="Kristen">Kristen</option>
                </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="name">Alamat</Label>
                </Col>
                <Col md="9">
                  <Input type="text" name="nama" defaultValue={this.state.alamat} onChange={(e) =>this.setState({alamat:e.target.value})} id="nama" required></Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="name">No Kontak</Label>
                </Col>
                <Col md="9">
                  <Input type="text" name="nama" defaultValue={this.state.no_kontak} onChange={(e) =>this.setState({no_kontak:e.target.value})} id="nama" required></Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="name">Email</Label>
                </Col>
                <Col md="9">
                  <Input type="text" name="nama" defaultValue={this.state.email} onChange={(e) =>this.setState({email:e.target.value})} id="nama" required></Input>
                </Col>
              </FormGroup>
              <div align="center">
                <Button type="submit" color="primary" className="mr-2">Simpan</Button>
                <Button color="danger" onClick={this.toggleModalBiodata.bind(this)}>Batal</Button>
              </div>
            </Form>
          </ModalBody>  
        </Modal>

        <Modal isOpen={this.state.modalAkun}>
          <ModalHeader>Form Ubah Akun</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => {this.editAkun(e)}} className="form-horizontal">
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="name">Username</Label>
                </Col>
                <Col md="9">
                  <Input type="text" name="nama" defaultValue={this.state.username} onChange={(e) =>this.setState({newUsername:e.target.value})} id="nama" required></Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="name">Password</Label>
                </Col>
                <Col md="9">
                  <Input type="password" name="nama"  onChange={(e) =>this.setState({confirmPassword:e.target.value})} id="nama" required></Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="name">Password Baru</Label>
                </Col>
                <Col md="9">
                  <Input type="password" name="nama" onChange={(e) =>this.setState({newPassword:e.target.value})} id="nama" required></Input>
                </Col>
              </FormGroup>
              <div align="center">
                <Button type="submit" color="primary" className="mr-2">Simpan</Button>
                <Button color="danger" onClick={this.toggleModalAkun.bind(this)}>Batal</Button>
              </div>
            </Form>
          </ModalBody>  
        </Modal>

        <Modal isOpen={this.state.modalFoto}>
          <ModalHeader>Form Ubah Foto</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => {this.editFoto(e)}} className="form-horizontal">
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="name">Pilih Foto</Label>
                </Col>
                <Col md="9">
                  <Input type="file" name="nama" id="nama" onChange={(e) =>this.handleFileChange(e.target.files[0])} required></Input>
                </Col>
              </FormGroup>
              <div align="center">
                <Button type="submit" color="primary" className="mr-2">Simpan</Button>
                <Button color="danger" onClick={this.toggleModalFoto.bind(this)}>Batal</Button>
              </div>
            </Form>
          </ModalBody>  
        </Modal>
      </div>

    );
  }
}

export default compose(
  graphql(getDivisisQuery, {name:"getDivisisQuery"}),
  graphql(getAkunsQuery, {name:"getAkunsQuery"}),
  graphql(getKaryawansQuery, {name:"getKaryawansQuery"}),
  graphql(addAkunMutation, {name:"addAkunMutation"}),
  graphql(editAkunMutation, {name:"editAkunMutation"}),
  graphql(editBiodataKaryawanMutation, {name:"editBiodataKaryawanMutation"}),
  graphql(getKaryawansQuery, {name:"getKaryawansQuery"}),
  graphql(uploadFotoMutation, {name:"uploadFotoMutation"}),
  
)(Profile);
