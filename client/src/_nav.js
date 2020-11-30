export default {
  items: [
      {
      name: 'Dashboard',
      url: '/dashboardLogistik/dashboardLogistik',
      icon: 'icon-speedometer',
    },
    {
      name: 'Logistik',
      url: '/base',
      icon: 'fa fa-database',
      children: [
        {
          name: 'Permintaan Barang',
          url: '/permintaanBarang/permintaanBarang',
          icon: 'fa fa-tasks',
        },
        {
          name: 'Penerimaan Barang',
          url: '/penerimaanBarang/penerimaanBarang',
          icon: 'fa fa-angle-double-down',
        },
        {
          name: 'Pengeluaran Barang',
          url: '/pengeluaranBarang/pengeluaranBarang',
          icon: 'fa fa-angle-double-up',
        },
        {
          name: 'Persediaan Barang',
          url: '/persediaanBarang/persediaanBarang',
          icon: 'icon-home',
        },
        {
          name: 'Inventaris',
          url: '/inventaris/inventaris',
          icon: 'icon-wrench',
        },
        {
          name: 'Pemeliharaan',
          url: '/user/karyawan',
          icon: 'icon-user',
        },

      ],
    }, 
    {
      name: 'Purchasing',
      url: '/base',
      icon: 'icon-basket-loaded',
      children: [     
        {
          name: 'Pembelian Barang',
          url: '/purchaseOrder/purchaseOrder',
          icon: 'fa fa-shopping-cart',
        },
        {
          name: 'Penyewaan Alat',
          url: '/penyewaan/penyewaan',
          icon: 'fa fa-handshake-o',
        },
      ],
    },
    {
      name: 'Laporan',
      url: '/peralatan/pemeliharaan',
      icon: 'fa fa-book',
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
  ],
};
