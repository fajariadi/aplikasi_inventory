import React, { Component} from 'react';
import {
  Button,
  Container,
  Card,
  CardGroup,
  CardBody,
  Col,
  Row,

} from 'reactstrap';
import {graphql} from 'react-apollo';
import { getAkunQuery } from '../../Logistik/queries/queries';
import { Redirect, Link } from 'react-router-dom';


class Auth extends Component {

  displayError(){
    return (
      <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="5">
            <CardGroup>
              <Card className="p-4">
                <CardBody className="text-center">
                  <h1 className="text-center">Login</h1>
                  <p className="text-muted text-center">Username atau Password Anda Salah</p>
                  <Link to="/login" >
                    <Button color="primary" >Coba Lagi</Button>
                  </Link>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
    )
  }
  doLogin(){
    const {akun} = this.props.data;
    if(akun){
      if(akun.karyawan.divisi.nama === 'Logistic' ||  akun.karyawan.divisi.nama === 'Purchasing' || akun.karyawan.jabatan === 'Admin' ){
        localStorage.setItem("username", akun.username);
        localStorage.setItem("password", akun.password);
        localStorage.setItem("user_id", akun.id);
        localStorage.setItem("nama", akun.karyawan.nama);
        localStorage.setItem("tempat_lahir", akun.karyawan.tempat_lahir);
        localStorage.setItem("tanggal_lahir", akun.karyawan.tanggal_lahir);
        localStorage.setItem("jenis_kelamin", akun.karyawan.jenis_kelamin);
        localStorage.setItem("agama", akun.karyawan.agama);
        localStorage.setItem("no_kontak", akun.karyawan.no_kontak);
        localStorage.setItem("email", akun.karyawan.email);
        localStorage.setItem("jabatan", akun.karyawan.jabatan);
        localStorage.setItem("alamat", akun.karyawan.alamat);
        localStorage.setItem("karyawan_id", akun.karyawan.id);
        localStorage.setItem("divisi", akun.karyawan.divisi.nama);
        localStorage.setItem("divisi_id", akun.karyawan.divisi.id);
        return(
          <Redirect to="/dashboardLogistik/dashboardLogistik" />
        )
      } else {
        return(this.displayError())
      }
    } else {
      return(this.displayError())
    }
  }
  
  render() { 
    return (
      <div>
        {this.doLogin()}
      </div>
    );
  }
}

export default graphql(getAkunQuery, {
    options:(props) => {
      return{
        variables:{
          username: props.match.params.username,
          password: props.match.params.password
        }
      }
    }
  })(Auth);
