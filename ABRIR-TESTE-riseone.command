#!/bin/bash
# RiseONE — abre o app e a página de teste em http:// local (Mac e Linux)
# Como usar: dê dois cliques neste arquivo.
# Se o Mac reclamar que "não pode ser aberto", clique com o botão direito › Abrir.
cd "$(dirname "$0")" || exit 1
PORTA=8123
echo "RiseONE — servindo esta pasta em http://localhost:$PORTA"
echo "Para parar, feche esta janela ou aperte Control + C."
( sleep 2
  if command -v open >/dev/null 2>&1; then
    open "http://localhost:$PORTA/TESTE-riseone.html"
  elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "http://localhost:$PORTA/TESTE-riseone.html"
  fi ) &
if command -v python3 >/dev/null 2>&1; then
  python3 -m http.server $PORTA
elif command -v python >/dev/null 2>&1; then
  python -m SimpleHTTPServer $PORTA
else
  echo
  echo "Não encontrei o Python neste computador."
  echo "Instale em python.org e dê dois cliques aqui de novo."
  read -r _
fi
