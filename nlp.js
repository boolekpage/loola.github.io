/* =============================================================
   nlp.js — Bridge bilingüe entre app.js y SemanticEngine
   API pública:
     nlp.load(dataset)
     nlp.train(question, answer)  → async
     nlp.process(query)           → async Promise<{answer,intent,score}>
     nlp.restore()
     nlp.normalize(text)
     nlp.tokenize(text)
     nlp.cosineSimilarity(a,b)
     nlp.keywordMatch(a,b)
     nlp.ready                    → Promise
============================================================= */

import { SemanticEngine } from './semantic-engine.js';

class NLPEngine {
  constructor() {
    this._engine       = new SemanticEngine();
    this._readyResolve = null;
    this.ready         = new Promise(res => { this._readyResolve = res; });
    this.modelReady    = false;
    this.fallback      = null;

    this.stopwords = new Set([
      'el','la','los','las','un','una','unos','unas','de','del','al','en',
      'con','por','para','que','qué','es','son','no','si','sí','me','te',
      'se','le','yo','tú','él','y','o','a','e','muy','más','tan','como',
      'cuando','donde','quién','cuál','cuánto',
      'the','a','an','is','are','was','were','be','been','being',
      'i','you','he','she','it','we','they','my','your','his','her',
      'and','or','but','if','in','on','at','to','for','of','with',
      'this','that','these','those','do','did','have','has','had',
      'not','so','as','by','from','up','about','into','through'
    ]);

    this.onStatus = null;
  }

  load(dataset) { 
    this._engine.load(dataset, (type, text, pct) => {
      if (type === 'status') {
        this._emit('loading', text);
      } else if (type === 'progress') {
        this._emit('loading', text, pct);
      } else if (type === 'indexing') {
        this._emit('indexing', text, pct);
      } else if (type === 'ready') {
        this.modelReady = true;
        this._emit('ready', text);
        this._readyResolve();
      } else if (type === 'error') {
        this._emit('error', text);
        this._initFallback(window._DATASET || []);
      }
    }).catch(err => {
      console.warn('[NLP] SemanticEngine failed, using Jaccard fallback:', err.message);
      this._emit('error', 'Using fallback mode');
      this._initFallback(window._DATASET || dataset || []);
    });
  }

  _emit(state, text, pct) {
    if (this.onStatus) this.onStatus(state, text, pct);
  }

  _initFallback(dataset) {
    this.fallback   = new NLPFallback(dataset);
    this.modelReady = true;
    this._readyResolve();
  }

  async train(question, answer) {
    if (!question || !answer) return false;
    const utterances = question.split('|').map(v => v.trim()).filter(Boolean);
    if (this.fallback) {
      utterances.forEach(u => this.fallback.train(u, answer));
      return true;
    }
    await this.ready;
    try {
      await this._engine.add(utterances, answer, 'custom');
      return true;
    } catch (e) {
      console.warn('[NLP] train error:', e);
      return false;
    }
  }

  async process(query) {
    if (this.fallback) return this.fallback.process(query);
    if (!this.modelReady) return { answer: null, intent: null, score: 0 };
    await this.ready;
    try {
      return await this._engine.query(query);
    } catch (e) {
      console.warn('[NLP] process error:', e);
      return { answer: null, intent: null, score: 0 };
    }
  }

  async removeCustom(utterances) {
    if (this.fallback) return;
    this._engine.remove(utterances);
  }

  restore() {
    if (this.fallback) { this.fallback.restore(); return; }
    this._engine.restoreCustom();
    try { localStorage.removeItem('nlp_custom'); } catch(e) {}
  }

  normalize(text) {
    return text.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[¿?¡!.,;:()\-"']/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }

  tokenize(text) {
    return this.normalize(text).split(' ')
      .filter(t => t.length > 1 && !this.stopwords.has(t));
  }

  cosineSimilarity(a, b) {
    const setA = new Set(a), setB = new Set(b);
    const inter = [...setA].filter(t => setB.has(t)).length;
    if (!inter) return 0;
    return inter / (Math.sqrt(setA.size) * Math.sqrt(setB.size));
  }

  keywordMatch(qTokens, uTokens) {
    const qSet  = new Set(qTokens);
    const uLong = uTokens.filter(t => t.length >= 4);
    if (!uLong.length) return 0;
    return uLong.filter(t => qSet.has(t)).length / uLong.length;
  }
}

class NLPFallback {
  constructor(dataset) {
    this.intents = dataset.map(e => ({
      intent: e.intent, answers: e.answers, utterances: e.utterances,
    }));
    this.custom = [];
  }
  _norm(t) {
    return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/[¿?¡!.,;:()\-"']/g,' ').replace(/\s+/g,' ').trim();
  }
  _tok(t) {
    const sw = new Set(['el','la','de','en','con','que','es','no','si','me','te','se','y','o','a',
                        'the','is','in','of','to','and','i','you','it']);
    return this._norm(t).split(' ').filter(x => x.length > 1 && !sw.has(x));
  }
  _cos(a, b) {
    const sa = new Set(a), sb = new Set(b);
    const inter = [...sa].filter(x => sb.has(x)).length;
    return inter ? inter / Math.sqrt(sa.size * sb.size) : 0;
  }
  train(question, answer) {
    this.custom.push({ tokens: this._tok(question), answer: [answer], intent: 'custom' });
  }
  process(query) {
    const qt = this._tok(query);
    let best = null, bestScore = 0;
    for (const ci of this.custom) {
      const s = this._cos(qt, ci.tokens);
      if (s > bestScore) { bestScore = s; best = ci; }
    }
    if (bestScore > 0.3 && best) {
      return { answer: best.answer[0], intent: best.intent, score: bestScore };
    }
    for (const intent of this.intents) {
      for (const utt of intent.utterances) {
        const s = this._cos(qt, this._tok(utt));
        if (s > bestScore) { bestScore = s; best = intent; }
      }
    }
    if (bestScore > 0.18 && best) {
      const ans = best.answers;
      return { answer: ans[Math.floor(Math.random() * ans.length)], intent: best.intent, score: bestScore };
    }
    return { answer: null, intent: null, score: 0 };
  }
  restore() { this.custom = []; }
}

export { NLPEngine };
window.NLPEngine = NLPEngine;
