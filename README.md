# RiseONE

App de **exercício + dieta** que roda direto no navegador (celular, tablet e computador).
Tudo em **um arquivo só**: `index.html`.

Site: https://marceloneco.github.io/rise-one/

## O que tem dentro

- **Mapa do corpo** — desenho do corpo (frente e costas) clicável, com nomes dos músculos em 3 níveis
  (simples → comum → técnico) e busca por objetivo em linguagem do dia a dia
  (*"quero deixar o bíceps forte"*).
- **Cinco tipos de acesso** — Visitante (com anúncios, sem guardar dados), Aluno, Personal Trainer,
  Anunciante e Administrador. A conta tem apelido, e-mail e senha, com código de recuperação
  `RISE-XXXX-XXXX` mostrado uma vez e fluxo de "esqueci a senha".
- **Administrador dos níveis** — cada recurso pode ser marcado como aberto ao Visitante, Incluso
  (qualquer conta) ou Premium. Recurso trancado mostra um aviso explicando o porquê.
- **Anúncios** — banner do topo em carrossel (troca a cada 8 s, cada anúncio com o seu link) e
  pop-up na área logada com 3 segundos antes de liberar o X. Conta premium não vê anúncio nenhum.
  O painel do anunciante conta exibições, cliques e taxa dos dois tipos.
- **Avisos e notificações** — treino do dia, fim do descanso, missões, água, check-in e lembretes,
  cada um ligável e com horário próprio. Estrutura de push de servidor já pronta no service worker.
- **Instala e funciona sem internet** — `manifest.json`, `sw.js` e ícones na raiz; depois da primeira
  visita o app abre offline e pode ser instalado como aplicativo, com atalhos de treino, cronômetro,
  check-in e escanear.
- **Assistente de IA** — perguntas de treino e dieta usando a chave do próprio usuário
  (Google Gemini, OpenAI ou Anthropic Claude), com a opção de enviar junto os dados da anamnese.
- **Arte de fundo** — imagem de academia em traço laranja sobre fundo escuro, com versão deitada para
  computador e em pé para celular, ligada e desligada pelo botão ▨ do cabeçalho.
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
- **Português e inglês** — botão 🌐 sempre à vista. Datas em `dd/mmm/aaaa` (PT) e `mmm/dd/aaaa` (EN).
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
| `fundo.jpg`, `fundo-celular.jpg` | arte de fundo (computador e celular) |
| `TESTE-riseone.html` | página de conferência das diretrizes |

A pasta `.github` (com `workflows/static.yml`) já está no repositório e **não pode ser apagada** —
é ela que publica o site a cada envio.

## Como publicar (GitHub Pages)

1. Crie um repositório público chamado `rise-one`.
2. Envie o arquivo `index.html` para a raiz do repositório (sem pastas).
3. Em **Settings › Pages**, escolha a branch `main` e a pasta `/ (root)`.
4. Aguarde alguns minutos e abra `https://marceloneco.github.io/rise-one/`.

## Aviso

Uso pessoal e para fins de estudo e pesquisa. As informações sobre exercícios, alimentação e
saúde são informativas e não substituem profissional de educação física, nutricionista ou médico.

---
Versão 2.2.0
