---
title: Support.io'da Socket.IO ile canlı sohbet altyapısı
author:
  name: Uhut Sancar
  description: Frontend Developer
  avatar:
    src: /profile.jpg
    alt: Uhut Sancar
date: 2026-03-10
description: Tek satır kodla siteye gömülen bir canlı destek sistemini geliştirirken oda yönetimi, yeniden bağlanma ve mesaj sırası konusunda öğrendiklerim.
image: /projects/projects-1.avif
minRead: 6
---

Support.io, bir web sitesine tek satır kodla eklenen SaaS bir canlı destek sistemi. Ziyaretçi widget üzerinden yazıyor, destek ekibi yönetici panelinden yanıtlıyor, aynı panelden birden fazla site yönetilebiliyor.

Gerçek zamanlı tarafı Socket.IO ile kurdum. Geliştirirken en çok uğraştığım şey mesajın iletilmesi değil; bağlantı koptuğunda, sekme arka plana atıldığında ya da aynı kullanıcı iki cihazdan bağlandığında sistemin tutarlı kalmasıydı.

## Oda yapısı

Her konuşma için ayrı bir oda kullandım. Ziyaretçi bağlandığında kendi konuşma odasına katılıyor; destek ekibindeki kullanıcı ise ait olduğu sitenin tüm konuşmalarını dinleyebilecek şekilde ek bir odaya alınıyor.

Bu ayrım önemliydi çünkü bir ziyaretçinin başka bir ziyaretçinin mesajını görmemesi gerekiyor. Yayını "herkese gönder, istemcide filtrele" mantığıyla yapmak kolay görünüyor ama güvenlik açısından kabul edilebilir değil.

## Kimlik doğrulama

Socket bağlantısını kurarken JWT'yi handshake aşamasında doğruluyorum. Token geçersizse bağlantı hiç kurulmuyor.

Destek ekibi tarafında ek bir kontrol daha var: kullanıcının katılmak istediği odanın, gerçekten yetkili olduğu siteye ait olup olmadığını sunucuda kontrol ediyorum. İstemciden gelen oda bilgisine güvenmek, panelin tamamını açık hale getirirdi.

## Mesaj sırası ve yeniden bağlanma

Socket bağlantısı kopup yeniden kurulduğunda, kopma süresince gönderilen mesajlar istemciye ulaşmıyor. Bunu çözmek için mesajları yalnızca socket üzerinden akıtmak yerine kalıcı olarak veritabanına yazıyorum; istemci yeniden bağlandığında elindeki son mesajın zaman damgasından sonrasını REST üzerinden çekiyor.

Yani socket "anlık iletim" için, veritabanı ise "gerçeğin kaynağı" olarak çalışıyor. Bu ayrımı baştan kurmak, sonradan ortaya çıkan pek çok tutarsızlığı engelledi.

Kullanıcı deneyimi tarafında ise mesajı gönderirken hemen ekranda gösterip, sunucudan onay geldiğinde durumunu güncelliyorum. Onay gelmezse mesaj "gönderilemedi" durumunda kalıyor ve tekrar denenebiliyor.

## Widget tarafındaki kısıtlar

Widget başka birinin sitesinde çalıştığı için sayfanın stillerinden etkilenmemesi gerekiyordu. Stil izolasyonu ve z-index yönetimi, gerçek zamanlı taraftan daha fazla vaktimi aldı.

Mobil tarafta klavye açıldığında sohbet alanının kayması, safe area ve viewport yüksekliği gibi konular da ayrı bir başlıktı. Bir widget'ın masaüstünde düzgün görünmesi, mobilde çalıştığı anlamına gelmiyor.

## Çıkardığım ders

Gerçek zamanlı bir özellik geliştirirken asıl iş, mesajı iletmek değil; bağlantının koptuğu, geciktiği ya da iki kez kurulduğu durumları planlamak. Bu senaryoları sonradan eklemeye çalışmak, baştan tasarlamaktan çok daha zor oluyor.
