---
title: Nuxt'ta SSR sırasında aynı veriyi iki kez çekmemek
author:
  name: Uhut Sancar
  description: Frontend Developer
  avatar:
    src: /profile.jpg
    alt: Uhut Sancar
date: 2026-06-12
description: useAsyncData, Pinia ve payload mantığını bir arada kullanarak sunucuda çekilen verinin istemcide tekrar istenmesini nasıl engellediğimi anlatıyorum.
image: /projects/projects-3.avif
minRead: 5
---

Nuxt ile SSR'lı bir sayfa geliştirirken en sık karşılaştığım problem şuydu: sayfa sunucuda render ediliyor, veri sunucuda çekiliyor, sayfa tarayıcıya ulaşıyor ve hydration tamamlandığı anda aynı istek bir kez daha gidiyor.

Kullanıcı bunu çoğu zaman fark etmiyor ama sonuç ortada: gereksiz istek, gereksiz veritabanı sorgusu ve ilk etkileşimde kısa bir titreme.

## Sorunun kaynağı

`onMounted` içinde veri çekmek ya da bileşen kurulumunda doğrudan `fetch` çağırmak, sunucu tarafındaki render ile istemci tarafındaki hydration'ı birbirinden bağımsız hale getiriyor. Sunucu veriyi alıyor, HTML'i üretiyor, ama bu verinin istemciye taşınacağı bir kanal yok. İstemci elinde veri olmadığı için baştan başlıyor.

## useAsyncData ile çözüm

Nuxt'un `useAsyncData` ve `useFetch` composable'ları tam olarak bu kanalı kuruyor. Sunucuda çekilen sonuç, sayfanın payload'una gömülüyor ve istemci hydration sırasında isteği tekrarlamak yerine payload'dan okuyor.

Burada kritik nokta **key** parametresi. Aynı veriyi farklı bileşenlerden çağırıyorsanız aynı key'i kullanmanız gerekiyor; aksi halde Nuxt bunları iki ayrı istek olarak değerlendiriyor.

Bir diğer detay `getCachedData`. Sayfalar arasında ileri geri gezinirken aynı listeyi tekrar tekrar çekmemek için, mevcut payload'da veri varsa onu döndürmek çoğu senaryoda yeterli oluyor.

## Pinia'yı işin neresine koyuyorum

Her veriyi store'a taşımıyorum. Yalnızca sayfaya özel bir liste ya da detay verisiyse `useAsyncData` yeterli oluyor.

Store'u şu iki durumda kullanıyorum: veri birden fazla sayfada paylaşılıyorsa, ya da kullanıcı oturumu gibi uygulama ömrü boyunca yaşayan bir durum söz konusuysa. Bu durumda store'u sunucuda dolduruyor, `payloadPlugin` üzerinden istemciye aktarıyorum ve store zaten doluysa yeni istek atmıyorum.

## Pratikte dikkat ettiklerim

Sunucuda çalışan kodun tarayıcıya özel API'lere dokunmadığından emin oluyorum; `window` ya da `localStorage` erişimi varsa bunu `import.meta.client` kontrolüyle ayırıyorum.

Kullanıcının oturumuna bağlı, kişiye özel verileri payload'a gömerken dikkatli davranıyorum. Sayfa bir CDN üzerinde önbelleğe alınacaksa, kişiselleştirilmiş veriyi sunucuda render etmek yerine istemcide çekmek daha doğru oluyor.

Son olarak hata ve yüklenme durumlarını baştan planlıyorum. `useAsyncData` bize `status` ve `error` veriyor; bunları kullanmadan yazılan sayfa, API yavaşladığında ya da 500 döndüğünde kullanıcıya boş bir ekran gösteriyor.

## Sonuç

Nuxt'ta SSR'ın getirdiği asıl kazanç, verinin doğru yerde bir kez çekilmesi. Bunu sağlamak için özel bir kütüphaneye ihtiyaç yok; `useAsyncData`, tutarlı key kullanımı ve store'u yalnızca gerektiğinde devreye almak çoğu projede yeterli oluyor.
