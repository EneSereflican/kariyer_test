import emailjs from '@emailjs/browser'
import { AREAS, DEPARTMENTS } from '../data/areas'
import { rankAreas } from '../utils/scoring'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

/**
 * Sonuç e-postasını gönderir. Veritabanı kaydı başarılı olduktan sonra çağrılır.
 * E-posta hatası kullanıcı akışını bloklamaz; hata konsola yazılır.
 */
export async function sendResultEmail({ name, email, department, scores }) {
  const ranked = rankAreas(scores)
  const [topCode] = ranked[0] || []
  const secondCode = ranked[1]?.[0]
  const thirdCode = ranked[2]?.[0]

  const scoreSummary = ranked
    .slice(0, 5)
    .map(([code, pts], i) => `${i + 1}. ${AREAS[code]?.name ?? code}: ${pts} puan`)
    .join('\n')

  const params = {
    to_email: email,
    to_name: name,
    department_label: DEPARTMENTS[department] ?? department,
    top_area: AREAS[topCode]?.name ?? topCode ?? '-',
    top_area_desc: AREAS[topCode]?.desc ?? '',
    second_area: AREAS[secondCode]?.name ?? '-',
    third_area: AREAS[thirdCode]?.name ?? '-',
    score_summary: scoreSummary,
  }

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, { publicKey: PUBLIC_KEY })
    return { error: null }
  } catch (err) {
    console.error('EmailJS gönderim hatası:', err)
    return { error: err }
  }
}
