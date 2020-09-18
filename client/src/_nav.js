export default {
  items: [
      {
      name: 'Dashboard',
      url: '/dashboardLogistik/dashboardLogistik',
      icon: 'icon-speedometer',
    },
    {
      name: 'Data Master',
      url: '/base',
      icon: 'fa fa-database',
      children: [
        {
          name: 'Barang',
          url: '/barang/barang',
          icon: 'icon-puzzle',
        },
        {
          name: 'Inventaris',
          url: '/peralatan/inventaris',
          icon: 'icon-wrench',
        },
        {
          name: 'Vendor',
          url: '/vendor/listVendor',
          icon: 'icon-home',
        },
        {
          name: 'User',
          url: '/user/karyawan',
          icon: 'icon-user',
        },

      ],
    }, 
    {
      name: 'Transaksi',
      url: '/base',
      icon: 'icon-basket-loaded',
      children: [
        {
          name: 'Permintaan Barang',
          url: '/request/request',
          icon: 'fa fa-tasks',
        },
        {
          name: 'Purchase Order',
          url: '/order/listOrder',
          icon: 'fa fa-shopping-cart',
        },
        {
          name: 'Penyewaan Alat',
          url: '/penyewaan/penyewaan',
          icon: 'fa fa-handshake-o',
        },
        {
          name: 'Penerimaan Barang',
          url: '/order/penerimaanBarang',
          icon: 'fa fa-angle-double-down',
        },
        {
          name: 'Pengambilan Barang',
          url: '/order/pengambilanBarang',
          icon: 'fa fa-angle-double-up',
        },
      ],
    },
    {
      name: 'Pemeliharaan',
      url: '/peralatan/pemeliharaan',
      icon: 'fa fa-refresh',
    },
    {
      name: 'Laporan',
      url: '/peralatan/pemeliharaan',
      icon: 'fa fa-book',
    },
  ],
};
