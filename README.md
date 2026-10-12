# Marrero Tech — Suporte Técnico Remoto em Informática

Landing page (one-page) para venda de **serviços de suporte técnico remoto em informática**,
construída a partir do currículo de **Mateus da Silva Marrero** e dos contatos do Linktree/LinkedIn.

Todo o site é **estático** (HTML + CSS + JS puros): não precisa de build, banco de dados
nem servidor de aplicação. Basta subir a pasta em qualquer hospedagem.

## Estrutura

```
suporte-tecnico-remoto/
├── index.html              # Página única com todas as seções
├── styles.css              # Estilos (tema escuro "tech", responsivo)
├── script.js               # Menu, links de WhatsApp, animações, formulário
├── manifest.webmanifest    # PWA básico
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/images/
    └── favicon.svg         # Ícone do site (SVG)
```

## Seções da página

1. **Cabeçalho fixo** — navegação + botão "Falar agora".
2. **Hero** — proposta de valor, botões de WhatsApp e cartão-resumo com estatísticas.
3. **Serviços** — 12 cards (formatação, vírus, redes, Microsoft 365, backup, impressoras,
   acessos, segurança, empresas, hardware, treinamento, sites).
4. **Como funciona** — 4 passos + ferramentas usadas (AnyDesk, TeamViewer…).
5. **Sobre** — biografia, formação, certificações e idiomas.
6. **Experiência** — linha do tempo com as empresas (SulAmérica, Friogera, Algartech,
   PROTESTE, Dermage) e os projetos (TV Globo, Michelin, Proteste).
7. **Planos** — avulso, residencial e empresarial (sem preço fixo; orçamento via WhatsApp).
8. **Diferenciais** — 4 motivos para escolher o serviço.
9. **FAQ** — 8 perguntas frequentes (acordeão).
10. **Contato** — dados diretos + formulário que abre o WhatsApp já preenchido.
11. **Rodapé** — navegação, contatos e redes.

## Como personalizar

### 1. Número de WhatsApp
O número usado em todos os botões fica em **`script.js`**, na constante `CONFIG`:

```js
var CONFIG = {
    whatsapp: '5521992724377',   // 55 + DDD + número, só dígitos
    defaultMessage: 'Olá, Mateus! Preciso de suporte técnico remoto.'
};
```

Os botões usam o atributo `data-wa="mensagem"` (com a mensagem já preenchida).
**Não é preciso editar os links `wa.me` no HTML** — eles são gerados automaticamente.

### 2. E-mail
Procure por `mateusmarrero@outlook.com` em `index.html` (seção Contato e Rodapé).

### 3. Redes sociais
- LinkedIn: `https://www.linkedin.com/in/mateus-marrero-68466820/`
- Linktree: `https://linktr.ee/mateusmarrero`

### 4. Domínio (site oficial)
O site está publicado em **`https://mateusmarrero.github.io/marrero-tech/`**, e essa URL
aparece em `index.html` (`canonical`, Open Graph e JSON-LD), no `robots.txt` e no `sitemap.xml`.
Se você usar um domínio próprio (ex.: `marrerotech.com.br`), troque a URL nesses 3 arquivos.

### 5. Imagem de compartilhamento (Open Graph)
Crie uma imagem **1200×630 px** chamada `og-marrero-tech.png` e coloque em
`assets/images/`. Ela aparece quando o link é compartilhado no WhatsApp, LinkedIn etc.

### 6. Textos e preços
Os planos não têm valor fixo (proposital: o orçamento é definido após o diagnóstico).
Se quiser exibir preços, edite os blocos `<article class="plan">` em `index.html`.

### 7. CNPJ / MEI
No rodapé há o texto "CNPJ / MEI: _a preencher_". Atualize com os dados reais
(ou remova a linha, se preferir).

### 8. Foto de perfil
A foto já está em `assets/images/mateus-marrero.jpg` e aparece **no cartão do topo**
(em círculo) e **na seção "Sobre"** (em quadrado). Para trocar, basta substituir esse
arquivo mantendo o mesmo nome.

> A imagem atual tem 400×400 px. Para ficar mais nítida em telas de alta resolução
> (retina), o ideal é usar uma versão com cerca de **800×800 px** ou mais.

## SEO e acessibilidade

- Título, descrição, palavras-chave, Canonical, Open Graph e Twitter Card.
- Dados estruturados JSON-LD: **ProfessionalService**, **Person** (com certificações
  e áreas de conhecimento) e **FAQPage**.
- `manifest.webmanifest`, `robots.txt` e `sitemap.xml`.
- Acessibilidade: link "pular para o conteúdo", `aria-expanded` no menu, foco visível,
  contraste adequado e suporte a `prefers-reduced-motion`.
- Sem cookies de rastreamento e sem dependências externas além das fontes do Google.

## Rodando localmente

Abra `index.html` no navegador ou sirva a pasta (recomendado):

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Depois acesse `http://localhost:8000`.

## Publicado em (GitHub Pages)

| | |
|---|---|
| **Site ao vivo** | https://mateusmarrero.github.io/marrero-tech/ |
| **Repositório** | https://github.com/mateusmarrero/marrero-tech |
| **Branch / pasta** | `main` / raiz (`/`) |
| **Provedor** | GitHub Pages (grátis) |

### Como publicar uma atualização
Sempre que alterar algo neste site, envie para o GitHub:

```bash
cd "C:\SItes OC\suporte-tecnico-remoto"
git add -A
git commit -m "Descrição do que mudou"
git push
```

O GitHub Pages reconstrói o site automaticamente em ~1 minuto.

### Como usar um domínio próprio
1. Compre o domínio (Registro.br, Namecheap…).
2. No repositório, crie um arquivo `CNAME` na raiz contendo só o domínio
   (ex.: `marrerotech.com.br`).
3. No painel do seu registrador, crie os registros DNS que o GitHub indica
   (Settings → Pages → Custom domain).
4. Marque "Enforce HTTPS".
5. Atualize a URL em `index.html`, `robots.txt` e `sitemap.xml`.

## Outras opções de hospedagem

Por ser estático, também funciona em Netlify, Vercel, Cloudflare Pages e Hostinger —
basta enviar o conteúdo desta pasta para a raiz pública do serviço.

## Observações

- Os dados do currículo foram usados como fonte das seções "Sobre", "Experiência"
  e "Certificações". Se algum item mudou, atualize os textos em `index.html`.
- Antes de publicar, confirme: número de WhatsApp, e-mail, domínio, horário de
  atendimento e dados fiscais.
