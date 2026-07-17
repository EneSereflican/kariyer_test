// 26 alt uzmanlık alanı. Kodlar sorularda şık -> alan eşleştirmesinde kullanılıyor.
export const AREAS = {
  AI: {
    name: 'Yapay Zeka / Makine Öğrenmesi',
    desc: 'Model geliştirme, eğitim ve üretime alma. Derin öğrenme mimarileri ve MLOps ile veriden öğrenen sistemler kurarsın.',
  },
  CV: {
    name: 'Bilgisayarla Görü',
    desc: 'Görüntü ve videodan anlam çıkarma: nesne tespiti, segmentasyon, 3B algı. Otonom araçlardan medikal görüntülemeye uzanır.',
  },
  NLP: {
    name: 'Doğal Dil İşleme / LLM',
    desc: 'Dil modelleri, fine-tuning ve RAG mimarileri. Makinelerin insan dilini anlaması ve üretmesi üzerine çalışırsın.',
  },
  DS: {
    name: 'Veri Bilimi & Analitik',
    desc: 'İstatistik, tahminleme ve karar destek. Ham veriyi iş kararlarına dönüştüren analizler üretirsin.',
  },
  DE: {
    name: 'Veri Mühendisliği',
    desc: 'Veri pipeline mimarileri, büyük veri sistemleri, Kafka/Spark. Veriyi güvenilir biçimde toplayan ve akıtan altyapıları kurarsın.',
  },
  BE: {
    name: 'Backend & Dağıtık Sistemler',
    desc: "API'ler, mikroservisler, veritabanı mimarisi ve ölçekleme. Milyonlarca isteğe dayanan sunucu sistemleri tasarlarsın.",
  },
  FE: {
    name: 'Frontend / Web',
    desc: "Kullanıcı arayüzleri, dashboard'lar ve web uygulamaları. İnsanların doğrudan dokunduğu katmanı inşa edersin.",
  },
  MOB: {
    name: 'Mobil Geliştirme',
    desc: 'iOS/Android ve cross-platform uygulamalar. Cebimizdeki cihazlarda çalışan deneyimleri geliştirirsin.',
  },
  DEVOPS: {
    name: 'DevOps / SRE / Cloud',
    desc: 'CI/CD, Kubernetes, gözlemlenebilirlik ve bulut altyapısı. Sistemlerin kesintisiz ve ölçeklenebilir çalışmasını sağlarsın.',
  },
  'SEC-OFF': {
    name: 'Ofansif Güvenlik',
    desc: 'Penetrasyon testi, zafiyet araştırması, red team ve tersine mühendislik. Sistemleri saldırgan gözüyle kırarak güçlendirirsin.',
  },
  'SEC-DEF': {
    name: 'Defansif Güvenlik',
    desc: 'SOC operasyonları, olay müdahalesi (DFIR), güvenlik mimarisi. Saldırıları tespit eden ve durduran tarafta çalışırsın.',
  },
  GAME: {
    name: 'Oyun Geliştirme & Grafik',
    desc: 'Oyun motorları, render pipeline ve gerçek zamanlı grafik. Etkileşimli dünyalar ve görsel deneyimler kurarsın.',
  },
  SYS: {
    name: 'Sistem Programlama',
    desc: 'İşletim sistemi, derleyici, sürücü ve düşük seviye performans. Donanıma en yakın yazılım katmanında çalışırsın.',
  },
  HPC: {
    name: 'Yüksek Başarımlı Hesaplama',
    desc: 'GPU/CUDA programlama, paralel ve bilimsel hesaplama. Hesaplamayı fiziksel limitlere kadar hızlandırırsın.',
  },
  VLSI: {
    name: 'Dijital Çip Tasarımı',
    desc: "RTL tasarımı, ASIC, verification ve tapeout. Milyarlarca transistörlü çiplerin dijital mantığını kurarsın.",
  },
  ANALOG: {
    name: 'Analog / Karışık Sinyal IC',
    desc: 'Amplifikatör, ADC/DAC ve analog ön uç tasarımı. Gerçek dünyanın sürekli sinyallerini silikonda işlersin.',
  },
  FPGA: {
    name: 'FPGA & Dijital Tasarım',
    desc: 'Verilog/VHDL ile programlanabilir donanım, donanım hızlandırma ve SoC tasarımı. Yazılım hızında donanım geliştirirsin.',
  },
  DSP: {
    name: 'Sinyal İşleme',
    desc: 'Filtreleme, kestirim, ses/görüntü/biyosinyal işleme. Gürültünün içinden bilgiyi çıkaran matematiği uygularsın.',
  },
  CTRL: {
    name: 'Kontrol Sistemleri',
    desc: 'PID, MPC, durum uzayı ve sistem dinamiği. Fiziksel sistemlerin istenen davranışı sergilemesini sağlarsın.',
  },
  PE: {
    name: 'Güç Elektroniği',
    desc: 'Dönüştürücüler, inverterlar, motor sürücüler, BMS ve SiC/GaN teknolojileri. Elektrik enerjisini verimli biçimde şekillendirirsin.',
  },
  PWR: {
    name: 'Güç Sistemleri / Enerji',
    desc: 'Şebeke analizi, yük akışı, yenilenebilir entegrasyonu ve SCADA. Enerjinin üretiminden tüketimine tüm sistemi yönetirsin.',
  },
  RF: {
    name: 'RF / Mikrodalga / Anten',
    desc: 'Güç amplifikatörleri, filtreler, anten tasarımı ve EMC/EMI. Elektromanyetik dalgaların mühendisliğini yaparsın.',
  },
  COMM: {
    name: 'Haberleşme Sistemleri',
    desc: 'Fiziksel katman, modülasyon, 5G/6G ve SDR. Bilginin bir noktadan diğerine güvenilir aktarımını tasarlarsın.',
  },
  PCB: {
    name: 'Elektronik Kart Tasarımı',
    desc: 'Şematik, PCB layout, sinyal bütünlüğü ve prototipleme. Fikirleri çalışan elektronik kartlara dönüştürürsün.',
  },
  BIOMED: {
    name: 'Biyomedikal Elektroniği',
    desc: 'Medikal cihazlar, biyosinyal toplama ve regülasyonlu donanım. Mühendisliği doğrudan insan sağlığına uygularsın.',
  },
  EMB: {
    name: 'Gömülü Yazılım / Firmware',
    desc: 'MCU programlama, RTOS, bare-metal geliştirme ve haberleşme protokolleri. Donanımı canlandıran yazılımı yazarsın.',
  },
  IOT: {
    name: 'IoT & Kablosuz Sistemler',
    desc: 'LoRa/BLE/hücresel düğümler ve uçtan uca bağlantılı ürünler. Fiziksel dünyayı internete bağlayan sistemler kurarsın.',
  },
  ROB: {
    name: 'Robotik & Otonom Sistemler',
    desc: 'ROS, hareket planlama, sensör füzyonu ve otonomi. Algılayan, karar veren ve hareket eden makineler geliştirirsin.',
  },
}

export const DEPARTMENTS = {
  CE: 'Bilgisayar Mühendisliği',
  EEE: 'Elektrik-Elektronik Mühendisliği',
}

export const ACADEMIC_STATUSES = [
  'Hazırlık',
  '1. Sınıf',
  '2. Sınıf',
  '3. Sınıf',
  '4. Sınıf',
  'Mezun',
]
