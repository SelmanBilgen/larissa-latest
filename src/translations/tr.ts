export const tr = {
  nav: {
    home: "Ana Sayfa",
    menu: "Menü",
    about: "Hakkımızda",
    contact: "İletişim"
  },
  home: {
    hero: {
      title: "Bereket Larissa",
      subtitle: "Yunanistan'ın Kalbinde Otantik Türk Mutfağı",
      cta: "Menüyü Görüntüle"
    },
    specialties: {
      title: "Özel Yemeklerimiz",
      subtitle: "Şefimizin geleneksel Türk tariflerini Akdeniz etkileriyle harmanlayan özel seçimini keşfedin",
      items: {
        adanaKebab: {
          name: "Adana Kebap",
          description: "Geniş demir şişlere dizilmiş, közde pişirilmiş el yapımı kıyma kuzu eti",
          price: "€11.80"
        },
        iskender: {
          name: "İskender Kebap",
          description: "Pide üzerinde ince dilimlenmiş döner, domates sosu, yoğurt ve tereyağı ile",
          price: "€12.80"
        },
        kuzuSis: {
          name: "Kuzu Şiş",
          description: "Sebze ve otlarla marine edilmiş, şişte pişirilmiş kuzu eti küpleri",
          price: "€13.80"
        }
      }
    },
    testimonials: {
      title: "Misafirlerimiz Ne Diyor",
      description: "Otantik Türk mutfağımızın keyfini çıkaran değerli müşterilerimizin deneyimlerini keşfedin",
      items: [
        {
          name: "Farhan Naqui",
          role: "Düzenli Müşteri",
          text: "Yemekler gerçekten çok iyiydi ve servis de öyleydi. Bereket kebabı keşfedene kadar iyi bir helal restoran yoktu. Yemekleri aldık ve porsiyonlar çok büyük, bizi doyurdu! Her şey makul fiyatlıydı. İçecekler ucuzdu. Atina'da son gecemizdi ve yemeklerle gerçekten unutulmaz kıldılar. Kesinlikle tavsiye ederim!!!!"
        },
        {
          name: "Marko B",
          role: "Yemek Tutkunu",
          text: "Mükemmel ve lezzetli yemekler. Çok samimi personel, özellikle bize servis yapan garson. Çok nazikti. Bu mekan için her türlü tavsiye! :)"
        },
        {
          name: "Πενυ Κουκουναρη",
          role: "Yerel Yemek Blogger'ı",
          text: "Harika yemekler, kusursuz servis, güzel atmosfer, sipariş vermemize gülümseyerek yardımcı oldular, odun fırınında pişirilen kendi ekmekleri çok lezzetli ve sonunda bize çaylarını da ikram ettiler. Kesinlikle tekrar geleceğiz. Ve çok uygun fiyatlar"
        }
      ]
    }
  },
  menu: {
    title: "Menümüz",
    description: "Otantik Türk lezzetlerini deneyimleyin",
    categories: {
      'appetizers-cold': {
        title: "Soğuk Mezeler",
        items: {
          turkishSalsa: {
            name: "Ezme",
            description: "Geleneksel Türk usulü hazırlanmış taze domates, biber ve otlar",
            price: "3.90"
          },
          tzatziki: {
            name: "Cacık",
            description: "Salatalık, sarımsak ve taze otlarla hazırlanmış kremalı yoğurt dip",
            price: "3.90"
          },
          smokedEggplant: {
            name: "Közlenmiş Patlıcan",
            description: "Tahin, sarımsak ve zeytinyağı ile közlenmiş patlıcan püresi",
            price: "4.90"
          },
          hummus: {
            name: "Humus",
            description: "Tahin, zeytinyağı ve Akdeniz baharatları ile hazırlanmış nohut ezmesi",
            price: "4.50"
          },
          veganMeatballs: {
            name: "Çiğ Köfte",
            description: "İnce bulgur, domates salçası, biber salçası ve özel baharat karışımı ile hazırlanmış geleneksel Türk çiğ köftesi",
            price: "6.50"
          }
        }
      },
      'appetizers-hot': {
        title: "Sıcak Başlangıçlar",
        items: {
          lahmacun: {
            name: "Lahmacun",
            description: "İnce hamur üzerine kıyma, sebze ve baharatlarla hazırlanmış",
            price: "3.50"
          },
          halloumi: {
            name: "Hellim",
            description: "Akdeniz otları ile servis edilen ızgara Kıbrıs peyniri",
            price: "5.80"
          },
          crispyCheese: {
            name: "Sigara Böreği",
            description: "Çıtır yufka içinde beyaz peynir ve otlar",
            price: "4.80"
          },
          frenchFries: {
            name: "Patates Kızartması",
            description: "Özel baharatlarla tatlandırılmış çıtır patates",
            price: "3.80"
          },
          patsaSoup: {
            name: "Kelle Paça Çorbası",
            description: "Sarımsaklı ve sirkeli geleneksel Türk çorbası",
            price: "7.50"
          },
          lentilSoup: {
            name: "Mercimek Çorbası",
            description: "Türk baharatları ile hazırlanmış kırmızı mercimek çorbası",
            price: "4.00"
          },
          falafel: {
            name: "Falafel",
            description: "Tahin sosu ile servis edilen çıtır nohut köfteleri",
            price: "5.20"
          },
          croquettes: {
            name: "İçli Köfte",
            description: "ince bulgur hamurunun içinde baharatlı kıyma, soğan ve fıstık dolgusu",
            price: "5.80"
          }
        }
      },
      'salads': {
        title: "Salatalar",
        items: {
          shepherd: {
            name: "Çoban Salatası",
            description: "Doğranmış domates, salatalık, biber, soğan ve zeytinyağı sos",
            price: "6.50"
          },
          prasini: {
            name: "Yeşil Salata",
            description: "Taze marul, taze soğan, dereotu ve otlar limon-zeytinyağı sos ile",
            price: "5.80"
          },
          greek: {
            name: "Yunan Salatası",
            description: "Domates, salatalık, biber, kırmızı soğan, zeytin ve beyaz peynir kekik ile",
            price: "6.80"
          }
        }
      },
      'kebabs': {
        title: "Kebaplar",
        items: {
          adana: {
            name: "Adana Kebap",
            description: "Geniş şişlere sarılmış, el kıyması baharatlı kuzu eti, kömür ateşinde pişirilmiş",
            price: "11.80"
          },
          urfa: {
            name: "Urfa Kebap",
            description: "Özel baharatlar ve otlarla hazırlanmış, az acılı kuzu kıyma kebabı",
            price: "11.80"
          },
          yogurt: {
            name: "Yoğurtlu Kebap",
            description: "Pide üzerinde özel yoğurt soslu kuzu eti parçaları",
            price: "12.80"
          },
          iskender: {
            name: "İskender Kebap",
            description: "Pide üzerinde ince döner dilimleri, domates sosu, yoğurt ve tereyağı",
            price: "12.80"
          },
          doner: {
            name: "Döner",
            description: "Dikey şişte pişirilmiş, ince dilimlenmiş baharatlı et, pilav ile servis edilir",
            price: "11.80"
          },
          beyti: {
            name: "Beyti Kebap",
            description: "Lavaşa sarılı kuzu kıyma, domates sosu ve yoğurt ile servis edilir",
            price: "12.80"
          },
          lambSkewers: {
            name: "Kuzu Şiş",
            description: "Sebzeler ve otlarla marine edilmiş kuzu küpleri",
            price: "13.80"
          },
          chickenSkewers: {
            name: "Tavuk Şiş",
            description: "Sebzelerle birlikte ızgarada pişirilmiş marine tavuk parçaları",
            price: "9.80"
          },
          mixedGrill: {
            name: "Karışık Izgara",
            description: "Kuzu eti, tavuk, köfte ve döner içeren ızgara et seçkisi",
            price: "16.80"
          },
          chickenWings: {
            name: "Tavuk Kanat",
            description: "Özel baharatlarla marine edilmiş, mükemmel pişirilmiş tavuk kanatları",
            price: "9.80"
          },
          meatballs: {
            name: "Köfte",
            description: "Özel baharatlar ve otlarla hazırlanmış geleneksel Türk köftesi, pilav ile servis edilir",
            price: "10.80"
          }
        }
      },
      'pides': {
        title: "Pideler",
        items: {
          cheeseSucuk: {
            name: "Kaşarlı Sucuklu Pide",
            description: "Odun fırınında pişirilmiş, eritilmiş kaşar peyniri ve sucuk ile hazırlanmış tekne pide",
            price: "8.90"
          },
          cheeseMince: {
            name: "Kaşarlı Kıymalı Pide",
            description: "Odun fırınında pişirilmiş, eritilmiş kaşar peyniri ve baharatlı dana kıyma ile hazırlanmış tekne pide",
            price: "9.90"
          },
          cheeseMeat: {
            name: "Kaşarlı Kuşbaşılı Pide",
            description: "Odun fırınında pişirilmiş, eritilmiş kaşar peyniri ve yumuşak kuzu kuşbaşı ile hazırlanmış tekne pide",
            price: "11.00"
          }
        }
      },
      'sandwiches-wraps': {
        title: "Sandviç ve Dürümler",
        items: {
          donerPita: {
            name: "Döner Pide Sandviç",
            description: "Taze pide ekmeği içinde domates, soğan, marul ve özel sos ile ince dilimlenmiş dana döner",
            price: "4.80"
          },
          chickenDoner: {
            name: "Tavuk Döner Sandviç",
            description: "Ekmek arası ince dilimlenmiş tavuk döner, taze sebzeler, yeşillik ve sarımsaklı sos ile",
            price: "4.80"
          },
          kebab: {
            name: "Kebap Sandviç",
            description: "Taze ekmek arası ızgara kuzu kebap, domates, soğan, maydanoz ve tahin sos ile",
            price: "5.40"
          },
          falafelSandwich: {
            name: "Falafel Sandviç",
            description: "Pide ekmeği içinde taze hazırlanmış çıtır falafel, humus, sebzeler ve tahin sos ile",
            price: "4.40"
          },
          donerWrap: {
            name: "Döner Dürüm",
            description: "İnce lavaşa sarılı dana döner, taze sebzeler ve sarımsaklı sos ile",
            price: "5.80"
          }
        }
      },
      'refreshments': {
        title: "İçecekler",
        items: {
          cola: {
            name: "Coca-Cola",
            description: "Klasik Coca-Cola (330ml)",
            price: "1.50"
          },
          colaLight: {
            name: "Coca-Cola Light",
            description: "Şekersiz Coca-Cola (330ml)",
            price: "1.50"
          },
          colaZero: {
            name: "Coca-Cola Zero",
            description: "Sıfır şeker Coca-Cola (330ml)",
            price: "1.50"
          },
          sprite: {
            name: "Sprite",
            description: "Ferahlatıcı limon-lime gazlı içecek (330ml)",
            price: "1.50"
          },
          fantaOrange: {
            name: "Fanta Portakal",
            description: "Portakal aromalı gazlı içecek (330ml)",
            price: "1.50"
          },
          fantaBlue: {
            name: "Fanta Mavi",
            description: "Mavi ahududu aromalı gazlı içecek (330ml)",
            price: "1.50"
          },
          sparklingWater: {
            name: "Maden Suyu (Soda)",
            description: "Doğal mineralli gazlı su (330ml)",
            price: "1.50"
          },
          salgam: {
            name: "Şalgam Suyu",
            description: "Geleneksel fermente mor havuç ve şalgam suyu",
            price: "1.50"
          },
          water500: {
            name: "Su (500ml)",
            description: "Doğal kaynak suyu (500ml)",
            price: "0.50"
          },
          water1L: {
            name: "Su (1L)",
            description: "Doğal kaynak suyu (1L)",
            price: "1.00"
          },
          ayran: {
            name: "Ayran",
            description: "Geleneksel Türk yoğurt içeceği (1l)",
            price: "4.00"
          },
          peachJuice: {
            name: "Şeftali Suyu",
            description: "Doğal şeftali suyu (330ml)",
            price: "1.50"
          },
          sourCherryJuice: {
            name: "Vişne Suyu",
            description: "Geleneksel Türk vişne suyu (330ml)",
            price: "1.50"
          }
        }
      }
    }
  },
  about: {
    title: "Hikayemiz",
    description: "Akdeniz lezzetleriyle bir yolculuk",
    history: {
      title: "Tarihçemiz",
      content: "2018 yılında kurulan Bereket Larissa, genç Türk mutfak tutkunlarından oluşan bir ekibin tutkusu ve yaratıcılığıyla hareket eden canlı bir Türk restoranıdır. İsmi \"Bereket\" (bolluk anlamına gelir) sadece lezzetlerimizin cömertliğini değil, aynı zamanda zengin Türk kültürel mirasını paylaşma taahhüdümüzü de yansıtır.\n\nBereket Larissa'da geleneksel Türk tarifleri modern dokunuşlarla yeni bir hayat buluyor. İster imza yemeğimiz Adana kebabını tadın, ister çeşitli mezeler ve mevsimlik özel yemekleri keşfedin, her yemek özenle ve zamansız mutfak geleneklerine derin bir saygıyla hazırlanır.\n\nBugün, hem Türk hem de Yunan mutfak geleneklerini onurlandırmaya devam ediyor, ortak Akdeniz mirasımızın hikayesini anlatan ve her mutfağı özel kılan benzersiz lezzetleri kutlayan yemekler yaratıyoruz. Hem mirası hem de yeniliği kutlayan bir yolculukta bize katılın, her öğünün Türk mutfağının gerçek özünü deneyimlemenize davet olduğu, sıcaklık, yaratıcılık ve modern olduğu kadar otantik olan enerjik bir ruhla."
    },
    testimonials: {
      title: "Misafirlerimiz Ne Diyor",
      description: "Otantik Türk mutfağımızın keyfini çıkaran değerli müşterilerimizin deneyimlerini keşfedin",
      items: [
        {
          name: "Sarah Johnson",
          role: "Yemek Eleştirmeni",
          content: "Otantik lezzetler ve sıcak atmosfer her ziyareti unutulmaz kılıyor. Adana kebabı sadece muhteşem!",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "Michael Chen",
          role: "Düzenli Müşteri",
          content: "Meze tabağı Türk mutfağına mükemmel bir giriş. Çeşitlilik ve kalite olağanüstü.",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
          name: "Elena Papadopoulos",
          role: "Yerel Yemek Blogger'ı",
          content: "Geleneksel ve modern Türk mutfağının mükemmel bir karışımı. Servis her zaman kusursuz!",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        }
      ]
    },
    team: {
      title: "Ekibimiz",
      description: "Başarımızın arkasındaki insanlarla tanışın",
      members: {
        chef: {
          name: "Mehmet Yılmaz",
          role: "Baş Şef",
          bio: "İstanbul'un en iyi restoranlarında eğitim aldıktan sonra mutfak uzmanlığını Yunanistan'a taşıdı"
        }
      }
    },
    values: {
      title: "Değerlerimiz",
      items: {
        quality: {
          title: "Kalite",
          description: "Sadece en iyi malzemeleri kullanıyoruz"
        },
        tradition: {
          title: "Gelenek",
          description: "Otantik Türk pişirme yöntemlerini koruyoruz"
        },
        hospitality: {
          title: "Misafirperverlik",
          description: "Türk ve Yunan misafirperverlik geleneklerini birleştiriyoruz"
        }
      }
    }
  },
  contact: {
    title: "İletişim",
    subtitle: "Bizimle İletişime Geçin",
    form: {
      title: "Rezervasyon Yapın",
      name: "İsim",
      email: "E-posta",
      phone: "Telefon",
      guestsLabel: "Kişi Sayısı",
      guest: "Kişi",
      guestsText: "Kişi",
      moreGuests: "10+ Kişi",
      date: "Tarih",
      time: "Saat",
      message: "Özel İstekler",
      messagePlaceholder: "Diyet gereksinimleri veya özel durumlar var mı?",
      submit: "Rezervasyon Yap",
      success: "Rezervasyon talebiniz alındı. Onaylamak için sizinle yakında iletişime geçeceğiz.",
      error: "Rezervasyon gönderilirken hata oluştu. Lütfen tekrar deneyin.",
      newReservation: "Yeni rezervasyon yap",
      requiredFields: "* Zorunlu alanlar. Rezervasyonunuzu onaylamak için sizinle iletişime geçeceğiz."
    },
    info: {
      title: "İletişim Bilgileri",
      address: {
        label: "Adres",
        value: "Ioulianou 81, Atina, Yunanistan"
      },
      phone: {
        label: "Telefon",
        value: "+30 210 821 0990"
      },
      email: {
        label: "E-posta",
        value: "info@bereket-larissa.gr"
      }
    },
    hours: {
      title: "Çalışma Saatleri",
      weekdays: "Pazartesi, Çarşamba - Cuma: 13:00 - 23:00",
      weekends: "Cumartesi - Pazar: 13:00 - 23:00",
      tuesday: "Salı: Kapalı"
    }
  },
  footer: {
    about: "Hakkımızda",
    hours: "Çalışma Saatleri",
    social: "Bizi Takip Edin",
    rights: "© 2025 Bereket Larissa. Tüm Hakları Saklıdır",
    links: {
      privacy: "Gizlilik Politikası",
      terms: "Kullanım Koşulları"
    }
  },
  common: {
    loading: "Yükleniyor...",
    error: "Bir hata oluştu",
    notFound: "Sayfa bulunamadı",
    backToHome: "Ana Sayfaya Dön"
  }
};