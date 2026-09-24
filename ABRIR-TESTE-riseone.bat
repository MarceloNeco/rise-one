@echo off
REM RiseONE - abre o app e a pagina de teste em http:// local (Windows)
REM Como usar: de dois cliques neste arquivo.
cd /d "%~dp0"
set PORTA=8123
echo RiseONE - servindo esta pasta em http://localhost:%PORTA%
echo Para parar, feche esta janela.
start "" http://localhost:%PORTA%/TESTE-riseone.html
py -3 -m http.server %PORTA% 2>nul
if errorlevel 1 python -m http.server %PORTA%
if errorlevel 1 (
  echo.
  echo Nao encontrei o Python neste computador.
  echo Instale em python.org, marcando "Add Python to PATH", e de dois cliques aqui de novo.
  pause
)
