export type Category = string;

export interface Item {
  id: string;
  name: string;
  category: Category;
  price: number;
  isBought: boolean;
  notes?: string;
  image?: string;
  link?: string;
  createdAt?: number;
}

export interface Budget {
  total: number;
}

export const CATEGORIES: Category[] = [
  'Mutfak',
  'Yatak Odası',
  'Banyo',
  'Elektronik',
  'Salon',
  'Dekorasyon',
  'Diğer',
];

export const INITIAL_ITEMS: Item[] = [
  {
    "id": "1",
    "name": "Granit Tencere Seti",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Yapışmaz yüzey"
  },
  {
    "id": "2",
    "name": "Çelik Tencere Seti",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Farklı boyutlar"
  },
  {
    "id": "3",
    "name": "Teflon Tencere ve Tava Seti",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Yapışmaz yüzey"
  },
  {
    "id": "4",
    "name": "Emaye Tencere Seti",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Set"
  },
  {
    "id": "5",
    "name": "Yumurta Haşlama Tenceresi",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "6",
    "name": "Sütlük",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "7",
    "name": "Döküm Tencere",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "8",
    "name": "Kızartma Tenceresi",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "9",
    "name": "Krep/Pankek Tavası",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "10",
    "name": "Wok Tava",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "11",
    "name": "Fırın Kabı/Güveç Seti",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Kil veya seramik"
  },
  {
    "id": "12",
    "name": "Büyük Boy Çaydanlık",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "13",
    "name": "Küçük Boy Çaydanlık",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "14",
    "name": "Türk Kahvesi Fincanı",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "6 Adet"
  },
  {
    "id": "15",
    "name": "Çay Fincanları",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Set"
  },
  {
    "id": "16",
    "name": "Nescafe Fincanı",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Set"
  },
  {
    "id": "17",
    "name": "Kahve Yanı Bardakları",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "12 Adet"
  },
  {
    "id": "18",
    "name": "Kupa Bardaklar",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "12 Adet"
  },
  {
    "id": "19",
    "name": "Termos",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Sıcak/soğuk içecekler için"
  },
  {
    "id": "20",
    "name": "Misafir Yemek Takımı",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Misafir takımı"
  },
  {
    "id": "21",
    "name": "Günlük Yemek Takımı",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Set"
  },
  {
    "id": "22",
    "name": "Misafir Çorba Seti",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 takım"
  },
  {
    "id": "23",
    "name": "Günlük Çorba Seti",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 takım"
  },
  {
    "id": "24",
    "name": "Pizza Tabağı",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "6 Adet"
  },
  {
    "id": "25",
    "name": "Yuvarlak Tabak",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Sunum için"
  },
  {
    "id": "26",
    "name": "Tatlı Kase",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Set"
  },
  {
    "id": "27",
    "name": "Günlük Çatal-Bıçak-Kaşık Seti",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Paslanmaz çelik, bulaşık makinesinde yıkanabilir"
  },
  {
    "id": "28",
    "name": "Misafir Çatal-Bıçak-Kaşık Seti",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Özel tasarım, parlak yüzey"
  },
  {
    "id": "29",
    "name": "Günlük Bıçak Seti",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Set"
  },
  {
    "id": "30",
    "name": "Soyacak",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "31",
    "name": "Rende",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "32",
    "name": "Servis Takımı",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Kepçe, spatula, kevgir vb."
  },
  {
    "id": "33",
    "name": "Kevgir",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "34",
    "name": "Çatal",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Yedek veya ek"
  },
  {
    "id": "35",
    "name": "El Rendesi",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "36",
    "name": "Mutfak Makası",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "37",
    "name": "Pizza Kesici",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "38",
    "name": "Dondurma Kaşığı",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "39",
    "name": "Yumurta Fırçası",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "40",
    "name": "Silikon Fırça",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "41",
    "name": "Patates Ezici",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "42",
    "name": "Tahta Kaşık Seti",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Set"
  },
  {
    "id": "43",
    "name": "Çırpma Teli",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "44",
    "name": "Makarna Süzgeci",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "45",
    "name": "Silikon Mutfak Gereçleri",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Spatula, fırça vb."
  },
  {
    "id": "46",
    "name": "Salata Kurutucu",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "47",
    "name": "Günlük Su Bardağı",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "12 adet"
  },
  {
    "id": "48",
    "name": "Misafir Su Bardağı",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Daha şık ve özel tasarım"
  },
  {
    "id": "49",
    "name": "Çay Seti",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Bardak ve tabaklarıyla"
  },
  {
    "id": "50",
    "name": "Türk Kahvesi Fincanı",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "6 Adet"
  },
  {
    "id": "51",
    "name": "Çay Fincanları",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Set"
  },
  {
    "id": "52",
    "name": "Nescafe Fincanı",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Set"
  },
  {
    "id": "53",
    "name": "Kahve Yanı Bardakları",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "12 Adet"
  },
  {
    "id": "54",
    "name": "Kupa Bardaklar",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "12 Adet"
  },
  {
    "id": "55",
    "name": "Şampanya Bardağı Seti",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Set"
  },
  {
    "id": "56",
    "name": "Şarap Kadehleri",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Set"
  },
  {
    "id": "57",
    "name": "Kokteyl Bardakları",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Set"
  },
  {
    "id": "58",
    "name": "Limonata Bardağı",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Set"
  },
  {
    "id": "59",
    "name": "Sürahi",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Genel kullanım"
  },
  {
    "id": "60",
    "name": "Baykuş Sürahisi",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Dekoratif"
  },
  {
    "id": "61",
    "name": "Günlük Sürahi",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Su veya meşrubat"
  },
  {
    "id": "62",
    "name": "Borcam Seti",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Yuvarlak, kare, dikdörtgen"
  },
  {
    "id": "63",
    "name": "Cam Saklama Kabı",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Farklı boyutlar, kapaklı"
  },
  {
    "id": "64",
    "name": "Yağlık",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "65",
    "name": "Cam Kayık Tabak (Salata)",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "66",
    "name": "Yuvarlak Salata Sunumluğu",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "67",
    "name": "Çerezlik (Büyük Boy)",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "12 Adet"
  },
  {
    "id": "68",
    "name": "Çerezlik (Küçük Boy)",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "12 Adet"
  },
  {
    "id": "69",
    "name": "Şekerlik",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "70",
    "name": "Baharatlık",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "71",
    "name": "Çay Şeker Kahve Seti",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 set"
  },
  {
    "id": "72",
    "name": "Kek Kalıbı Seti",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Set"
  },
  {
    "id": "73",
    "name": "Tuzluk Biberlik Seti",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 set"
  },
  {
    "id": "74",
    "name": "Cam Kavanozlar",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "12 Adet"
  },
  {
    "id": "75",
    "name": "Kesme Tahtası",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "76",
    "name": "Tepsiler",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Çeşitli"
  },
  {
    "id": "77",
    "name": "Süzgeç",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "78",
    "name": "Kek Kapsülü",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Farklı boyutlar"
  },
  {
    "id": "79",
    "name": "Ekmek Kutusu",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "80",
    "name": "Ölçü Kabı",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "81",
    "name": "Saklama Poşeti",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Çeşitli"
  },
  {
    "id": "82",
    "name": "Sebze Kurutucu",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "83",
    "name": "Çöp Kutusu",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "84",
    "name": "Raf İçi Düzenleyici (Kaşıklık)",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "85",
    "name": "Kavanoz",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Küçük boyutlu"
  },
  {
    "id": "86",
    "name": "Kağıt Havluluk",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "87",
    "name": "Kurabiye Kalıpları",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Set"
  },
  {
    "id": "88",
    "name": "3'lü Saklama Kabı",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 set"
  },
  {
    "id": "89",
    "name": "Çelik Kap Seti",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 set"
  },
  {
    "id": "90",
    "name": "Bulaşık Fırçası",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "91",
    "name": "Mutfak Süngeri Deterjanlık",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 set"
  },
  {
    "id": "92",
    "name": "Buzluk Kapları",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Yiyecekleri dondurmak için"
  },
  {
    "id": "93",
    "name": "Buz Kalıbı",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Farklı şekiller"
  },
  {
    "id": "94",
    "name": "Geniş Karıştırma Kapları",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Salata, hamur vb. için"
  },
  {
    "id": "95",
    "name": "Streç Film, Alüminyum Folyo, Pişirme Kağıdı",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Temel mutfak sarf malzemeleri"
  },
  {
    "id": "96",
    "name": "Buzdolabı Düzenleyicileri",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Raf ve çekmece düzenleyicileri"
  },
  {
    "id": "97",
    "name": "Kurulama Bezi",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Emici"
  },
  {
    "id": "98",
    "name": "Peçetelik",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Masaüstü"
  },
  {
    "id": "99",
    "name": "Sofra Bezi",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "2 adet"
  },
  {
    "id": "100",
    "name": "Sıcak Servis Altlıkları",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Silikon veya mantar"
  },
  {
    "id": "101",
    "name": "Kek Servis Seti",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "2 Adet"
  },
  {
    "id": "102",
    "name": "Mutfak Önlüğü",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Yıkanabilir, mutfak için"
  },
  {
    "id": "103",
    "name": "Fırın Eldiveni",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Isıya dayanıklı"
  },
  {
    "id": "104",
    "name": "Masa Örtüsü",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Günlük ve misafir"
  },
  {
    "id": "105",
    "name": "Nihale",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Tencere altlığı"
  },
  {
    "id": "106",
    "name": "Konserve Açacağı",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Manuel veya elektrikli"
  },
  {
    "id": "107",
    "name": "Tirbuşon",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Şarap ve meşrubat şişeleri için"
  },
  {
    "id": "108",
    "name": "Mutfak Tartısı",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Hassas ölçüm için"
  },
  {
    "id": "109",
    "name": "Ekmek Tahtası",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Kesme ve servis için"
  },
  {
    "id": "110",
    "name": "Hamur Açma Merdanesi",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "1 adet"
  },
  {
    "id": "111",
    "name": "Şamdan (Mutfak)",
    "category": "Mutfak",
    "price": 0,
    "isBought": false,
    "notes": "Özel yemekler için dekoratif"
  },
  {
    "id": "112",
    "name": "Buzdolabı",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "No-frost, aile büyüklüğüne göre kapasite"
  },
  {
    "id": "113",
    "name": "Çamaşır Makinesi",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Yüksek enerji sınıfı, kurutuculu (isteğe bağlı)"
  },
  {
    "id": "114",
    "name": "Bulaşık Makinesi",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Yüksek enerji sınıfı, hızlı program"
  },
  {
    "id": "115",
    "name": "Kurutma Makinesi",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Çamaşır makinesinden ayrı (isteğe bağlı)"
  },
  {
    "id": "116",
    "name": "Fırın-Davlumbaz (Eve Bağlı)",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Ankastre veya solo, ev sistemine uygun"
  },
  {
    "id": "117",
    "name": "Mini Fırın",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Daha küçük mutfaklar veya ek kullanım için"
  },
  {
    "id": "118",
    "name": "Mikrodalga Fırın",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Isıtma ve buz çözme özellikli"
  },
  {
    "id": "119",
    "name": "El Süpürgesi",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Hızlı temizlik için şarj edilebilir"
  },
  {
    "id": "120",
    "name": "Robot Süpürge",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Otomatik temizlik için"
  },
  {
    "id": "121",
    "name": "Ütü",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Buharlı, seramik tabanlı"
  },
  {
    "id": "122",
    "name": "Kahve Makinası",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Filtre kahve veya espresso için"
  },
  {
    "id": "123",
    "name": "Türk Kahvesi Makinası",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Tek veya çift hazneli, taşma emniyetli"
  },
  {
    "id": "124",
    "name": "Tost Makinası",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Granit veya döküm plakalı"
  },
  {
    "id": "125",
    "name": "Çaycı",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Su ısıtıcı ve demlik bir arada"
  },
  {
    "id": "126",
    "name": "Saç Kurutma Makinası",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Güçlü motor"
  },
  {
    "id": "127",
    "name": "Tıraş Makinası",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Erkekler için kişisel bakım"
  },
  {
    "id": "128",
    "name": "Şarjlı Diş Fırçası",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Kişisel hijyen için"
  },
  {
    "id": "129",
    "name": "Hava Temizleyici",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "İç mekan hava kalitesini artırmak için"
  },
  {
    "id": "130",
    "name": "Su Filtresi/Arıtıcısı",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Musluk veya sürahi tipi"
  },
  {
    "id": "131",
    "name": "Dikiş Makinesi",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Ev kullanımı için basit model (isteğe bağlı)"
  },
  {
    "id": "132",
    "name": "Televizyon (Yatak Odası)",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Yatak odası için uygun boyut"
  },
  {
    "id": "133",
    "name": "Televizyon (Salon)",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Salon için büyük ekran Akıllı TV"
  },
  {
    "id": "134",
    "name": "Ses Sistemi",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Film/müzik keyfi için (isteğe bağlı)"
  },
  {
    "id": "135",
    "name": "Kablolu/Kablosuz Telefon Seti",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Sabit hat veya genel kullanım için"
  },
  {
    "id": "136",
    "name": "Akıllı Ev Sistemleri (Priz, Uzatma Kabl.)",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Akıllı priz, USB'li uzatma kablosu vb."
  },
  {
    "id": "137",
    "name": "Gece Hareket Duyarlı Işık",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Koridor veya banyo için"
  },
  {
    "id": "138",
    "name": "Ev İçi Gece Aydınlatması (LED)",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Ortam aydınlatması için şerit LED vb."
  },
  {
    "id": "139",
    "name": "Akıllı Ampuller",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Uygulama ile kontrol edilebilir (isteğe bağlı)"
  },
  {
    "id": "140",
    "name": "Klima",
    "category": "Elektronik",
    "price": 0,
    "isBought": false,
    "notes": "Yüksek enerji sınıfı (isteğe bağlı)"
  },
  {
    "id": "141",
    "name": "Koltuk Takımı",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Oturma düzenine uygun"
  },
  {
    "id": "142",
    "name": "Yemek Masası",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Sandalyeleri dahil, 4 veya 6 kişilik, açılabilir"
  },
  {
    "id": "143",
    "name": "TV Ünitesi",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "TV boyutuna uygun, depolama alanlı"
  },
  {
    "id": "144",
    "name": "Orta Sehpa",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Salon ve koltuk takımına uygun"
  },
  {
    "id": "145",
    "name": "Zigon Sehpa Takımı",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Farklı boyutlarda, kullanışlı"
  },
  {
    "id": "146",
    "name": "Kitaplık",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Kitap severler için (isteğe bağlı)"
  },
  {
    "id": "147",
    "name": "İskemle/Puf",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Ek oturma veya dekoratif amaçlı"
  },
  {
    "id": "148",
    "name": "Lambader",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Ek ışık ve atmosfer için"
  },
  {
    "id": "149",
    "name": "Dekoratif Kırlentler",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Koltuk takımına uygun renkler"
  },
  {
    "id": "150",
    "name": "Aksesuarlar",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Şamdanlar, biblolar, heykeller vb."
  },
  {
    "id": "151",
    "name": "Bitkiler",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Yapay veya canlı bitki, saksıda"
  },
  {
    "id": "152",
    "name": "Tablo",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Çok güzel bir tablo (zevke göre)"
  },
  {
    "id": "153",
    "name": "Duvar Saati",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Dekoratif"
  },
  {
    "id": "154",
    "name": "Halı/Kilim",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Salon ve dekorasyona uygun"
  },
  {
    "id": "155",
    "name": "Perdeler",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Tül ve fon, karartma özellikli"
  },
  {
    "id": "156",
    "name": "Vazolar",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Farklı boyut ve malzemeler"
  },
  {
    "id": "157",
    "name": "Battaniye/Şal",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Koltuk üzerinde dekoratif"
  },
  {
    "id": "158",
    "name": "Dekoratif Mumlar/Şamdanlar",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Ortam atmosferi için"
  },
  {
    "id": "159",
    "name": "Dekoratif Aynalar",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Duvar veya şifonyer için"
  },
  {
    "id": "160",
    "name": "Fotoğraf Çerçeveleri",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Anılar için farklı boyutlar"
  },
  {
    "id": "161",
    "name": "Perde Aksesuarları",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Toplama, püskül vb."
  },
  {
    "id": "162",
    "name": "Dekoratif Şömine",
    "category": "Salon",
    "price": 0,
    "isBought": false,
    "notes": "Elektrikli veya sadece dekoratif (isteğe bağlı)"
  },
  {
    "id": "163",
    "name": "Yatak Odası Takımı",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Yatak, gardırop, komodin, şifonyer dahil"
  },
  {
    "id": "164",
    "name": "Baza",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Yatak için depolama alanı sunan"
  },
  {
    "id": "165",
    "name": "Gardrop",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Geniş depolama kapasitesi (Yatak Odası Takımından ayrı düşünülebilir)"
  },
  {
    "id": "166",
    "name": "Şifonyer",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Çekmeceli, ek depolama için (Yatak Odası Takımından ayrı düşünülebilir)"
  },
  {
    "id": "167",
    "name": "Aynalık",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Dekoratif veya fonksiyonel boy aynası"
  },
  {
    "id": "168",
    "name": "Makyaj Masası",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Aynalı ve çekmeceli"
  },
  {
    "id": "169",
    "name": "Çift Kişilik Nevresim Takımı",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Farklı desen ve kumaşlar"
  },
  {
    "id": "170",
    "name": "Çift Kişilik Nevresim Takımı (Misafir İçin)",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Misafirler için özel, zarif takım"
  },
  {
    "id": "171",
    "name": "Çift Kişilik Battaniye",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Farklı kalınlıklar (ince ve kalın)"
  },
  {
    "id": "172",
    "name": "Tek Kişilik Battaniye",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Ek kullanım veya tek kişilik yatak için"
  },
  {
    "id": "173",
    "name": "Çift Kişilik Yorgan Yastık Seti",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Yazlık ve kışlık yorgan ve yastıklar"
  },
  {
    "id": "174",
    "name": "Çift Kişilik Pike Takımı",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Yaz aylarında kullanım için"
  },
  {
    "id": "175",
    "name": "Yatak Örtüsü",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Dekoratif, yatak odası takımına uygun"
  },
  {
    "id": "176",
    "name": "Lastikli Çarşaf",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Yatak boyutuna uygun, kolay takılabilir"
  },
  {
    "id": "177",
    "name": "Yorgan",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Yazlık ve kışlık, set dışı ek yorgan"
  },
  {
    "id": "178",
    "name": "Yastık",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Uyku ve dekoratif yastıklar, ortopedik/standart"
  },
  {
    "id": "179",
    "name": "Tv Battaniyesi",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Film/TV izlerken kullanım için, yumuşak"
  },
  {
    "id": "180",
    "name": "Misafir Yastık Kılıfları",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Ek misafir yastıkları için takım"
  },
  {
    "id": "181",
    "name": "Alez",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Yatak koruyucu, sıvı geçirmez"
  },
  {
    "id": "182",
    "name": "Hurç",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Battaniye, yorgan, mevsimlik kıyafet saklamak için"
  },
  {
    "id": "183",
    "name": "Uyku Maskesi",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Göz bandı"
  },
  {
    "id": "184",
    "name": "Pijama Takımları",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Farklı mevsimler için"
  },
  {
    "id": "185",
    "name": "Nevresim/Çarşaf Saklama Çantaları",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Gardırop düzeni için"
  },
  {
    "id": "186",
    "name": "Kıyafet Kılıfları",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Özel kıyafetleri korumak için"
  },
  {
    "id": "187",
    "name": "Askılıklar",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Elbise askıları, farklı türler"
  },
  {
    "id": "188",
    "name": "Çekmece Organizer",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "İç çamaşırı, çorap vb. düzenlemek için set"
  },
  {
    "id": "189",
    "name": "Ütü Masası (Küçük)",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Yatak odasında pratik ütü için katlanabilir"
  },
  {
    "id": "190",
    "name": "Giysi Buhar Makinesi (El Tipi)",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Hızlı kırışıklık giderme için"
  },
  {
    "id": "191",
    "name": "Komodin Üstü Düzenleyici",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Takı veya küçük eşyalar için"
  },
  {
    "id": "192",
    "name": "Çekmece İçi Bordo",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Çekmeceleri bölmek için"
  },
  {
    "id": "193",
    "name": "Valiz Seti",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Farklı boyutlarda seyahat valizleri"
  },
  {
    "id": "194",
    "name": "Ayakkabı Kutuları/Organizerler",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Düzenli ayakkabı saklama için"
  },
  {
    "id": "195",
    "name": "Halı/Kilim",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Yatak yanında veya oda ortasında uygun"
  },
  {
    "id": "196",
    "name": "Perdeler",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Tül ve fon, karartma özellikli (isteğe bağlı)"
  },
  {
    "id": "197",
    "name": "Gece Lambası",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Komodin üstü veya duvar tipi"
  },
  {
    "id": "198",
    "name": "Duvar Saat (Yatak Odası)",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Sessiz ve dekoratif"
  },
  {
    "id": "199",
    "name": "Dekoratif Objeler (Yatak Odası)",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Şamdanlar, biblolar vb."
  },
  {
    "id": "200",
    "name": "Tablo (Yatak Odası)",
    "category": "Yatak Odası",
    "price": 0,
    "isBought": false,
    "notes": "Yatak odası temasına uygun"
  },
  {
    "id": "201",
    "name": "Yüz Havlusu",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Misafir ve günlük"
  },
  {
    "id": "202",
    "name": "Ayak Havlusu",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Çeşitli"
  },
  {
    "id": "203",
    "name": "Banyo Havlusu",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Büyük boyutlu, duş havlusu"
  },
  {
    "id": "204",
    "name": "Saç Havlusu",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Misafir ve günlük için"
  },
  {
    "id": "205",
    "name": "Bornoz Takımı",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Kadın ve erkek için"
  },
  {
    "id": "206",
    "name": "Misafir El Havlusu",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Çeşitli"
  },
  {
    "id": "207",
    "name": "Banyo Paspas Takımı",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Tuvalet ve lavabo önüne uygun"
  },
  {
    "id": "208",
    "name": "Banyo Perdeleri",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Dekoratif veya duş alanı için (değiştirilebilir)"
  },
  {
    "id": "209",
    "name": "Tuvalet Fırçası",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Tutacaklı"
  },
  {
    "id": "210",
    "name": "Sabunluk Seti",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Sıvı sabunluk, katı sabunluk, diş fırçalık vb."
  },
  {
    "id": "211",
    "name": "Çöp Kovası",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Pedallı, kapaklı"
  },
  {
    "id": "212",
    "name": "Çamaşır Sepeti",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Kirli çamaşırlar için"
  },
  {
    "id": "213",
    "name": "Vileda",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Temizlik için pratik set"
  },
  {
    "id": "214",
    "name": "Maşrapa",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Banyo temizliği veya yıkama için"
  },
  {
    "id": "215",
    "name": "Çamaşır Selesi",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Çamaşır taşımak için"
  },
  {
    "id": "216",
    "name": "Deterjan Kabı (Toz için)",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Toz deterjan saklama kabı"
  },
  {
    "id": "217",
    "name": "Deterjan Kabı (Yumuşatıcı için)",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Yumuşatıcı saklama kabı"
  },
  {
    "id": "218",
    "name": "Deterjan Kabı (Sıvı Deterjan için)",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Sıvı deterjan saklama kabı"
  },
  {
    "id": "219",
    "name": "Deterjan Kabı (Renkli Bezler için)",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Renkli bezleri ayırmak için"
  },
  {
    "id": "220",
    "name": "Duş Jeli/Şampuan Dağıtıcıları",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Duş düzeni için"
  },
  {
    "id": "221",
    "name": "Havlu Düzenleyici",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Duvar tipi veya raf içi"
  },
  {
    "id": "222",
    "name": "Kapı Arkası Askılığı",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Havlu veya bornoz asmak için"
  },
  {
    "id": "223",
    "name": "Çamaşır Askılığı",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Kurutma veya asma için katlanabilir"
  },
  {
    "id": "224",
    "name": "Dolap İçi Organizerler",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Banyo dolapları için düzenleyici set"
  },
  {
    "id": "225",
    "name": "Banyo Taburesi/Oturak",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Duş veya giyinme kolaylığı için"
  },
  {
    "id": "226",
    "name": "Saç Kurutma Makinesi Tutacağı",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Duvar veya dolap içi"
  },
  {
    "id": "227",
    "name": "Diş Fırçası Organizeri",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Hijyenik saklama için"
  },
  {
    "id": "228",
    "name": "Pamukluk/Kulak Çubuğu Kabı",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Kişisel bakım için"
  },
  {
    "id": "229",
    "name": "Duş Başlığı (Su Tasarruflu)",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Ekonomik ve çevre dostu"
  },
  {
    "id": "230",
    "name": "Kirli Çamaşır Torbası",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Seyahat veya ek depolama için"
  },
  {
    "id": "231",
    "name": "Banyo Terliği",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Kaymaz tabanlı"
  },
  {
    "id": "232",
    "name": "Dekorasyon Tepsileri",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Aksesuar sergileme veya düzenleme için"
  },
  {
    "id": "233",
    "name": "Mum Seti (Banyo)",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Ortam atmosferi için"
  },
  {
    "id": "234",
    "name": "Bitkiler (Banyo)",
    "category": "Banyo",
    "price": 0,
    "isBought": false,
    "notes": "Yapay veya banyo ortamına uygun canlı bitki"
  },
  {
    "id": "235",
    "name": "Temizlik Kovası ve Mop Seti",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Kolay kullanımlı"
  },
  {
    "id": "236",
    "name": "Süpürge ve Faraş Seti",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Pratik ve hafif"
  },
  {
    "id": "237",
    "name": "Temizlik Bezleri",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Mikrofiber, cam bezi, bulaşık bezi"
  },
  {
    "id": "238",
    "name": "Cam Silme Aparatı",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Kolay pencere temizliği için"
  },
  {
    "id": "239",
    "name": "Çöp Kovası (Genel Kullanım)",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Daha büyük, mutfak dışı alanlar için"
  },
  {
    "id": "240",
    "name": "Çamaşır Mandalları ve Sepeti",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Çamaşır kurutma için"
  },
  {
    "id": "241",
    "name": "Toz Alma Aparatları",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Farklı yüzeyler için"
  },
  {
    "id": "242",
    "name": "Yüzey Temizleyiciler (Genel)",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Farklı yüzeyler için temizlik ürünleri"
  },
  {
    "id": "243",
    "name": "Hal/Koltuk Temizleme Spreyi",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Leke çıkarma için"
  },
  {
    "id": "244",
    "name": "Basit Tamir Seti",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Tornavida, pense, çekiç vb."
  },
  {
    "id": "245",
    "name": "Merdiven",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Katlanabilir, yer tasarrufu sağlayan"
  },
  {
    "id": "246",
    "name": "El Feneri",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Acil durumlar için"
  },
  {
    "id": "247",
    "name": "Piller (Çeşitli Boy)",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Kumandalar, saatler vb. için"
  },
  {
    "id": "248",
    "name": "Çoklu Prizler/Uzatma Kabloları",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Yeterli elektrik bağlantısı için"
  },
  {
    "id": "249",
    "name": "Askı Kancaları",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Duvar veya kapı arkası için"
  },
  {
    "id": "250",
    "name": "Kablolar (HDMI, USB vb.)",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Elektronik cihazlar için"
  },
  {
    "id": "251",
    "name": "Bant (Elektrik, Koli vb.)",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Ev tamirleri için"
  },
  {
    "id": "252",
    "name": "Elbise Askıları",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Ahşap veya kaymaz yüzeyli"
  },
  {
    "id": "253",
    "name": "Hurçlar",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Battaniye, yorgan saklamak için"
  },
  {
    "id": "254",
    "name": "Misafir Terlikleri",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "3-4 çift"
  },
  {
    "id": "255",
    "name": "Kuru Temizleme Askılıkları",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Özel kıyafetler için"
  },
  {
    "id": "256",
    "name": "Paspas (Dış Kapı)",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Dış kapı girişi için"
  },
  {
    "id": "257",
    "name": "Yedek Perde",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Beklenmedik durumlar için"
  },
  {
    "id": "258",
    "name": "İlk Yardım Çantası",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Temel sağlık malzemeleri ile"
  },
  {
    "id": "259",
    "name": "Kapı Paspası",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Giriş için"
  },
  {
    "id": "260",
    "name": "Yangın Söndürücü (Küçük Tip)",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Ev güvenliği için"
  },
  {
    "id": "261",
    "name": "Duman/Karbonmonoksit Dedektörü",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Ev güvenliği için"
  },
  {
    "id": "262",
    "name": "Anahtar Kutusu/Askılığı",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Anahtarları düzenlemek için"
  },
  {
    "id": "263",
    "name": "Ayakkabılık/Portmanto",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Giriş düzeni için (isteğe bağlı)"
  },
  {
    "id": "264",
    "name": "Basit Dikiş Seti",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Küçük tamirler için"
  },
  {
    "id": "265",
    "name": "Fotoğraf Albümleri",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Anıları saklamak için"
  },
  {
    "id": "266",
    "name": "Çekmeceli/Kapalı Saklama Kutuları",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Dağınıklığı önlemek için"
  },
  {
    "id": "267",
    "name": "Vantilatör/Isıtıcı (Taşınabilir)",
    "category": "Diğer",
    "price": 0,
    "isBought": false,
    "notes": "Ek ısıtma/soğutma için"
  }
];
