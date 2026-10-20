# Motosul Nova Odessa — site

Site institucional estático (HTML + CSS + JS, sem build e sem dependências),
montado a partir dos dados públicos do perfil
[@motosul_novaodessa](https://www.instagram.com/motosul_novaodessa/).

## Como abrir

- **Direto:** dê duplo clique em `index.html`.
- **Servidor local** (recomendado, por causa do `site.webmanifest`):

  ```powershell
  py -3 -m http.server 8080
  ```

  Depois abra <http://localhost:8080>.

## Estrutura

```
motosul/
├── index.html          página única (hero, serviços, galeria, sobre, contato)
├── style.css           tema escuro + destaque laranja-avermelhado
├── script.js           menu mobile, reveal, lightbox (sem bibliotecas)
├── site.webmanifest    PWA básico
├── assets/img/         imagens usadas no site
└── data/instagram/     captura do perfil (dados + mídias originais)
```

## Preencher antes de publicar

Procure por `class="placeholder"` no `index.html`. Hoje estão pendentes:

| Item | Onde | Situação |
|---|---|---|
| Endereço (rua e número) | seção Contato | **a confirmar** |
| CEP | seção Contato | **a confirmar** |
| Horário de funcionamento | seção Contato | **a confirmar** |
| Lista oficial de serviços | seção Serviços | inferida das legendas do Instagram |
| Preços | — | não publicados |
| Logo em PNG/SVG transparente | `assets/img/logo-crop.png` | recortado de um post; ideal é o arquivo original |

Os itens com `placeholder` aparecem com **sublinhado tracejado** em itálico —
proposital, para ninguém publicar sem perceber.

## Identidade visual

- Fundo `#0b0d10`, superfícies `#14171c` / `#1b1f26`
- Destaque `--accent: #ff5a1f` (laranja-avermelhado, escolhido para casar com o vermelho do logo)
- Para usar o vermelho puro da marca: troque `--accent` por `#e11d2a` em `style.css`

## Mídia — procedência e limitações

As imagens vieram dos posts públicos do perfil, capturadas via navegador.

| Arquivo | Origem | Resolução |
|---|---|---|
| `g03.webp` | BMW R1300 na oficina | 1440×1440 |
| `g04.webp` | Honda NX 160 | 1440×1440 |
| `g05.webp` | Kawasaki Versys 300 | 1440×1440 |
| `g01.jpg` | Filtros PROX | 1214×1600 |
| `g08.jpg` | Óleo para filtro de ar | 640×1136 (baixa) |
| `logo-crop.png` | recorte do logo em um post | ~683×109 |
| `logo.jpg` | foto de perfil | 960×960 |
| `g02.jpg` | poster California Racing (não usado na página) | 1365×1820 |

**Descartados na auditoria** (fotos de produto com texto promocional ou frames
de reel com legendas sobrepostas): 3 imagens. Ficaram fora para não poluir o
layout.

**Pendências de mídia:** faltam fotos horizontais (as boas são 1:1 ou retrato),
fotos da fachada/equipe e imagens em alta dos destaques (as capturadas têm
150×150 px).

## Hero em vídeo

O hero usa um loop curto gerado a partir de `data/instagram/media/Chase.jpg`:

| Arquivo | Detalhe |
|---|---|
| `assets/video/hero-loop.mp4` | 1600×900, 30 fps, 16 s, H.264, **1,94 MB**, sem áudio |
| `assets/img/hero-chase.jpg` | poster (primeiro frame) e fallback |

Como foi feito: recorte 16:9, upscale, `zoompan` de 8 s (zoom 1,00 → 1,11),
depois o mesmo trecho **revertido e concatenado** — resultado é um loop
"ping-pong" sem corte visível. Regerar:

```powershell
powershell -File "C:\Users\Home\AppData\Local\Temp\opencode\make_hero.ps1"
```

Regras aplicadas no HTML/CSS:

- `autoplay muted loop playsinline` (necessário para autoplay em mobile)
- `poster` para o primeiro paint e fallback se o vídeo falhar
- `@media (prefers-reduced-motion: reduce)` esconde o vídeo e mostra a imagem

> ⚠️ **Direito de imagem:** a foto `Chase.jpg` mostra uma moto KTM com
> patrocínio Red Bull visível. Ela não parece ser material próprio da Motosul —
> para publicar o site, o ideal é trocar por foto da loja ou por imagem
> licenciada. Em publicidade, marca de terceiro visível é risco jurídico.

## Dados de origem

- `data/instagram/profile.json` — perfil, bio completa, destaques
- `data/instagram/profile_posts.json` — 11 posts com legenda
- `data/instagram/media/` — 18 arquivos originais
- `data/instagram/README.md` — relatório da captura

> Observação: a captura cobre **11 dos 68 posts** do perfil. Rolar o perfil
> permite ampliar esse conjunto.
