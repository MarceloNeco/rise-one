# RiseONE

App de **exercício + dieta** que roda direto no navegador (celular, tablet e computador).
Todo o código fica em **um arquivo só**: `index.html`. Os outros arquivos são apoio (ícones, arte, listas).

Site: https://marceloneco.github.io/rise-one/ · Como o app é feito por dentro: `ARQUITETURA.md`

## Novo na versão 3.0.1 — aviso de versão

- **O app confere sozinho se está atualizado.** Em Mais › Sobre aparecem duas linhas: a versão neste
  aparelho e a versão publicada no site. Se o site estiver mais novo, o Início mostra um cartão
  "Tem uma versão nova" com o botão **Atualizar agora**, que limpa o que o navegador guardou e recarrega
  (seus treinos, fotos e medidas **não** são apagados).
- Serve para o caso em que o envio de um arquivo para o GitHub falha sem avisar: em vez de ficar na
  dúvida, o próprio app diz qual versão está no ar.

## Novo na versão 3.0.0 — interface limpa e as diretrizes do portfólio

- **Cinco áreas em vez de treze abas** — Início, Treinar (Treino · Exercícios · Corpo · Aquecer & Alongar),
  Dieta, Evolução (Hoje · Peso · Fotos · Medidas · Exames · Missões) e Mais (câmera, assistente, perfil,
  avisos, conta, dados, preferências, ajuda). No celular vira barra de baixo. Nada foi retirado: cada tela
  antiga continua existindo, só mudou de lugar.
- **Início com um próximo passo claro** — o cartão laranja mostra o que fazer agora (começar o treino,
  completar os primeiros passos, registrar o dia), depois os números do dia, as missões e os atalhos.
- **Ícones desenhados iguais em todo aparelho**, cartões com título e explicação curta, telas vazias que
  dizem o que fazer, folhas que sobem de baixo no celular e linguagem simples (sem gíria e sem
  termos técnicos sem explicação).
- **Botão Ajuda (Assist ONE)** — um botão só abre a central: **Tutorial** (destaca cada parte na tela de
  verdade, oferecido na primeira visita), **Guia passo a passo** (Primeiros passos: idioma, seus dados,
  objetivo, lesões, saúde e avisos — com pular, salvar e retomar de onde parou), **Buscar por termo**
  (glossário: série, IMC, backup, missão…) e **Esta tela** (o que cada parte da tela faz). Tudo em PT e EN.
  Se os arquivos `ajuda-botao.png` e `ajuda-icone.png` do portfólio estiverem na raiz, o botão usa eles.
- **Faixa do topo na ordem da diretriz** — [PT | EN] · [IA] · [ANÚNCIO] · [carrossel] · [×]. O × fecha só os
  anúncios; o idioma continua sempre à vista. Conta Premium vê só PT | EN e IA.
- **Níveis Visitante → Membro → Premium** — o administrador define cada recurso, testa o app
  "vendo como" Visitante, Membro ou Premium (tarja amarela de modo de teste) e baixa o `servicos.json`,
  que viaja com o site.
- **Senha com PBKDF2** e código de recuperação que se renova ao ser usado. Contas antigas continuam
  entrando e são atualizadas no primeiro login.
- **Horário silencioso** nos avisos: segura os avisos e solta depois; lembrete marcado como urgente passa.
- **Modelos de treino prontos** — quatro treinos de exemplo montados a partir de fichas reais (iniciante,
  intermediário, treino A e treino B), com observações por exercício. Ao usar, vira um treino seu.
- **12 exercícios e 5 movimentos novos** (flexão escapular, rotação externa e interna com elástico,
  remada na máquina, supino na máquina, panturrilha na parede, extensão de punho, esteira inclinada,
  passagem de bastão, rotação de tronco com bastão…) e a rotina **Mobilidade diária (5–8 min)**.
- **Fotos das posições** — arquivo opcional `fotos-exercicios.jpg` com as fotos de início e fim de
  17 exercícios/movimentos. Sem o arquivo, o app mostra só o boneco animado.
- **`ARQUITETURA.md`** — o que cada arquivo faz, o que não se toca e onde mudar o quê.

