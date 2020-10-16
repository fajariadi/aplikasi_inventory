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
          name: 'Peralatan',
          url: '/peralatan/peralatan',
          icon: 'icon-wrench',
        },
        {
          name: 'Vendor',
          url: '/vendor/vendor',
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
          url: '/permintaanBarang/permintaanBarang',
          icon: 'fa fa-tasks',
        },
        {
          name: 'Purchase Order',
          url: '/purchaseOrder/purchaseOrder',
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
    {
      name: 'form-test',
      url: '/base/forms',
      icon: 'fa fa-book',
    },
  ],
};
