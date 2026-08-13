---
title: MongoDB'de embed mi reference mı?
author:
  name: Uhut Sancar
  description: Frontend Developer
  avatar:
    src: /profile.jpg
    alt: Uhut Sancar
date: 2026-04-28
description: Veri modelini uygulamanın sorgu şekline göre kurmak, embed ve reference arasındaki seçim ve bu kararın pagination ile index performansına etkisi.
image: /images/projects-4.avif
minRead: 6
---

MongoDB ile çalışırken en çok zaman kaybettiren karar, veriyi nasıl modelleyeceğim oluyor. İlişkisel veritabanından gelen alışkanlıkla her şeyi ayrı koleksiyonlara bölmek mümkün, ama bu çoğu zaman uygulamanın gerçek sorgu ihtiyacına uymuyor.

Benim çıkış noktam şu: **veri modelini varlıkların birbirine olan ilişkisine göre değil, uygulamanın bu veriyi nasıl okuduğuna göre kuruyorum.**

## Embed'i ne zaman tercih ediyorum

Bir alt veri her zaman ana belgeyle birlikte okunuyorsa ve tek başına sorgulanmıyorsa embed etmek işi kolaylaştırıyor. Bir kullanıcının adres bilgisi, bir ürünün varyant listesi ya da bir ayar objesi bu gruba giriyor.

Kazanç net: tek sorguda tüm veri geliyor, join benzeri bir işleme gerek kalmıyor.

Ama embed edilen dizinin sınırsız büyümediğinden emin olmak gerekiyor. Bir belge sürekli büyüyorsa — mesela bir sohbetin tüm mesajları — bu yaklaşım bir noktada belge boyutu limitine ve gereksiz veri transferine dönüşüyor.

## Reference'ı ne zaman tercih ediyorum

Alt veri kendi başına anlamlıysa, tek başına listeleniyorsa, filtreleniyorsa veya sayfa sayfa okunuyorsa ayrı koleksiyona alıyorum.

Support.io'da mesajları ayrı koleksiyonda tuttum. Bir konuşmanın mesaj sayısının üst sınırı yok, mesajlar tarihe göre sayfalanıyor ve arama yapılabiliyor. Bunları konuşma belgesinin içine gömmek, her konuşma açılışında binlerce mesajı okumak anlamına gelirdi.

Aynı mantıkla, birden fazla yerden referans verilen ve tek noktadan güncellenmesi gereken veriler de reference olarak duruyor. Aksi halde aynı bilgiyi onlarca belgede güncellemek gerekiyor.

## Index ve pagination tarafı

Model kararını verdikten sonra sorgu tarafını ihmal etmemek gerekiyor.

Her sorguda filtrelenen ve sıralanan alanları birlikte düşünüp bileşik index kuruyorum. Sıralama alanı index'in parçası değilse, MongoDB veriyi bellekte sıralamak zorunda kalıyor ve veri büyüdükçe bu maliyet hissediliyor.

Pagination'da `skip` yerine, sıralama yaptığım alan üzerinden imleç mantığıyla ilerlemeyi tercih ediyorum. `skip` küçük veri kümelerinde sorun çıkarmıyor ama derin sayfalarda atlanan tüm kayıtları taramak zorunda kalıyor.

Bir de her sorguda gerçekten ihtiyaç duyduğum alanları seçiyorum. Bir liste ekranında belgenin tamamını çekmek, hem veritabanı hem ağ tarafında bedava değil.

## Karar verirken sorduğum sorular

Bu veri tek başına sorgulanıyor mu? Sınırsız büyüyor mu? Ana belgeyle her zaman birlikte mi okunuyor? Birden fazla yerden mi güncelleniyor?

Bu dört sorunun cevabı, çoğu durumda kararı benim yerime veriyor.