## O que tem dentro

- **Mapa do corpo** — desenho do corpo (frente e costas) clicável, com nomes dos músculos em 3 níveis
  (simples → comum → técnico) e busca por objetivo em linguagem do dia a dia
  (*"quero deixar o bíceps forte"*).
- **Cinco tipos de acesso** — Visitante (com anúncios, sem guardar dados), Aluno, Personal Trainer,
  Anunciante e Administrador. A conta tem apelido, e-mail e senha, com código de recuperação
  `RISE-XXXX-XXXX` mostrado uma vez e fluxo de "esqueci a senha".
- **Administrador dos níveis** — cada recurso pode ser marcado como aberto ao Visitante, Incluso
  (qualquer conta) ou Premium. Recurso trancado mostra um aviso explicando o porquê.
- **Anúncios (diretriz do portfólio)** — faixa do topo com os anúncios rolando para a esquerda em laço,
  imagem ao lado do texto, pausa no toque ou no mouse, palavra ANÚNCIO na vertical e × que fecha até o
  próximo login. Pop-up em dois momentos (antes do login com um app sorteado; depois do login com
  outro app), contagem 3-2-1 antes de liberar o ×, fecha no ×, Esc ou clique fora; deitado no computador
  e em pé no celular; botão "Conhecer". Lista em `anuncios.json`; sem o arquivo usa os apps do hub.
  O RiseONE nunca anuncia a si mesmo. Exibições e cliques contados por anúncio. Premium não vê nada.
- **Avisos e notificações** — treino do dia, fim do descanso, missões, água, check-in e lembretes,
  cada um ligável e com horário próprio. Estrutura de push de servidor já pronta no service worker.
- **Instala e funciona sem internet** — `manifest.json`, `sw.js` e ícones na raiz; depois da primeira
  visita o app abre offline e pode ser instalado como aplicativo, com atalhos de treino, cronômetro,
  check-in e escanear.
- **Assistente de IA** — perguntas de treino e dieta usando a chave do próprio usuário
  (Google Gemini, OpenAI ou Anthropic Claude), com a opção de enviar junto os dados da anamnese.
- **Arte de fundo** — imagem de academia em traço laranja sobre fundo escuro, com versão deitada para
  computador e em pé para celular, e uma versão clara (traço laranja escuro sobre fundo laranja bem claro) que
  entra sozinha quando o tema muda para dia, junto com uma paleta creme quente na interface. Liga e desliga pelo botão ▨ do cabeçalho.
- **Anamnese** — data de nascimento (idade calculada sozinha), sexo, altura e peso com IMC e gasto
  calórico na hora; objetivo, tempo de treino, dias por semana e onde treina; lesões e dores por região,
  que passam a marcar com ⚠ os exercícios daquela área; e saúde geral (pressão, diabetes, coração,
  cirurgia, medicação, liberação médica). Tudo fica no aparelho e alimenta as metas da dieta.
- **Animações com setas** — todos os 84 exercícios e os 34 movimentos de aquecer/alongar têm um boneco
  animado que faz o movimento, com seta amarela mostrando a direção e o aparelho desenhado junto.
- **Espelho com câmera** — a câmera frontal vira espelho com o boneco guia sobreposto e, se você quiser,
  uma conferência automática de postura que desenha o seu esqueleto e avisa em verde/vermelho
  (“quadril caindo”, “tronco muito à frente”, “desça mais”). Roda no próprio aparelho, sem gravar nada.
- **Biblioteca de exercícios** — 84 exercícios com músculo trabalhado, dica de execução,
  desenho do aparelho e vídeo do YouTube embutido. Dá para fotografar os aparelhos da sua academia.
- **Treinos** — monta treino A/B/C, marca os dias da semana, executa com cronômetro,
  descanso com alarme e histórico de volume.
- **Aquecer & Alongar** — 34 movimentos desenhados, 13 rotinas prontas (aquecimento geral, por grupo
  muscular, antes do aeróbico, alongamento pós-treino, ao acordar, para quem fica sentado, dor nas
  costas, antes de dormir, mobilidade de quadril e de ombro) e um montador: você escolhe o propósito
  (antes / depois / dia a dia / aeróbico / mobilidade), as partes do corpo e o tempo. O aquecimento do
  dia sai pronto a partir dos músculos do treino marcado. Tudo roda num player guiado que passa de um
  movimento para o outro sozinho, com contagem, apito e a tela sempre acesa.
