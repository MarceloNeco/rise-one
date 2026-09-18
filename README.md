# RiseONE

App de **exercício + dieta** que roda direto no navegador (celular, tablet e computador).
Tudo em **um arquivo só**: `index.html`.

Site: https://marceloneco.github.io/rise-one/

## O que tem dentro

- **Mapa do corpo** — desenho do corpo (frente e costas) clicável, com nomes dos músculos em 3 níveis
  (simples → comum → técnico) e busca por objetivo em linguagem do dia a dia
  (*"quero deixar o bíceps forte"*).
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
- **Cronômetro de tela cheia** — número gigante, modo regressivo e progressivo, pausa, zerar,
  ajuste de −1 min a +1 min, tempos rápidos, alarme sonoro que toca até ser desligado, vibração
  e **tela que não apaga nem bloqueia** enquanto o cronômetro roda. Pode ser minimizado numa
  bolinha flutuante e continua contando.
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

## Como publicar (GitHub Pages)

1. Crie um repositório público chamado `rise-one`.
2. Envie o arquivo `index.html` para a raiz do repositório (sem pastas).
3. Em **Settings › Pages**, escolha a branch `main` e a pasta `/ (root)`.
4. Aguarde alguns minutos e abra `https://marceloneco.github.io/rise-one/`.

## Aviso

Uso pessoal e para fins de estudo e pesquisa. As informações sobre exercícios, alimentação e
saúde são informativas e não substituem profissional de educação física, nutricionista ou médico.

---
Versão 1.2.0
