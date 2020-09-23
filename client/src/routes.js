import React from 'react';

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
const Inventaris = React.lazy(() => import('./views/Logistik/Peralatan/Inventaris'));
const Pemeliharaan = React.lazy(() => import('./views/Logistik/Peralatan/Pemeliharaan'));
const Request = React.lazy(() => import('./views/Logistik/Request/Request'));
const DetailRequest = React.lazy(() => import('./views/Logistik/Request/DetailRequest'));
const CreateRequest = React.lazy(() => import('./views/Logistik/Request/CreateRequest'));
const EditRequest = React.lazy(() => import('./views/Logistik/Request/EditRequest'));
const ListOrder = React.lazy(() => import('./views/Logistik/Order/ListOrder'));
const CreateOrder = React.lazy(() => import('./views/Logistik/Order/CreateOrder'));
const DetailOrder = React.lazy(() => import('./views/Logistik/Order/DetailOrder'));
const PenerimaanBarang = React.lazy(() => import('./views/Logistik/Order/PenerimaanBarang'));
const PengambilanBarang = React.lazy(() => import('./views/Logistik/Order/PengambilanBarang'));
const ListVendor = React.lazy(() => import('./views/Logistik/Vendor/ListVendor'));
const OfferRoom = React.lazy(() => import('./views/Logistik/Users/OfferRoom'));
const Karyawan = React.lazy(() => import('./views/Logistik/Users/Karyawan'));
const DashboardLogistik = React.lazy(() => import('./views/Logistik/DashboardLogistik/DashboardLogistik'));
const Profile = React.lazy(() => import('./views/Logistik/Profile/Profile'));
const Penyewaan = React.lazy(() => import('./views/Logistik/Penyewaan/Penyewaan'));
const BuatPenyewaan = React.lazy(() => import('./views/Logistik/Penyewaan/BuatPenyewaan'));
const DetailPenyewaan = React.lazy(() => import('./views/Logistik/Penyewaan/DetailPenyewaan'));


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
  { path: '/peralatan/inventaris', exact: true, name: 'Inventaris', component: Inventaris },
  { path: '/peralatan/pemeliharaan', exact: true, name: 'Pemeliharaan', component: Pemeliharaan },
  { path: '/request/request', exact: true, name: 'Permintaan Barang', component: Request },
  { path: '/request/detailRequest/:id', exact: true, name: 'Detail Permintaan', component: DetailRequest },
  { path: '/request/createRequest', exact: true, name: 'Permintaan Barang', component: CreateRequest },
  { path: '/request/editRequest/:id', exact: true, name: 'Edit Permintaan Barang', component: EditRequest },
  { path: '/order/listOrder', exact: true, name: 'List Order', component: ListOrder },
  { path: '/order/createOrder', exact: true, name: 'Create Order', component: CreateOrder },
  { path: '/order/detailOrder', exact: true, name: 'Detail Order', component: DetailOrder },
  { path: '/order/penerimaanBarang', exact: true, name: 'Penermaan Barang Order', component: PenerimaanBarang },
  { path: '/order/pengambilanBarang', exact: true, name: 'Pengambilan Barang Order', component: PengambilanBarang },
  { path: '/vendor/listVendor', exact: true, name: 'List Vendor', component: ListVendor },

  { path: '/user/offerRoom', exact: true, name: 'Offer Room', component: OfferRoom },
  { path: '/user/karyawan', exact: true, name: 'Users', component: Karyawan },
  { path: '/dashboardLogistik/dashboardLogistik', exact: true, name: 'Dashboard', component: DashboardLogistik },
  { path: '/profile/profile', exact: true, name: 'Profile', component: Profile },
  { path: '/penyewaan/penyewaan', exact: true, name: 'Penyewaan', component: Penyewaan },
  { path: '/penyewaan/buatPenyewaan', exact: true, name: 'Buat Penyewaan', component: BuatPenyewaan },
  { path: '/penyewaan/detailPenyewaan', exact: true, name: 'Detail Penyewaan', component: DetailPenyewaan },
  { path: '/dashboardLogistik/dashboardLogistik', exact: true, name: 'Dashboard', component: DashboardLogistik },

];

export default routes;
