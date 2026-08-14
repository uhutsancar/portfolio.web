---
title: Velora'da mikroservisleri event bus ile konuşturmak
author:
  name: Uhut Sancar
  description: Frontend Developer
  avatar:
    src: /profile.jpg
    alt: Uhut Sancar
date: 2026-06-12
description: .NET ile kurduğum SellingBuddy servislerinde sipariş ve ödeme akışını RabbitMQ üzerinden event driven hale getirirken servis sınırları, integration event'ler ve kuyruk isimlendirmesi üzerine öğrendiklerim.
image: /images/microservices-event-driven.svg
minRead: 7
---

Velora, .NET ile geliştirdiğim mikroservis tabanlı bir e-ticaret altyapısı. Frontend tarafında çalışırken sürekli tükettiğim API'lerin arkasında ne olduğunu uçtan uca görmek istediğim için başladım.

Projede servisleri ayırmak beklediğimden kolay, onları birbirine bağlamak beklediğimden zor oldu. Asıl mesele servisi bölmek değil; bölündükten sonra aralarındaki iletişimi nasıl kuracağın.

## Servis sınırlarını nereden çizdim

Çözümde altı servis var: Identity, Catalog, Basket, Order, Payment ve Notification. Bunları teknik katmana göre değil, iş sürecine göre ayırdım. Her servisin kendi veritabanı, kendi modeli ve kendi API'si var.

Order tarafında katmanları da ayrı tuttum: `OrderService.Api`, `OrderService.Application`, `OrderService.Domain` ve `OrderService.Infrastructure`. Domain kuralları dışarıya bağımlı olmayan bir yerde duruyor, veri erişimi ve dış entegrasyonlar Infrastructure'a düşüyor.

İstemciler servislere doğrudan gitmiyor. Önde Ocelot ile kurduğum bir API Gateway var; yönlendirme kuralları `ocelot.json` içinde tanımlı. Böylece Blazor istemcisi tek bir adres biliyor, arkadaki servis sayısı değişince istemci tarafı etkilenmiyor.

## Neden senkron çağrı değil

İlk refleks, sipariş oluşturulduğunda Order servisinin Payment servisini doğrudan çağırması oluyor. Bu çalışır ama iki servisi birbirine bağlar: Payment ayaktayken sipariş alınır, değilken alınamaz. Üstelik yarın araya Notification girdiğinde Order'ın kodunu tekrar açman gerekir.

Bu yüzden akışı event üzerinden kurdum. Order bir sipariş başlattığında `OrderStartedIntegrationEvent` yayınlıyor, kimin dinlediğini bilmiyor. Payment bu event'i dinleyip ödemeyi işliyor ve sonucuna göre `OrderPaymentSuccessIntegrationEvent` ya da `OrderPaymentFailedIntegrationEvent` yayınlıyor.

Order da bu sonuç event'lerini dinleyip siparişin durumunu güncelliyor. İki servis birbirinin adresini bilmiyor, sadece ortak bir sözleşmeyi biliyor.

## Event bus'ı soyutlamak

Servislerin doğrudan RabbitMQ ile konuşmasını istemedim. `BuildingBlocks` altında ayrı bir EventBus katmanı kurdum.

`EventBus.Base` sözleşmeleri tutuyor: `IEventBus`, `IIntegrationEventHandler`, `IntegrationEvent` ve abonelikleri tutan `InMemoryEventBusSubscriptionManager`. Servisler yalnızca bu arayüzleri tanıyor.

Somut implementasyonlar ayrı projelerde: `EventBus.RabbitMQ` ve `EventBus.AzureServiceBus`. Hangisinin kullanılacağına `EventBusFactory` karar veriyor; konfigürasyondaki `EventBusType` değerine bakıp ilgili sınıfı üretiyor, varsayılan olarak RabbitMQ dönüyor.

Bu ayrımın pratik faydası şu: mesajlaşma altyapısını değiştirmek tek bir konfigürasyon satırı. Servis kodlarında tek satır değişmiyor.

## Kuyruk isimlendirmesi ve normalizasyon

Burası ilk denemede kafamı en çok karıştıran yerdi. Event sınıfının adı ile kuyruğun adı aynı olmak zorunda değil ve olmaması gerekiyor.

`ProcessEventName` metodu, konfigürasyondaki `DeleteEventPrefix` ve `DeleteEventSuffix` bayraklarına göre sınıf adının başındaki ve sonundaki ekleri temizliyor. `GetSubName` ise temizlenmiş isme `SubscriberClientAppName` değerini ekleyip abonelik adını üretiyor.

Bunun sonucu şu: aynı event'i dinleyen iki farklı servis, aynı exchange'e bağlı ama **ayrı** kuyruklara sahip oluyor. Aynı kuyruğu paylaşsalardı mesajı ikisi de değil, yalnızca biri alırdı. Ödeme başarılı olduğunda hem Order'ın durumu güncellemesi hem Notification'ın bildirim göndermesi gerektiği için bu ayrım kritik.

## RabbitMQ tarafında dikkat ettiklerim

Bağlantıyı `RabbitMQPersistentConnection` içinde ayrı tuttum ve Polly ile üstel geri çekilmeli yeniden deneme ekledim. `BrokerUnreachableException` ya da `SocketException` alındığında her denemede bekleme süresi ikiye katlanıyor. Container'lar ayağa kalkarken RabbitMQ genelde uygulamadan sonra hazır oluyor; bu olmadan servis ilk saniyede patlıyordu.

Yayınlarken mesajı kalıcı işaretliyorum, kuyrukları `durable` açıyorum. Aksi halde broker yeniden başladığında bekleyen mesajlar kayboluyor.

Tüketirken mesajı otomatik onaylatmıyorum. Handler işini bitirdikten sonra `BasicAck` çağırıyorum. Otomatik onayda handler ortasında bir hata olursa mesaj gitmiş oluyor; manuel onayda iş gerçekten tamamlandıysa düşüyor.

Event işlenirken her mesaj için ayrı bir DI scope açılıyor, handler o scope içinden çözülüyor. Uzun ömürlü bir servisin içinde `DbContext` gibi scoped bağımlılıkların birbirine karışmaması için gerekli.

## Altyapıyı ayrı tutmak

`docker-compose-files` altında RabbitMQ, Redis, SQL Server ve Consul için ayrı compose dosyaları duruyor. Hepsini tek dosyaya koymak yerine ayırdım; yalnızca RabbitMQ ile uğraştığım bir günde diğerlerini ayağa kaldırmak zorunda kalmıyorum.

## Geriye kalan

Event driven yaklaşım servisleri gevşek bağlı yapıyor ama karşılığında bir bedel var: akışı tek bir yerden okuyamıyorsun. Bir siparişin neden tamamlanmadığını anlamak için üç servisin logunu birlikte bakmak gerekiyor.

Bu yüzden sıradaki adımlarım, event'lere korelasyon kimliği taşımak ve tüketici tarafını idempotent hale getirmek. Aynı mesaj iki kez düştüğünde sistemin aynı sonucu üretmesi gerekiyor; şu anki halinde bu garanti değil.

Proje devam ediyor, kaynak kodu [GitHub'da](https://github.com/uhutsancar/Velora/tree/main/SellingBuddy) duruyor.
