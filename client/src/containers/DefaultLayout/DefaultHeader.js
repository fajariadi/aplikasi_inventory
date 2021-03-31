import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {graphql} from 'react-apollo';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import {getPermintaanBarangsQuery} from '../../views/Logistik/queries/queries';

import {  AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import sygnet from '../../assets/img/brand/sygnet.svg'
import * as compose from 'lodash.flowright';
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      nama: localStorage.getItem("nama"),
    }
  }

  getPermintaanBarang(){
    const data = this.props.getPermintaanBarangsQuery;
    var jumlah = 0;
    if(data.loading){
      return (<div>Loading Pemeliharaan...</div>);
    } else { 
        if (data.permintaanBarangs !== undefined){// eslint-disable-next-line
          data.permintaanBarangs.map(permintaan => {
            if(permintaan.status === 'Belum Disetujui'){
              jumlah++
            }
          })
        } else {
          window.location.reload(false);
        }
    }
    return (jumlah);
  }

  

 
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ width: 89, height: 25, alt: 'AMF-HAQ' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink to="/permintaanBarang/permintaanBarang" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">{this.getPermintaanBarang()}</Badge></NavLink>
          </NavItem>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/default-user.png'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>{this.state.nama}</strong></DropdownItem>
              <Link to="/profile/profile">
                <DropdownItem >
                  <i className="fa fa-user"></i> Profil
                </DropdownItem>
              </Link>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-sign-out"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default compose (
  graphql(getPermintaanBarangsQuery, {name:"getPermintaanBarangsQuery"})
)(DefaultHeader);

