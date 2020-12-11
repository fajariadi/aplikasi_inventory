import React from 'react'

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

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
const Akun = React.lazy(() => import('./views/Logistik/Users/Akun'));
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

const DataKaryawan = React.lazy(() => import('./views/HumanResource/Karyawan/DataKaryawan'));
const TambahKaryawan = React.lazy(() => import('./views/HumanResource/Karyawan/TambahKaryawan'));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home'  },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },


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


  { path: '/user/akun', exact: true, name: 'Akun', component: Akun },
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

];

export default routes;
