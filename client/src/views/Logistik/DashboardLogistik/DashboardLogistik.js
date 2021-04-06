import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {graphql} from 'react-apollo';
import * as compose from 'lodash.flowright';
import {getPermintaanBarangsQuery,  getAllInventarisQuery, getPurchaseOrdersQuery, getPersediaanBarangsQuery, getPenerimaanBarangsQuery, getPengeluaranBarangsQuery} from '../queries/queries';
import {
  Card,
  CardHeader,
  Table,
  CardBody,
  Col,
  
  Row,


} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';


const brandPrimary = getStyle('--primary')
const brandInfo = getStyle('--info')
// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};

class DashboardLogistik extends Component {
   constructor(props){
    super(props);
    const username= localStorage.getItem("username")

    let loggedIn = true 
      if(username == null){
        loggedIn = false
      }
    this.state = {
      nama: localStorage.getItem("nama"),
      loggedIn
    }
  }

  getPermintaanBarang(){
    const data = this.props.getPermintaanBarangsQuery;
    var jumlah = 0;
    if(data.loading){
      return (<div>Loading Permintaan...</div>);
    } else { 
      if (data.permintaanBarangs !== undefined) {// eslint-disable-next-line
        data.permintaanBarangs.map(permintaan => {
          jumlah++
        })
      } else {
        jumlah = 0;
      }
    }
    return jumlah;
  }

  getPurchaseOrder(){
    const data = this.props.getPurchaseOrdersQuery;
    var jumlah = 0;
    if(data.loading){
      return (<div>Loading Pembelian...</div>);
    } else {
      if (data.purchaseOrders !== undefined){ // eslint-disable-next-line
        data.purchaseOrders.map(order => {
          jumlah++
        })
      } else {
        jumlah = 0;
      }
    } 
    return jumlah;
  }

  getPersediaanBarang(){
   const data = this.props.getPersediaanBarangsQuery;
    var jumlah = 0;
    if(data.loading){
      return (<div>Loading Persediaan...</div>);
    } else {
      if (data.persediaanBarangs !== undefined){// eslint-disable-next-line
        data.persediaanBarangs.map(persediaan => {
          jumlah++
        })
      } else {
        jumlah = 0;
      }
    } 
    return jumlah;
  }

  getInventaris(){
    const data = this.props.getAllInventarisQuery;
    var jumlah = 0;
    if(data.loading){
      return (<div>Loading Inventaris...</div>);
    } else {
      if (data.allInventaris !== undefined){// eslint-disable-next-line
        data.allInventaris.map(inventaris => {
          jumlah++
        })
      }else {
       jumlah = 0;
      }
    } 
    return jumlah;
  }
 
  displayPenerimaanBarang(){
    const data = this.props.getPenerimaanBarangsQuery;
    var no = 0;
    if(data.loading){
      return
    } else  { 
      if (data.penerimaanBarangs !== undefined){// eslint-disable-next-line
        return data.penerimaanBarangs.map(request => {
          no++;
          if (no < 6){
            return(
              <tr key={request.id}>
                <td>{no}</td>
                <td>{request.kode}</td>
                <td>{request.tanggal}</td>
                <td>{request.purchaseOrder.vendor.nama}</td>
              </tr>
            );
          }
        });
      } else {
        window.location.reload(false);
      }
    }
  }

  displayPengeluaranBarang(){
    const data = this.props.getPengeluaranBarangsQuery;
    var no = 0;
    if(data.loading){
      return
    } else{ 
      if ( data.pengeluaranBarangs !== undefined){ // eslint-disable-next-line
        return data.pengeluaranBarangs.map(pengeluaran => {
          no++;
          if (no < 6){
            return(
              <tr key={pengeluaran.id}>
                <td>{no}</td>
                <td>{pengeluaran.kode}</td>
                <td>{pengeluaran.tanggal}</td>
                <td>{pengeluaran.permintaanBarang.divisi.nama}</td>
              </tr>
            );
          }
        });
      }else {
        window.location.reload(false);
      }
    } 
  }

  render() {
    if(this.state.loggedIn === false){
      return <Redirect to="/login" />
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">{this.getPermintaanBarang()}</div> 
                <div>Permintaan Barang</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Line data={cardChartData2} options={cardChartOpts2} height={70} />
              </div>
            </Card>
          </Col>

           <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <div className="text-value">{this.getPurchaseOrder()}</div>
                <div>Purchase Order</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <div className="text-value">{this.getPersediaanBarang()}</div>
                <div>Persediaan Barang</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Line data={cardChartData1} options={cardChartOpts1} height={70} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <div className="text-value">{this.getInventaris()}</div>
                <div>Inventaris</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Daftar Penerimaan Barang
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead align="center">
                  <tr>
                    <th>No</th>
                    <th>Kode</th>
                    <th>Tanggal</th>
                    <th>Vendor</th>
                  </tr>
                  </thead>
                  <tbody align="center">
                    {this.displayPenerimaanBarang()}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Daftar Pengeluaran Barang
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead align="center">
                  <tr>
                    <th>No</th>
                    <th>Kode</th>
                    <th>Tanggal</th>
                    <th>Divisi</th>
                  </tr>
                  </thead>
                  <tbody align="center">
                    {this.displayPengeluaranBarang()}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default compose(
  graphql(getPermintaanBarangsQuery, {name:"getPermintaanBarangsQuery"}),
  graphql(getPurchaseOrdersQuery, {name:"getPurchaseOrdersQuery"}),
  graphql(getPersediaanBarangsQuery, {name:"getPersediaanBarangsQuery"}),
  graphql(getAllInventarisQuery, {name:"getAllInventarisQuery"}),
  graphql(getPenerimaanBarangsQuery, {name:"getPenerimaanBarangsQuery"}),
  graphql(getPengeluaranBarangsQuery, {name:"getPengeluaranBarangsQuery"}),
  
)(DashboardLogistik);
