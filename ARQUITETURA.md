# RiseONE — como o app é feito por dentro

Leia isto antes de mexer em qualquer arquivo. Vale para pessoas e para assistentes de IA.

## Em uma frase

Um site estático no GitHub Pages: **um arquivo só de código** (`index.html`, com HTML, CSS e JavaScript
dentro) e alguns arquivos de apoio soltos na raiz. Sem servidor, sem framework, sem passo de build.
Tudo roda no navegador da pessoa e os dados ficam no aparelho dela (`localStorage`, chave `riseone.v1`).

## O que cada arquivo faz

| Arquivo | Para que serve | Pode mexer? |
|---|---|---|
| `index.html` | O app inteiro: telas, textos PT/EN, lógica, estilos | Sim — é aqui que tudo acontece |
| `sw.js` | Faz o app abrir sem internet e mostrar avisos. **Suba `CACHE_VER` a cada versão publicada** | Só o número da versão e a lista `CORE` |
| `manifest.json` | Nome, ícones e atalhos de quando o app é instalado no celular | Raramente |
| `anuncios.json` | Lista dos anúncios da faixa do topo e do pop-up (os outros apps do portfólio) | Sim, é só uma lista |
| `servicos.json` | Quem pode usar cada recurso (Visitante / Membro / Premium). O admin gera este arquivo dentro do app | Gerado pelo app; pode editar à mão |
| `icone-192.png`, `icone-512.png`, `icone-maskable.png` | Ícones do app | Trocar por outros do mesmo tamanho |
| `fundo.jpg`, `fundo-celular.jpg`, `fundo-claro.jpg`, `fundo-claro-celular.jpg` | Arte de fundo (escuro/claro, computador/celular) | Trocar por outras do mesmo formato |
| `cid.json` | Lista de consulta de códigos CID-10 do aparelho musculoesquelético. **Lista inicial** — confira na tabela oficial. TUSS fica vazio de propósito | Sim, é uma lista |
| `versoes.json` | O que mudou em cada versão, em PT e EN. O app desenha a tela "Novidades" a partir dele | Sim, a cada versão |
| `LICENSE` | Licença MIT mais o aviso de que o app é orientativo e não substitui profissional | Raramente |
| `CREDITOS.md` | De onde vem cada coisa de fora e sob qual licença | A cada dependência nova |
| `TESTE-VOZ-riseone.html` | Página avulsa para testar voz e comando de voz no aparelho | Sim |
| `ABRIR-TESTE-riseone.command` / `.bat` | Atalho que serve a pasta em `http://localhost:8123` e abre a página de teste | Não |
| `fotos-exercicios.jpg` | **Opcional.** Mosaico 6×6 com fotos das posições de alguns exercícios. Sem ele, o app mostra só o boneco animado | Sim, mas mantendo a ordem dos quadros (ver `PHOTOS` no código) |
| `ajuda-botao.png`, `ajuda-icone.png` | **Opcionais.** Ícone Assist ONE do botão de ajuda. Sem eles, o app usa um ícone desenhado em SVG | Colocar os arquivos do portfólio |
| `TESTE-riseone.html` | Página de teste das diretrizes (abre no mesmo endereço do app) | Sim |
| `personal/<id>.png` | Foto de cada personal trainer (`knox.png`, `musclemill.png`, incluídas). Sem o arquivo, o app desenha um avatar | Sim, um por personal |
| `aparelhos/<id>.png` | Desenho sem fundo de cada aparelho (ids em `EQUIP`; 20 incluídos, feitos de fotos com remoção de fundo). Sem o arquivo, o app usa o desenho em linha | Sim, um por aparelho |
| `README.md`, `ARQUITETURA.md` | Estes textos | Sim |
| `.github/workflows/static.yml` | Publica o site a cada upload. **Nunca apagar a pasta `.github`** | Não |

## Como o `index.html` está organizado

O código é dividido em seções numeradas, marcadas por comentários como `/* ---------- 14. TELA: INICIO ---------- */`.
Procure pelo número para ir direto ao assunto.

