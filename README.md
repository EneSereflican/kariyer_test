# Mühendislik Mikro-Uzmanlık Eğilim Testi

CE ve EEM öğrencileri/mezunları için senaryo tabanlı kariyer eğilim testi.
React + Vite + Tailwind CSS + Supabase + EmailJS.

## Kurulum

```bash
npm install
cp .env.example .env   # anahtarlarını doldur
npm run dev
```

## 1. Supabase Kurulumu

Supabase panelinde **SQL Editor**'a aşağıdaki komutu yapıştır:

```sql
create table public.test_results (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  age int,
  university text not null,
  academic_status text not null,
  department text not null check (department in ('CE', 'EEE')),
  duration_seconds int not null,
  is_valid boolean not null default true,
  scores jsonb not null,
  top_area text not null,
  consent boolean not null default true
);

alter table public.test_results enable row level security;

create policy "anon_insert_only"
  on public.test_results
  for insert
  to anon
  with check (true);
```

RLS açık ve yalnızca `insert` politikası var: anonim istemci kayıt ekleyebilir ama
mevcut kayıtları **okuyamaz** — katılımcı verilerinin tarayıcıdan sızması engellenir.

Ardından **Project Settings → API**'den `URL` ve `anon public` anahtarını `.env`'e yaz.

## 2. EmailJS Kurulumu

1. Bir servis bağla (Gmail vb.) → `VITE_EMAILJS_SERVICE_ID`
2. Yeni şablon oluştur → `VITE_EMAILJS_TEMPLATE_ID`
3. Account → General'dan Public Key → `VITE_EMAILJS_PUBLIC_KEY`
4. Şablonun **To Email** alanına `{{to_email}}` yaz.

Şablonda kullanılabilir değişkenler:

| Değişken | İçerik |
|---|---|
| `{{to_email}}` | Alıcı adresi |
| `{{to_name}}` | Kullanıcının adı |
| `{{department_label}}` | Bölüm adı |
| `{{top_area}}` | En yüksek puanlı alan |
| `{{top_area_desc}}` | Alan açıklaması (1-2 cümle) |
| `{{second_area}}` | İkinci alan |
| `{{third_area}}` | Üçüncü alan |
| `{{score_summary}}` | İlk 5 alanın puan dökümü (satır satır) |

Örnek şablon gövdesi:

```
Merhaba {{to_name}},

{{department_label}} eğilim testi sonucun hazır.

En güçlü eğilimin: {{top_area}}
{{top_area_desc}}

Onu izleyen alanlar: {{second_area}} ve {{third_area}}

Puan dökümü:
{{score_summary}}

Katılımın için teşekkürler.
```

## 3. Proje Yapısı

```
src/
  App.jsx                    Ekran akışı, kronometre, kayıt+e-posta orkestrasyonu
  components/
    WelcomeForm.jsx          Karşılama formu (validasyonlu)
    InfoScreen.jsx           Test öncesi uyarı + Teste Başla
    TestScreen.jsx           Soru navigasyonu, ilerleme, sabit alt bar
    QuestionCard.jsx         Dokunulabilir şık kartları (1-3 seçim)
    ResultScreen.jsx         Başarı / hata ekranı
  data/
    areas.js                 26 alt uzmanlık alanı (ad + açıklama)
    questions.js             14 senaryo sorusu, şık-alan eşleştirmeleri, bölüm filtresi
  lib/
    supabase.js              Supabase istemcisi ve insert
    email.js                 EmailJS gönderimi (top alan hesabıyla)
  utils/
    scoring.js               Puanlama: 1 şık +1, 2 aynı alan +3, 3 aynı alan +5; ikincil +0.5
```

## 4. Kural Özeti

- Her soruda en az 1, en fazla 3 şık (4. seçim engellenir, kart pasifleşir).
- Her şıkkın altında jargon bilmeyenler için tek satırlık sade Türkçe açıklama (`hint` alanı)
  gösterilir; test ekranındaki "Sade açıklamalar" düğmesiyle kapatılabilir. Bazı sorularda
  soru seviyesinde de açıklama vardır (örn. S8 "holter", S12 "PLC").
- CE 12 soru görür (S9-GES ve S10-5G hariç), EEM 11 soru görür (S3, S5, S12 hariç).
- Puanlama: bir soruda aynı alana birincil katkı veren 1 şık → +1, 2 şık → +3, 3 şık → +5.
  İkincil alan eşleşmeleri yakınsamaya girmeden şık başına +0.5 ekler.
- Süre "Teste Başla" ile başlar; 60 sn altı `is_valid=false` olarak kaydedilir (kayıt yine tutulur).
- E-posta, Supabase kaydı başarılı olduktan sonra gönderilir. E-posta hatası kullanıcı akışını
  bloklamaz (veri kayıtlı); hata konsola yazılır.

## 5. Dağıtım Notları

- Vercel/Netlify'da env değişkenlerini panelden ekle (`VITE_` öneki şart).
- `anon` anahtarı istemcide görünür olması normaldir; güvenlik RLS politikasıyla sağlanır.