- **Cronômetro de tela cheia** — número gigante, três modos (regressivo, progressivo e séries),
  pausa, zerar, ajuste de −1 min a +1 min, tempos rápidos e **tela que não apaga nem bloqueia**.
  Pode ser minimizado numa bolinha flutuante e continua contando.
- **Alarme do seu jeito** — toca e para sozinho (3 a 30 s), toca até você parar, ou fica lembrando
  a cada 30 s / 1 / 2 / 5 / 10 min, para sempre ou por um número de vezes.
- **Séries (intervalado)** — preparação, esforço, descanso, séries por bloco, blocos e descanso entre
  blocos, com modelos prontos (Tabata, 30/30, 45/15, EMOM, Força 4×8) e tempo total calculado na hora.
- **Check-in diário** — peso, missões cumpridas, humor e anotações, com sequência de dias.
- **Dieta** — metas de calorias e macros (com cálculo automático), diário de refeições,
  tabela de alimentos comuns, copos de água e metas diferentes para dia de treino e de descanso.
- **Evolução** — fotos antes e depois com comparador, medidas do corpo, exames e gráficos.
- **Escanear (OCR)** — a câmera lê rótulo nutricional, ficha de treino em papel, visor da balança,
  exame de sangue e medidas de fita. O texto é lido **no próprio aparelho**.
- **Perfis** — Visitante (com anúncios, sem guardar dados), Aluno, Personal Trainer e Anunciante.
- **Português e inglês** — botão PT | EN sempre à vista na faixa do topo. Datas em `dd/mmm/aaaa` (PT) e `mmm/dd/aaaa` (EN).
- **Tema escuro e claro**, layout responsivo e pronto para instalar como aplicativo.

## Privacidade

Os dados ficam no próprio aparelho (armazenamento do navegador). Nada é enviado para servidores
do app. O backup é um arquivo `.json` que fica com o usuário. A ligação opcional com Google Drive
ou OneDrive só funciona quando o próprio usuário informa a chave (Client ID) do serviço dele.

## Arquivos do pacote

Todos vão soltos na **raiz** do repositório:

| Arquivo | Para que serve |
|---|---|
| `index.html` | o app inteiro |
| `manifest.json` | deixa instalar como aplicativo |
| `sw.js` | faz abrir sem internet e entrega os avisos |
| `icone-192.png`, `icone-512.png`, `icone-maskable.png` | ícones do aplicativo |
| `fundo.jpg`, `fundo-celular.jpg` | arte de fundo do tema escuro (computador e celular) |
| `fundo-claro.jpg`, `fundo-claro-celular.jpg` | a mesma arte na versão do tema claro |
| `anuncios.json` | lista de anúncios da faixa e do pop-up (editável) |
| `servicos.json` | quem pode usar cada recurso (Visitante / Membro / Premium); o admin gera dentro do app |
| `fotos-exercicios.jpg` | opcional: fotos das posições de alguns exercícios |
| `TESTE-riseone.html` | página de conferência das diretrizes |
| `ARQUITETURA.md` | como o app é feito por dentro (leia antes de mexer) |

A pasta `.github` (com `workflows/static.yml`) já está no repositório e **não pode ser apagada** —
é ela que publica o site a cada envio.

## Como publicar (GitHub Pages)

1. Crie um repositório público chamado `rise-one`.
2. Envie todos os arquivos do pacote para a raiz do repositório (sem pastas): **Add file › Upload files**, arraste, **Commit changes**.
3. Em **Settings › Pages**, escolha a branch `main` e a pasta `/ (root)`.
4. Aguarde alguns minutos e abra `https://marceloneco.github.io/rise-one/`.

## Aviso

Uso pessoal e para fins de estudo e pesquisa. As informações sobre exercícios, alimentação e
saúde são informativas e não substituem profissional de educação física, nutricionista ou médico.

---
Versão 3.0.1