- **0. Ícones** — `I("nome")` devolve um ícone SVG. Todos os ícones do app vêm daqui.
- **1. Dicionário PT/EN** — `L` tem todos os textos: `"chave":["Português","English"]`. `t("chave")` devolve no idioma atual.
  A seção **1b** tem os textos acrescentados na versão 3 (podem sobrescrever os antigos).
- **2 a 5. Conteúdo** — músculos (3 níveis de nome), objetivos em linguagem simples, aparelhos, biblioteca de exercícios (`X(...)`).
- **6 e 7. Datas e armazenamento** — `fmtDate` (PT `17/Set/2026`, EN `Sep/17/2026`), `ROOT` (tudo que está guardado), `STATE` (dados da pessoa logada).
- **11 a 13. Navegação** — `SECTIONS` (as 5 áreas), `ROUTES` (as telas), `go(tela, subtela)`, `render()`.
- **14 a 30. Telas** — cada tela é `SCREENS.nome = function(){ return html }` mais `SCREENS.nome_after` que liga os botões.
- **31. Conta** — `entrar(sessao)` e `sair()` são as únicas funções que mudam quem está logado. Senha com PBKDF2.
- **39. Ficha de saúde** — os 4 passos da anamnese, usados também pelo guia "Primeiros passos".
- **40 a 43. Animações e espelho** — bonecos articulados e câmera com detecção de postura.
  Os 80 movimentos vivem em `ANIM[id] = {a, b, v2, eq, plano, ...}`: `a` é a posição de início, `b` a de
  fim, e `v2` guarda as mesmas duas posições vistas de lado. `A(id, a, b)` cria o desenho e
  `AV(id, plano, a, b)` acrescenta a segunda vista. Cada posição é um mapa de juntas
  (`h` cabeça, `n` pescoço, `s` ombro, `e`/`w` cotovelo e punho, `p` quadril, `k`/`f` joelho e pé, mais
  `e2`/`w2`/`k2`/`f2` do outro lado). `frameAt(d, t, vista)` interpola entre as duas, e
  `animSVG(id, {view, frame, static})` devolve o SVG. O desenho é feito pela tabela de ossos `OSSOS`,
  que dá a espessura de cada segmento: o traço é pintado duas vezes (uma borda mais grossa por baixo,
  o corpo por cima), mais a cabeça com aro, os tênis e a sombra de contato.
  **Regra da segunda vista:** andar 90° ao redor de alguém não muda a altura de nenhuma junta, só troca
  esquerda/direita por frente/trás. Por isso a vista de lado copia os `y` da vista de frente e recalcula
  só o `x` — nenhuma altura é inventada, e um teste automático compara os dois desenhos junta por junta.
  Isso vale para quem está **em pé**. Deitado, reclinado ou sentado no chão, a segunda vista é vista da
  cabeça ou dos pés: o eixo de cima-embaixo do desenho passa a ser a largura do corpo, e esses foram
  desenhados um a um (o teste `t18` cobra a regra só onde ela se aplica).
  **Os aparelhos** (`js_equip.txt`) são calculados a partir das mesmas juntas, não em coordenadas
  fixas: `eqBanco` nasce da linha ombro→quadril, `eqAssento` do quadril, `eqPeso` da direção do
  antebraço, `eqPolia` liga a mão (ou o tornozelo, via `cabo`) à roldana. O desenho sai em duas
  camadas: o aparelho atrás do corpo (`.aeqg`) e o peso na mão à frente dele (`.aeqf2`).
- **44 e 45. Avisos** — tipos de aviso, horário silencioso (segura e solta depois), instalação.
- **46. Anúncios** — faixa em rolagem e pop-up, conforme a diretriz do portfólio.
- **47 e 48. Níveis e administrador** — `canUse(recurso)` decide se a pessoa pode usar algo; `servicos.json`; "ver o app como".
- **50 e 51. Central de ajuda** — motor do tutorial (`TOUR`), motor de guias (`wizDef`/`wizRun`), busca (`GLOSS`) e ajuda por tela (`HELP`).
- **52. Conteúdo extra** — exercícios e movimentos vindos de fichas reais, modelos de treino (`TEMPLATES`) e mapa das fotos (`PHOTOS`).
- **53. Conferência de versão** — pergunta ao site qual versão está publicada (lê o `CACHE_VER` do `sw.js`)
  e oferece "Atualizar agora", que limpa caches e service worker e recarrega.
