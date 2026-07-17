// Puanlama kuralı:
// Bir soruda seçilen şıkların BİRİNCİL alanları gruplanır.
// Bir alana birincil olarak katkı veren seçili şık sayısına göre puan:
//   1 şık -> +1 puan
//   2 şık -> +3 puan (yakınsama)
//   3 şık -> +5 puan (güçlü yakınsama)
// İkincil alanlar yakınsama hesabına girmez; her seçili şık için düz +0.5 ekler.

const CONVERGENCE_POINTS = { 1: 1, 2: 3, 3: 5 }
const SECONDARY_WEIGHT = 0.5

/**
 * @param {Array} questions - gösterilen sorular
 * @param {Object} answers - { [questionId]: Set|Array of optionId }
 * @returns {Object} { [areaCode]: totalScore }
 */
export function computeScores(questions, answers) {
  const scores = {}
  const add = (area, pts) => {
    scores[area] = (scores[area] || 0) + pts
  }

  for (const q of questions) {
    const selectedIds = Array.from(answers[q.id] || [])
    if (selectedIds.length === 0) continue

    const selectedOptions = q.options.filter((o) => selectedIds.includes(o.id))

    // Birincil alanlar: yakınsama kuralı
    const primaryCounts = {}
    for (const opt of selectedOptions) {
      primaryCounts[opt.primary] = (primaryCounts[opt.primary] || 0) + 1
    }
    for (const [area, count] of Object.entries(primaryCounts)) {
      add(area, CONVERGENCE_POINTS[count] ?? CONVERGENCE_POINTS[3])
    }

    // İkincil alanlar: düz katkı
    for (const opt of selectedOptions) {
      if (opt.secondary) add(opt.secondary, SECONDARY_WEIGHT)
    }
  }

  // Kayan nokta artıklarını temizle
  for (const k of Object.keys(scores)) {
    scores[k] = Math.round(scores[k] * 100) / 100
  }
  return scores
}

/** Puanlara göre azalan sıralı [areaCode, score] listesi döner. */
export function rankAreas(scores) {
  return Object.entries(scores).sort((a, b) => b[1] - a[1])
}
