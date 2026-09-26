/* =====================================================================
   RiseONE — RECURSOS E COMPORTAMENTOS VINDOS DO ROOTIFYONE ("Controle dos apps")
   ---------------------------------------------------------------------
   O RootifyONE publica, no repositório solverone-dados (mesma origem):
     recursos/global.json    → vale para todos os apps
     recursos/rise-one.json  → { recursos: { id: { ligado } }, comportamentos: { id: valor } }
   (o app vence o global). Este arquivo lê os dois ao abrir — rede primeiro
   (no-cache, 4 s), senão a cópia guardada — e oferece ao resto do código:
     centralLigado('videos-youtube', true)    → feature flag, com padrão
     centralValor('descanso.padraoSeg', 60)   → comportamento (remote config), com padrão
     evento 'riseone:central' quando algo novo chegou da rede
   Recurso que o app não conhece é ignorado; sem arquivo, valem os padrões
   do código. O CONTEÚDO dos aparelhos (texto, foto, vídeos) já é lido em
   contBase() no index.html (conteudo/rise-one/aparelhos.json).
   Recursos já declarados no RootifyONE para o RiseONE: videos-youtube,
   fotos-centrais, espelho, modo-tv; comportamentos: descanso.padraoSeg,
   videos.maxPorAparelho. Para obedecer, basta consultar nos pontos certos.
   ===================================================================== */
(function (raiz) {
  'use strict';
  var d = document, APP = 'rise-one', CHAVE = 'riseone.central.', mem = {};
  function base() { return location.origin + '/solverone-dados/'; }
  function guardado(nome) { if (mem[nome]) return mem[nome]; try { return JSON.parse(localStorage.getItem(CHAVE + nome) || 'null'); } catch (e) { return null; } }
  function ler(nome) {
    var ctrl = raiz.AbortController ? new AbortController() : null, prazo = setTimeout(function () { if (ctrl) ctrl.abort(); }, 4000);
    return fetch(base() + nome, { cache: 'no-cache', signal: ctrl ? ctrl.signal : undefined }).then(function (r) {
      clearTimeout(prazo); return r.ok ? r.json() : null;
    }).then(function (j) {
      if (j) {
        var antes = JSON.stringify(guardado(nome) || null);
        mem[nome] = j; try { localStorage.setItem(CHAVE + nome, JSON.stringify(j)); } catch (e) {}
        if (antes !== JSON.stringify(j)) { try { d.dispatchEvent(new CustomEvent('riseone:central', { detail: { arquivo: nome } })); } catch (e2) {} }
      }
      return j || guardado(nome);
    }).catch(function () { clearTimeout(prazo); return guardado(nome); });
  }
  function recursos() {
    var g = guardado('recursos/global.json') || {}, a = guardado('recursos/' + APP + '.json') || {};
    return { recursos: Object.assign({}, g.recursos || {}, a.recursos || {}), comportamentos: Object.assign({}, g.comportamentos || {}, a.comportamentos || {}) };
  }
  raiz.centralLigado = function (id, padrao) { var r = recursos().recursos[id]; return r && typeof r.ligado === 'boolean' ? r.ligado : (padrao !== false); };
  raiz.centralValor = function (id, padrao) { var c = recursos().comportamentos; return c[id] === undefined ? padrao : c[id]; };
  raiz.centralRecursos = recursos;
  ['recursos/global.json', 'recursos/' + APP + '.json'].forEach(ler);
})(window);
