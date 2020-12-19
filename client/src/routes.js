import React from 'react'

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Barang = React.lazy(() => import('./views/Logistik/Barang/Barang'));
const EditBarang = React.lazy(() => import('./views/Logistik/Barang/EditBarang'));
const PermintaanBarang = React.lazy(() => import('./views/Logistik/PermintaanBarang/PermintaanBarang'));
const DetailPermintaanBarang = React.lazy(() => import('./views/Logistik/PermintaanBarang/DetailPermintaanBarang'));
const BuatPermintaanBarang = React.lazy(() => import('./views/Logistik/PermintaanBarang/BuatPermintaanBarang'));
const EditPermintaanBarang = React.lazy(() => import('./views/Logistik/PermintaanBarang/EditPermintaanBarang'));
const PurchaseOrder = React.lazy(() => import('./views/Logistik/PurchaseOrder/PurchaseOrder'));
const BuatPurchaseOrder = React.lazy(() => import('./views/Logistik/PurchaseOrder/BuatPurchaseOrder'));
const DetailPurchaseOrder = React.lazy(() => import('./views/Logistik/PurchaseOrder/DetailPurchaseOrder'));
const Vendor = React.lazy(() => import('./views/Logistik/Vendor/Vendor'));
const EditVendor = React.lazy(() => import('./views/Logistik/Vendor/EditVendor'));
const DashboardLogistik = React.lazy(() => import('./views/Logistik/DashboardLogistik/DashboardLogistik'));
const Profile = React.lazy(() => import('./views/Logistik/Profile/Profile'));
const PersediaanBarang = React.lazy(() => import('./views/Logistik/PersediaanBarang/PersediaanBarang'));
const Inventaris = React.lazy(() => import('./views/Logistik/Inventaris/Inventaris'));
const PenerimaanBarang = React.lazy(() => import('./views/Logistik/PenerimaanBarang/PenerimaanBarang'));
const BuatPenerimaanBarang = React.lazy(() => import('./views/Logistik/PenerimaanBarang/BuatPenerimaanBarang'));
const DetailPenerimaanBarang = React.lazy(() => import('./views/Logistik/PenerimaanBarang/DetailPenerimaanBarang'));
const PengeluaranBarang = React.lazy(() => import('./views/Logistik/PengeluaranBarang/PengeluaranBarang'));
const BuatPengeluaranBarang = React.lazy(() => import('./views/Logistik/PengeluaranBarang/BuatPengeluaranBarang'));
const DetailPengeluaranBarang = React.lazy(() => import('./views/Logistik/PengeluaranBarang/DetailPengeluaranBarang'));
const Pemeliharaan = React.lazy(() => import('./views/Logistik/Pemeliharaan/Pemeliharaan'));
const DetailPemeliharaan = React.lazy(() => import('./views/Logistik/Pemeliharaan/DetailPemeliharaan'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home'  },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/barang/barang', exact: true, name: 'Barang', component: Barang },
  { path: '/barang/editBarang/:id', exact: true, name: 'Edit Barang', component: EditBarang },  
  { path: '/permintaanBarang/permintaanBarang', exact: true, name: 'Permintaan Barang', component: PermintaanBarang },
  { path: '/permintaanBarang/detailPermintaanBarang/:id', exact: true, name: 'Detail Permintaan Barang', component: DetailPermintaanBarang },
  { path: '/permintaanBarang/buatPermintaanBarang', exact: true, name: 'Buat Permintaan Barang', component: BuatPermintaanBarang },
  { path: '/permintaanBarang/editPermintaanBarang/:id', exact: true, name: 'Edit Permintaan Barang', component: EditPermintaanBarang },
  { path: '/purchaseOrder/purchaseOrder', exact: true, name: 'Purchase Order', component: PurchaseOrder },
  { path: '/purchaseOrder/buatPurchaseOrder', exact: true, name: 'Buat Purchase Order', component: BuatPurchaseOrder },
  { path: '/purchaseOrder/detailPurchaseOrder/:id', exact: true, name: 'Detail Purcahse Order', component: DetailPurchaseOrder },
  { path: '/vendor/vendor', exact: true, name: 'List Vendor', component: Vendor },
  { path: '/vendor/editVendor/:id', exact: true, name: 'Edit Vendor', component: EditVendor },
  { path: '/dashboardLogistik/dashboardLogistik', exact: true, name: 'Dashboard', component: DashboardLogistik },
  { path: '/profile/profile', exact: true, name: 'Profile', component: Profile },
  { path: '/dashboardLogistik/dashboardLogistik', exact: true, name: 'Dashboard', component: DashboardLogistik },
  { path: '/persediaanBarang/persediaanBarang', exact: true, name: 'Persediaan Barang', component: PersediaanBarang },
  { path: '/inventaris/inventaris', exact: true, name: 'Inventaris', component: Inventaris },
  { path: '/penerimaanBarang/penerimaanBarang', exact: true, name: 'Penerimaan Barang', component: PenerimaanBarang },
  { path: '/penerimaanBarang/buatPenerimaanBarang/:id', exact: true, name: 'Buat Penerimaan Barang', component: BuatPenerimaanBarang },
  { path: '/penerimaanBarang/detailPenerimaanBarang/:id', exact: true, name: 'Detail Penerimaan Barang', component: DetailPenerimaanBarang },
  { path: '/pengeluaranBarang/pengeluaranBarang', exact: true, name: 'Pengeluaran Barang', component: PengeluaranBarang },
  { path: '/pengeluaranBarang/buatPengeluaranBarang/:id', exact: true, name: 'Buat Pengeluaran Barang', component: BuatPengeluaranBarang },
  { path: '/pengeluaranBarang/detailPengeluaranBarang/:id', exact: true, name: 'Detail Pengeluaran Barang', component: DetailPengeluaranBarang },
  { path: '/pemeliharaan/pemeliharaan', exact: true, name: 'Pemeliharaan Inventaris', component: Pemeliharaan },
  { path: '/pemeliharaan/detailPemeliharaan/:id', exact: true, name: 'Detail Pemeliharaan Inventaris', component: DetailPemeliharaan },

];

export default routes;
