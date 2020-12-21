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
      icon: 'fa fa-truck',
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
          url: '/pemeliharaan/pemeliharaan',
          icon: 'icon-wrench',
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
      ],
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
      ],
    }, 
  ],
};
