
# Tourism App

Bu proje, turizm uygulaması için geliştirilmiş bir Next.js uygulamasıdır.

## Kurulum

Proje bağımlılıklarını yükleyin ve daha sonra npm run dev komutu ile projeyi çalıştırın.

```bash
proje bağımlılıklarını yükle -> npm install 

database için json-server yükle -> npm i json-server

database ayağa kaldır -> json-server --watch db.json --port 8000

projeyi ayağa kaldır -> npm run dev
# or
projeyi ayağa kaldır -> yarn dev
# or
projeyi ayağa kaldır -> pnpm dev
# or
projeyi ayağa kaldır -> bun dev
```

## Bazı Kullanılan Teknoloji ve Eklentiler

```bash
Firebase -> auth / login işlemleri 

json-server -> backend işlemleri 

formik -> Form yönetimi  

yup -> Veri doğrulama işlemleri kullanılır

react-redux -> state yönetimi 

react-credit-cards -> kredi kartı arayüzü

react-datepicker -> Tarih Seçimi

```

## İçerik Olan Olan Tarihler ;

```bash
!! JSON-SERVER ÇALIŞTIRMAYI UNUTMAYIN LÜTFEN  
-json-server --watch db.json --port 8000



1- 
"From": "Ankara",
"To": "Antalya",
"Date": "17/01/2024",


2-
"From": "Ankara",
"To": "Istanbul",
"Date": "16/01/2024",


3-
"From": "Ankara",
"To": "Istanbul",
"Date": "16/01/2024",

4-
"From": "Izmir",
"To": "Antalya",
"Date": "16/01/2024",

5-
"From": "Antalya",
"To": "Izmir",
"Date": "16/01/2024",
```


## Uygulama Görselleri ;

Kayıt Olma Ekranı ; 
![signup.png](public%2Fassets%2Fimages%2Fscreenshoots%2Fsignup.png)

Kullanıcı Giriş Ekranı
![login.png](public%2Fassets%2Fimages%2Fscreenshoots%2Flogin.png)

Anasayfa
![homepage.png](public%2Fassets%2Fimages%2Fscreenshoots%2Fhomepage.png)

Filtreleme Sayfası
![filterpage.png](public%2Fassets%2Fimages%2Fscreenshoots%2Ffilterpage.png)

Detay Sayfası
![detailpage.png](public%2Fassets%2Fimages%2Fscreenshoots%2Fdetailpage.png)

Koltuk Seçimi
![selectSeat.png](public%2Fassets%2Fimages%2Fscreenshoots%2FselectSeat.png)

Bilet Detayları ve Ödeme Sayfası
![paymentpage.png](public%2Fassets%2Fimages%2Fscreenshoots%2Fpaymentpage.png)

Ödeme Tamamlandı Ekranı
![successPage.png](public%2Fassets%2Fimages%2Fscreenshoots%2FsuccessPage.png)