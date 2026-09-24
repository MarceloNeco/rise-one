# Créditos e fontes — RiseONE

Tudo que vem de fora, e de onde vem. Conferido em 24 de setembro de 2026.

## Código de terceiros

O app não embute nenhuma biblioteca. Três serviços são carregados sob demanda,
direto do endereço oficial, e só quando a pessoa usa a função:

| O quê | Para quê | Licença | De onde |
|---|---|---|---|
| Tesseract.js 5.1.1 | Ler o texto das fotos (rótulo, exame, ficha, carteirinha) | Apache-2.0 | cdnjs.cloudflare.com, com cdn.jsdelivr.net de reserva |
| MediaPipe Tasks Vision | Detectar a postura no espelho da câmera | Apache-2.0 | cdn.jsdelivr.net / storage.googleapis.com |
| YouTube (iframe) | Mostrar o vídeo do exercício | Termos do YouTube | www.youtube.com |

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
- Não conecta sozinho na TV: quem faz isso é o espelhamento do seu aparelho.
- Não integra com Spotify nem com relógio: o app não interrompe o áudio de outro
  aplicativo, então a música de qualquer app continua tocando por cima da voz do
  treinador, mas não há controle de faixa dentro do RiseONE.
- Não dá diagnóstico, não interpreta exame e não diz se um valor está bom ou ruim.