- **11b. Gaveta lateral e favoritos** — `DRAWER_GROUPS` (o que aparece no ☰), `openDrawer`/`closeDrawer`,
  `favs()`/`setFavs()` (a barra de baixo do celular).
- **56. Privacidade** — `consent()`, `askConsent(finalidade, aoAceitar)`, `disclaimerModal()` (o "Estou ciente"),
  `privacyScreen()`. `gateDisclaimer(next)` é a porta de entrada: o aviso vem antes de qualquer outra janela.
- **57 a 59. Dor e fisioterapia** — `ZONES` (regiões do corpo), `CONDS` (situações com o código CID-10,
  exercícios e alongamentos), `painSVG(vista, selecionada)`, e a tabela `cid.json` com `cidLoad`/`cidClear`.
- **60. Câmera** — `startCam2` (zoom, temporizador, inverter, borrar o fundo), `sharpness()` (mede o foco;
  abaixo de `BLUR_MIN` o app pede outra foto) e `projectVideo` (janelinha flutuante / tela cheia).
- **61. Rótulo** — `parseRotulo` (ingredientes, marca, aditivos INS, selos, "alto em"), `ragRotulo`
  (o semáforo, com o critério escrito na tela) e `rotuloCard`.
- **62 e 63. Exames e carteirinha** — `INDICADORES` (só nomes e unidades; faixa de referência **nunca**
  é inventada), `parseExame`, `examSeries`/`examChart`, `parseCarteirinha` e `cards()`.
- **64. Novidades** — lê `versoes.json` e desenha a lista, com selo até a pessoa abrir.
- **Voz** — `vozCfg()`, `loadVoices`, `speak`, `sayExercise`/`sayMove`/`sayCount`/`sayRest`, e `sttStart`
  (comando de voz). Nunca fixe o nome de uma voz no código: a lista muda de aparelho para aparelho.
- **Acessibilidade** — `A11Y_DEF`, `setA11y(chave, valor)`, `applyA11y()` (põe `data-fs`, `data-contrast`,
  `data-motion`, `data-links`, `data-read` no `<html>`; o CSS faz o resto).
- **32. Inicialização** — `boot()` e a API pública `window.RISE`.
- **11c. Voltar do celular** — `NAV`, `navPush`/`navReplace`/`navDrop`, `navRoute` e o único `popstate`
  do app. Janela (`modal`), gaveta, telas cheias (cronômetro, rotina, espelho) e cada tela entram no
  histórico; abas não se empilham; na tela inicial o primeiro Voltar avisa e o segundo sai. Nada de
  `pushState` fora daqui.
- **24b. Alimentos, pratos e sugestões** — `STATE.foods` (rótulo ou cadastro, por 100 g), `STATE.dishes`,
  `STATE.diet.prefs` (objetivos e restrições), `NUT_RESTR` (o que denuncia cada restrição na lista de
  ingredientes), `PRATOS` (pratos prontos com alimentos da tabela `FOODS`), `pratoNota`/`sugerirPratos`/
  `planoDoDia`, `nutForYouHTML` (o "Para você" do rótulo) e `nutAskAI` (cardápio pela IA do cofre).
- **49. Cofre de IA** — `AI_PROVIDERS` (id, nome, começo da chave), `aiCfg().keys` (uma chave por serviço),
  `aiTest` (testa no serviço; 403 "falta permissão" conta como válida), `aiAsk(pergunta, aoAvisar)` com
  a troca automática (`aiFalha` decide se foi cota ou chave; `AI_SKIP` evita insistir por 10 min).
- **50b. AssistONE** — `assistOpen/assistClose/assistToggle`, `ASSIST_ACOES` (atalhos por tela),
  `assistOnRoute` (dica por tela, uma vez), `assistCard` (Preferências). `ROOT.prefs.assist` liga/desliga.
