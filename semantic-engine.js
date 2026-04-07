/* =============================================================
   semantic-engine.js
   Motor semántico con Xenova/all-MiniLM-L6-v2 (ONNX q8, ~23MB)
   Funciona directamente en el hilo principal como módulo ES.
   (Multilingüe: el modelo MiniLM-L6-v2 soporta ES + EN nativamente)
============================================================= */

import { pipeline, env } from 'https://github.com/boolekpage/loola.github.io/blob/b69d3406c127da57390efb07b40cfcf5c44a53ef/transformers.min.js';

env.localModelPath = './models/';
env.allowRemoteModels = false;
env.allowLocalModels = true;

const index = [];
let extractor = null;

function cosine(a, b) {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot;
}

async function embed(texts) {
  const input = Array.isArray(texts) ? texts : [texts];
  const out   = await extractor(input, { pooling: 'mean', normalize: true });
  return out.tolist().map(v => new Float32Array(v));
}

function search(queryVec, topK = 3) {
  let best = [], min = -Infinity;
  for (const entry of index) {
    const score = cosine(queryVec, entry.vector);
    if (score > min || best.length < topK) {
      best.push({ ...entry, score });
      best.sort((a, b) => b.score - a.score);
      if (best.length > topK) best.pop();
      min = best[best.length - 1].score;
    }
  }
  return best;
}

export class SemanticEngine {
  async load(dataset, onStatus = () => {}) {
    try {
      // Limpiar índice anterior (permite recarga al cambiar idioma)
      index.length = 0;

      onStatus('status', 'Cargando modelo MiniLM (~23 MB)...');
      extractor = await pipeline(
        'feature-extraction',
        'Xenova/all-MiniLM-L6-v2',
        {
          dtype: 'q8',
          progress_callback: p => {
            if (p.status === 'downloading') {
              const pct = p.loaded && p.total ? Math.round(p.loaded / p.total * 100) : 0;
              onStatus('progress', `Descargando modelo... ${pct}%`, pct);
            }
          }
        }
      );

      onStatus('status', 'Pre-computando embeddings del dataset...');
      const allUtterances = [], allMeta = [];
      for (const entry of dataset) {
        for (const utt of entry.utterances) {
          allUtterances.push(utt);
          allMeta.push({ answer: entry.answers, intent: entry.intent, utterance: utt });
        }
      }

      const BATCH = 32;
      for (let i = 0; i < allUtterances.length; i += BATCH) {
        const batch = allUtterances.slice(i, i + BATCH);
        const vecs  = await embed(batch);
        vecs.forEach((vec, j) => index.push({ vector: vec, ...allMeta[i + j] }));
        const pct = Math.round(((i + batch.length) / allUtterances.length) * 100);
        onStatus('indexing', `Indexando dataset... ${pct}%`, pct);
      }

      onStatus('ready', `MiniLM listo · ${index.length} vectores`);
      return { indexSize: index.length };
    } catch (err) {
      onStatus('error', err.message);
      throw err;
    }
  }

  async add(utterances, answer, intent = 'custom') {
    const vecs = await embed(utterances);
    vecs.forEach((vec, i) => {
      index.push({ vector: vec, answer: [answer], intent, utterance: utterances[i] });
    });
    return { count: utterances.length };
  }

  remove(utterances) {
    const toRemove = new Set(utterances.map(u => u.trim().toLowerCase()));
    let removed = 0;
    for (let i = index.length - 1; i >= 0; i--) {
      if (toRemove.has(index[i].utterance.trim().toLowerCase())) {
        index.splice(i, 1); removed++;
      }
    }
    return { removed };
  }

  async query(text) {
    if (!extractor) return { answer: null, intent: null, score: 0 };
    const [queryVec] = await embed([text]);
    const results    = search(queryVec, 3);
    if (!results.length || results[0].score < 0.25) {
      return { answer: null, intent: null, score: 0 };
    }
    const best    = results[0];
    const answers = Array.isArray(best.answer) ? best.answer : [best.answer];
    const answer  = answers[Math.floor(Math.random() * answers.length)];
    return { answer, intent: best.intent, score: best.score,
             debug: results.map(r => ({ utt: r.utterance, score: r.score.toFixed(3) })) };
  }

  restoreCustom() {
    for (let i = index.length - 1; i >= 0; i--) {
      if (index[i].intent === 'custom') index.splice(i, 1);
    }
  }
}
