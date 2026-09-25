# Créditos e fontes — RiseONE

Tudo que vem de fora, e de onde vem. Conferido em 25 de setembro de 2026.

## Código de terceiros

O app não embute nenhuma biblioteca. Três serviços são carregados sob demanda,
direto do endereço oficial, e só quando a pessoa usa a função:

| O quê | Para quê | Licença | De onde |
|---|---|---|---|
| Tesseract.js 5.1.1 | Ler o texto das fotos (rótulo, exame, ficha, carteirinha) | Apache-2.0 | cdnjs.cloudflare.com, com cdn.jsdelivr.net de reserva |
| MediaPipe Tasks Vision | Detectar a postura no espelho da câmera | Apache-2.0 | cdn.jsdelivr.net / storage.googleapis.com |
| pdf.js (pdfjs-dist 4) | Ler o texto de dentro do PDF do laboratório | Apache-2.0 | cdn.jsdelivr.net, com cdnjs de reserva |
| YouTube (iframe) | Mostrar o vídeo do exercício, quando há um link escolhido | Termos do YouTube | www.youtube.com |

Serviços de IA (Gemini, OpenAI, Anthropic) só são chamados se a própria pessoa
colocar a chave dela nos Ajustes. A chave fica no aparelho dela e não vai para
lugar nenhum além do serviço escolhido.

## Conteúdo

| O quê | Origem | Observação |
|---|---|---|
| Exercícios, movimentos e alongamentos | Escritos para o app | Linguagem simples, três níveis de nome |
| Bonecos animados | Desenhados em SVG dentro do próprio `index.html` | Nenhuma imagem de terceiro |
| Ícones | Desenhados em SVG no `index.html`, seção 0 | Traço simples, família única |
| `cid.json` | Redação resumida da CID-10, capítulos XIII (M) e VI (G) | **Lista inicial, de consulta.** Confira na tabela oficial antes de usar em pedido, laudo ou reembolso |
| Códigos TUSS/TISS | **Não preenchidos** | Vêm da tabela oficial da ANS e não devem ser inventados |
| Limites de "alto em" do rótulo | RDC 429/2020 e IN 75/2020 (ANVISA) | Conferidos em 1º de setembro de 2026 |
| Lista de aditivos (INS) | Aditivos citados com mais frequência em rótulos brasileiros | Lista de consulta, não é a tabela completa |
| Semáforo do rótulo | Critério do próprio app, descrito na tela | **Não é** classificação oficial (NOVA, Nutri-Score ou equivalente) |
| `tuss.json` | Terminologia Unificada da Saúde Suplementar (ANS) | **Vem vazio.** O administrador importa o arquivo oficial da ANS dentro do app. O RiseONE não redistribui a tabela |
| `videos.json` | Links escolhidos por quem usa o app | **Vem vazio.** O app não adivinha código de vídeo do YouTube |
| `musicas.json` | Links públicos de playlist, escolhidos por quem publica o site | Só **links**. O RiseONE não hospeda, não redistribui e não tem vínculo com o Spotify nem com nenhum serviço de música |
| Segunda vista dos movimentos | Gerada a partir do desenho que já existia, por regra geométrica | Girar o observador 90° não muda a altura de nenhuma articulação: os `y` são exatamente os do desenho original |
| Desenhos dos movimentos | Feitos para o RiseONE, vetor (SVG) desenhado pelo próprio app | Não são foto, GIF nem vídeo: são traços calculados na hora e animados entre a posição de início e a de fim |
| Faixas de referência de exame | **Não preenchidas** | São do laboratório de cada pessoa e vêm impressas no resultado |
| `fotos-exercicios.jpg` | Fotos fornecidas pelo dono do app | Verifique autorização de imagem de quem aparece antes de publicar |
| Arte de fundo e ícones do app | Fornecidos pelo dono do app | — |

## Bases legais citadas no app

Conferidas em 1º de setembro de 2026, sem garantia de vigência depois desta data:

- Lei nº 13.709/2018 (LGPD) — artigos 7º, 11, 18 e 46
- Regulamento (UE) 2016/679 (GDPR) — artigos 6º, 9º, 15 a 20 e 32
- Lei nº 12.965/2014 (Marco Civil da Internet)
- RDC 429/2020 e IN 75/2020 (ANVISA) — rotulagem nutricional frontal

Como reconferir: texto atualizado da LGPD em planalto.gov.br, orientações da
ANPD em gov.br/anpd, GDPR em eur-lex.europa.eu, normas da ANVISA em gov.br/anvisa.
Reconfira a cada seis meses ou a cada versão nova do app.

## O que o app NÃO faz

- Não envia seus dados para nenhum servidor do RiseONE — não existe servidor.
- Conecta na TV, sim, quando há Chromecast ou Google TV: a própria TV abre a página `tv-riseone.html`
  e o celular manda o que ela deve mostrar. Sem Chromecast, quem leva a imagem é o espelhamento do aparelho.
- Não controla o Spotify nem nenhum outro app de música: ele só ABRE a playlist que você
  colou. A voz do treinador não para a música, porque o app não toma o áudio para si.
- Não vira app de relógio. O que ele faz é ler, por Bluetooth, cinta peitoral ou pulseira
  que publique o serviço padrão de frequência cardíaca (Chrome do Android e do computador;
  no iPhone nenhum navegador tem Bluetooth para sites).
- Não redistribui a tabela TUSS da ANS nem adivinha código de vídeo do YouTube: os dois
  arquivos viajam vazios e são preenchidos por quem publica o site.
- Não dá diagnóstico, não interpreta exame e não diz se um valor está bom ou ruim.