- **60. Câmera** — além do que já havia: `camFocusOnce` (toque = foco no ponto), `camFocusContinuous`,
  `camMeterStart` (nitidez ao vivo), `camTorch`, e `ImageCapture.takePhoto` com fallback para o vídeo.
  **OCR**: `ocrEstimateAngle` (inclinação), `ocrCanvas` (girar, recortar o papel, ampliar, binarizar),
  `ocrParsedOk` (a leitura do modo entendeu?), `ocrWorker` (um worker reaproveitado) e `runOCR` com três
  passagens escolhendo a melhor.
- **Personal trainer** — `PERSONAIS` (id, ritmo e tom relativos, frases PT/EN por momento: inicio, ex, serie, descanso,
  proximo, fim, anima), `personal()`, `personalFrase(tipo, vars)`, `personalAvatar` e `personalCard` (Preferências).
  `sayStart`/`sayExercise`/`saySet`/`sayRest`/`sayDone` usam as frases do personal escolhido (`settings.voz.personal`).
  Foto: **`personal/<id>.png`** (ex.: `personal/knox.png`); sem o arquivo, avatar desenhado com as iniciais.
- **Nota do rótulo** — `notaRotulo(o)` (0–100: processamento 35 %, nutrientes 40 %, aditivos 25 %), `notaHTML`, `nutMatchHTML` (objetivos × tabela por 100 g). `SCANPREV` guarda o texto da foto anterior quando o rótulo é lido em duas fotos.
- **Menu ☰** — `DRAWER_QUICK` (ações rápidas), `DRAWER_GROUPS` (grupos; item `{id, subs}` vira acordeão de um nível), `SUB_LABEL` (rótulo de cada parte), `DRAWER_EXTRA` (itens que abrem janela em vez de rota). Mudar o menu = mexer nessas listas, não em tela.
- **Meus recursos** — `RC_CENARIOS` (cenários que marcam vários aparelhos de uma vez), `recursosModal()` (janela com cenários e chips por grupo), `recursosCard()` (Preferências); botão `#rc_open` na Início e ação no AssistONE.
- **Aparelhos** — `EQUIP` (desenho em linha de cada um), `EQ_TAGS` (grupos e termos de busca),
  `STATE.equipHave` ("tenho"), `eqBusca`, `eqModal` (ficha ampliável) e `eqFig`: se existir o arquivo
  **`aparelhos/<id>.png`** (fundo transparente, com o nome do aparelho no desenho se quiser), ele cobre
  o desenho em linha. É aí que entram as artes técnicas geradas fora do app.

## O que não se toca sem pensar duas vezes

- `LSKEY = "riseone.v1"` — é a gaveta dos dados. Trocar apaga tudo que a pessoa já guardou.
- Os `id` dos exercícios, movimentos e músculos — os treinos salvos apontam para eles.
- As chaves do dicionário `L` — as telas as usam pelo nome.
- A ordem dos quadros em `fotos-exercicios.jpg` e o mapa `PHOTOS`.

## Onde mudar o quê

| Quero… | Onde |
|---|---|
| Mudar um texto | Seção 1 ou 1b, chave correspondente (as duas línguas) |
| Acrescentar um exercício | Seção 5 (ou 52), uma linha `X(id, musculo, secundarios, aparelho, nomePT, nomeEN, dicaPT, dicaEN)` |
| Acrescentar um modelo de treino | `TEMPLATES` na seção 52 |
| Mudar a ajuda de uma tela | `HELP.nomeDaTela` na seção 51 |
| Mudar os passos do tutorial | `TOUR` na seção 51 |
| Mudar os passos do guia "Primeiros passos" | `WIZ_SETUP` na seção 51 |
| Mudar quem pode usar cada recurso | Dentro do app como administrador, depois baixar `servicos.json` |
| Trocar o serviço de IA | Seção 49, `aiAsk` (Gemini, OpenAI e Anthropic já estão lá; a chave é da pessoa) |
| Ligar um servidor no futuro | `entrar`/`sair` (seção 31) e `canUse` (seção 47): só esses pontos decidem identidade e permissão |

