'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Cities',
            [
                {
                    city: 'Kota Administrasi Jakarta Barat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Administrasi Jakarta Pusat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Administrasi Jakarta Selatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Administrasi Jakarta Timur',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Administrasi Jakarta Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Ambon',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Balikpapan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Banda Aceh',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Bandar Lampung',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Bandung',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Banjar',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Banjarbaru',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Banjarmasin',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Batam',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Batu',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Bau-Bau',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Bekasi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Bengkulu',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Bima',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Binjai',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Bitung',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Blitar',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Bogor',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Bontang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Bukittinggi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Cilegon',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Cimahi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Cirebon',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Denpasar',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Depok',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Dumai',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Gorontalo',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Jambi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Jayapura',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Kediri',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Kendari',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Kotamobagu',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Kupang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Langsa',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Lhokseumawe',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Lubuklinggau',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Madiun',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Magelang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Makassar',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Malang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Manado',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Mataram',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Medan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Metro',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Mojokerto',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Padang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Padangpanjang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Padangsidempuan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Pagar Alam',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Palangka Raya',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Palembang ',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Palopo',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Palu',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Pangkal Pinang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Parepare',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Pariaman',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Pasuruan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Payakumbuh',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Pekalongan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Pekanbaru',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Pematangsiantar',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Pontianak',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Prabumulih',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Probolinggo',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Sabang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Salatiga',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Samarinda',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Sawahlunto',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Semarang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Serang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Sibolga',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Singkawang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Solok',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Sorong',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Subulussalam',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Sukabumi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Sungai Penuh',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Surabaya',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Surakarta',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Tangerang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Tangerang Selatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Tanjung Pinang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Tanjungbalai',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Tarakan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Tasikmalaya',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Tebing Tinggi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Tegal',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Ternate',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Tidore Kepulauan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Tomohon',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Tual',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kota Yogyakarta',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Aceh Barat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Aceh Barat Daya',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Aceh Besar',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Aceh Jaya',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Aceh Selatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Aceh Singkil',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Aceh Tamiang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Aceh Tengah',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Aceh Tenggara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Aceh Timur',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Aceh Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Administrasi Kepulauan Seribu',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Agam',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Alor',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Asahan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Asmat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Badung',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Balangan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bandung',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bandung Barat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Banggai',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Banggai Kepulauan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bangka',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bangka Barat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bangka Selatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bangka Tengah',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bangkalan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bangli',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Banja',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Banjarnegara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bantaeng',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bantul',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Banyuasin',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Banyumas',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Banyuwangi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Barito Kuala',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Barito Selatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Barito Timur',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Barito Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Barru',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Batang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Batanghari',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Batubara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bekasi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Belitung',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Belitung Timur',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Belu',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bener Meriah',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bengkalis',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bengkayang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bengkulu Selatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bengkulu Tengah',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bengkulu Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Berau',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Biak Numfor',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bima',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bintan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bireuen',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Blitar',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Blora',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Boalemo',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bogor',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bojonegoro',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bolaang Mongondow',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bolaang Mongondow Selatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bolaang Mongondow Timur',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bolaang Mongondow Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bombana',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bondowoso',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bone',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bone Bolango',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Boven Digoel',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Boyolali',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Brebes',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Buleleng',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bulukumba',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bulungan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Bungo',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Buol',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Buru',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Buru Selatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Buton',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Buton Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Ciamis',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Cianjur',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Cilacap',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Cirebon',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Dairi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Deiyai',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Deli Serdang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Demak',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Dharmasraya',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Dogiyai',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Dompu',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Donggala',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Empat Lawang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Ende',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Enrekang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Fakfak',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Flores Timur',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Garut',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Gayo Lues',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Gianyar',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Gorontalo',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Gorontalo Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Gowa',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Gresik',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Grobogan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Gunung Kidul',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Gunung Mas',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Halmahera Barat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Halmahera Selatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Halmahera Tengah',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Halmahera Timur',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Halmahera Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Hulu Sungai Selatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Hulu Sungai Tengah',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Hulu Sungai Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Humbang Hasundutan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Indragiri Hilir',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Indragiri Hulu',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Indramayu',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Intan Jaya',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Jayapura',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Jayawijaya',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Jember',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Jembrana',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Jeneponto',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Jepara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Jombang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kaimana',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kampar',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kapuas',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kapuas Hulu',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Karanganyar',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Karangasem',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Karawang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Karimun',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Karo',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Katingan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kaur',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kayong Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kebumen',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kediri',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Keerom',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kendal',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kepahiang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kepulauan Anambas',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kepulauan Aru',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kepulauan Mentawai',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kepulauan Meranti',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kepulauan Sangihe',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kepulauan Selayar',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kepulauan Siau Tagulandang Biaro',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kepulauan Sula',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kepulauan Talaud',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kepulauan Yapen',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kerinci',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Ketapang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Klaten',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Klungkung',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kolaka',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kolaka Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Konawe',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Konawe Selatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Konawe Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kotabaru',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kotawaringin Barat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kotawaringin Timur',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kuantan Singingi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kubu Raya',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kudus',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kulon Progo',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kuningan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kupang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kutai Barat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kutai Kartanegara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Kutai Timur',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Labuhanbatu',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Labuhanbatu Selatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Labuhanbatu Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Lahat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Lamandau',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Lamongan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Lampung Barat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Lampung Selatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Lampung Tengah',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Lampung Timur',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Lampung Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Landak',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Langkat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Lanny Jaya',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Lebak',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Lebong',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Lembata',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Lima Puluh Kota',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Lingga',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Lombok Barat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Lombok Tengah',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Lombok Timur',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Lombok Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Lumajang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Luwu',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Luwu Timur',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Luwu Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Luwu Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Magelang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Mahakam Ulu',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Majalengka',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Majalengka',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Majene',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Malang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Malinau',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Maluku Barat Daya',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Maluku Tengah',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Maluku Tenggara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Maluku Tenggara Barat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Mamberamo Raya',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Mamberamo Tengah',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Mamuju',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Mamuju Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Mandailing Natal',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Manggarai',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Manggarai Barat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Manggarai Timur',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Manokwari',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Mappi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Maros',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Maybrat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Melawi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Mempawah',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Merangin',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Merauke',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Mesuji',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Mimika',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Minahasa',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Minahasa Selata',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Minahasa Tenggara ',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Minahasa Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Mojokerto',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Morowali',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Muara Enim',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Muaro Jambi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Mukomuko',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Muna',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Murung Raya',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Musi Banyuasin',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Musi Rawas',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Nabire',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Nagan Raya',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Nagekeo',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Natuna',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Nduga',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Ngada',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Nganjuk',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Ngawi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Nias',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Nias Barat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Nias Selatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Nias Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Nunukan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Ogan Ilir',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Ogan Komering Ilir',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Ogan Komering Ulu',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Ogan Komering Ulu Selatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Ogan Komering Ulu Timur',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pacitan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Padang Lawas',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Padang Lawas Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Padang Pariaman',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pakpak Bharat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pamekasan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pandeglang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pangkajene dan Kepulauan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Paniai',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Parigi Moutong',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pasaman',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pasaman Barat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Paser',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pasuruan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pati',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pegunungan Bintang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pekalongan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pelalawan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pemalang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Penajam Paser Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pesawaran',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pesisir Selatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pidie',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pidie Jaya',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pinrang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pohuwato',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Polewali Mandar',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Ponorogo',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Poso',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pringsewu',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Probolinggo',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pulang Pisau',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Pulau Morotai',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Puncak',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Puncak Jaya',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Purbalingga',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Purwakarta',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Purworejo',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Raja Ampat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Rejang Lebong',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Rembang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Rokan Hilir',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Rokan Hulu',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Rote Ndao',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sabu Raijua',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sambas',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Samosir',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sampang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sanggau',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sarmi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sarolangun',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sekadau',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Seluma',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Semarang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Seram Bagian Barat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Seram Bagian Timur',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Serang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Serdang Bedagai',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Seruyan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Siak',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sidenreng Rappang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sidoarjo',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sigi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sijunjung',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sikka',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Simalungun',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Simeulue',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sinjai',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sintang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Situbondo',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sleman',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Solok',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Solok Selatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Soppeng',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sorong',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sorong Selatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sragen',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Subang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sukabumi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sukamara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sukoharjo',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sumba Bara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sumba Barat Daya',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sumba Tengah',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sumba Timur',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sumbawa',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sumbawa Barat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sumedang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Sumenep',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Supiori',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tabalong',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tabanan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Takalar',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tambrauw',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tana Tidung',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tana Toraja',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tanah Bumbu',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tanah Datar',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tanah Laut',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tangerang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tanggamus',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tanjung Jabung Barat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tanjung Jabung Timur',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tapanuli Selatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tapanuli Tengah',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tapanuli Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tapin',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tasikmalaya',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tebo',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tegal',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Teluk Bintuni',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Teluk Wondama',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Temanggung',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Timor Tengah Selatan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Timor Tengah Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Toba Samosir',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tojo Una-Una ',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Toli-Toli',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tolikara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Toraja Utara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Trenggalek',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tuban',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tulang Bawang',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tulang Bawang Barat',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Tulungagung',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Wajo',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Wakatobi',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Waropen',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Way Kanan',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Wonogiri',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Wonosobo',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Yahukimo',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    city: 'Kabupaten Yalimo',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Cities', null, {
            truncate: true,
            restartIdentity: true
        });
    }
};
