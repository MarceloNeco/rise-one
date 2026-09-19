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
| `fotos-exercicios.jpg` | **Opcional.** Mosaico 6×6 com fotos das posições de alguns exercícios. Sem ele, o app mostra só o boneco animado | Sim, mas mantendo a ordem dos quadros (ver `PHOTOS` no código) |
| `ajuda-botao.png`, `ajuda-icone.png` | **Opcionais.** Ícone Assist ONE do botão de ajuda. Sem eles, o app usa um ícone desenhado em SVG | Colocar os arquivos do portfólio |
| `TESTE-riseone.html` | Página de teste das diretrizes (abre no mesmo endereço do app) | Sim |
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
- **44 e 45. Avisos** — tipos de aviso, horário silencioso (segura e solta depois), instalação.
- **46. Anúncios** — faixa em rolagem e pop-up, conforme a diretriz do portfólio.
- **47 e 48. Níveis e administrador** — `canUse(recurso)` decide se a pessoa pode usar algo; `servicos.json`; "ver o app como".
- **50 e 51. Central de ajuda** — motor do tutorial (`TOUR`), motor de guias (`wizDef`/`wizRun`), busca (`GLOSS`) e ajuda por tela (`HELP`).
- **52. Conteúdo extra** — exercícios e movimentos vindos de fichas reais, modelos de treino (`TEMPLATES`) e mapa das fotos (`PHOTOS`).
- **53. Conferência de versão** — pergunta ao site qual versão está publicada (lê o `CACHE_VER` do `sw.js`)
  e oferece "Atualizar agora", que limpa caches e service worker e recarrega.
- **32. Inicialização** — `boot()` e a API pública `window.RISE`.

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
2. A cada versão nova: `APP_VERSION` no `index.html` e `CACHE_VER` no `sw.js`.
3. O repositório é público: **nunca** colocar chave, senha ou dado pessoal no código.