## API pública (estável)

`window.RISE` expõe: `versao`, `pode(recurso)`, `entrar(sessao)`, `sair()`, `idioma("pt"|"en")`, `tema("dark"|"light")`,
`ir(tela, subtela)`, `ajuda(aba)`, `tutorial(passo)`, `guia(id)`, `atualizar()`, `versaoDoSite()`. Outro código pode usar isso sem mexer por dentro.

## Regras de publicação

1. Todos os arquivos soltos na raiz do repositório `rise-one`.
2. A cada versão nova: `APP_VERSION` no `index.html`, `CACHE_VER` no `sw.js` **e** uma entrada nova
   no `versoes.json` (mesmo número). Sem os três, os celulares seguem na versão antiga.
3. O repositório é público: **nunca** colocar chave, senha ou dado pessoal no código.
4. Arquivo novo que precise abrir sem internet entra também na lista `CORE` do `sw.js`.
5. Endereço externo novo (script, API) precisa entrar na `Content-Security-Policy` do `index.html`,
   senão o navegador bloqueia em silêncio.

- **62 e 62b. Exames e laudos** — `parseExame(texto)` lê a tabela do laboratório: nome no começo da
  linha, comparação com o dicionário `INDICADORES` por palavra inteira, valor escolhido pela unidade
  do próprio exame (`exEscolhe`), nome quebrado em duas linhas juntado por `exNomeCompleto`, e faixa
  guardada como está impressa (`exFaixa`). Nome fora do dicionário só entra com unidade de
  laboratório **e** faixa. `parseLaudo(texto)` cuida do laudo descritivo (ultrassom, eco, tomografia,
  ergometria): acha o título, a data e o bloco de conclusão, e guarda o texto sem interpretar.
  `exImportar`/`exExportar` acrescentam e levam embora exames e laudos sem mexer no resto dos dados.

## O que ficou pendente de propósito

| Assunto | Situação |
|---|---|
| Tabela TUSS preenchida | `tuss.json` vem vazio de propósito. Os códigos são da ANS: o administrador importa o CSV oficial dentro do app e publica o arquivo gerado |
| Tabela TUSS 19 (OPME) | Mais de um milhão de linhas: não cabe no armazenamento do navegador. Só a de procedimentos entra |
| Lista `videos.json` preenchida | Vem vazia. Adivinhar código de vídeo do YouTube daria vídeo errado ou apagado |
| Faixas de referência de exame | Em branco. São do laboratório de cada pessoa, impressas no resultado — o app só copia a que está escrita no laudo |
| Segunda vista de 1 movimento | Só sobrou a inclinação lateral do tronco: de lado ela vira uma linha reta, sem informação nenhuma. Fica com uma vista, e o app diz isso na tela. Os outros 79 ganharam as duas vistas na 3.4.0 |
| Motor de OCR hospedado no repositório | Hoje vem do cdnjs, com jsdelivr de reserva (o pdf.js também). A diretriz pede hospedar os ~11 MB no próprio repositório; enquanto isso, não há `integrity` nesses `<script>` |
| App de relógio (Wear OS / watchOS) | Um site no GitHub Pages não vira app de relógio. O que dá é ler cinta peitoral ou pulseira por Web Bluetooth (Chrome do Android; no iPhone nenhum navegador tem Bluetooth para sites) |
| Controlar o Spotify | Nenhum site troca faixa ou dá pause no app de música. O RiseONE abre a playlist num toque e a voz do treinador toca por cima, sem parar a música |
| Projeção na TV | Resolvido na 3.2.0: a própria TV abre `tv-riseone.html` (Presentation API, com Chromecast ou Google TV). Sem Chromecast, cai para janelinha flutuante ou tela cheia, e aí quem leva a imagem é o espelhamento do aparelho. Câmera ao vivo o navegador não deixa transmitir |
| Inbox (caixa de recados) | Exige servidor. Não existe ainda no RiseONE |
