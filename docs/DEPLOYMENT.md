# Guia de Implantação

Este documento explica como implantar o City Pop Girl Player em diferentes plataformas, incluindo Vercel, Netlify, GitHub Pages e servidores tradicionais.

## 📊 Visão Geral

O City Pop Girl Player é uma aplicação Next.js que pode ser implantada em várias plataformas. O processo de implantação varia dependendo da plataforma escolhida, mas os passos gerais são os mesmos:

1. Construir a aplicação
2. Implantar os arquivos construídos
3. Configurar o domínio (opcional)

## 🚀 Implantação no Vercel

O Vercel é a plataforma recomendada para implantar aplicações Next.js, pois oferece a melhor experiência e desempenho.

### Passos para Implantação no Vercel

1. Crie uma conta no [Vercel](https://vercel.com/)
2. Instale a CLI do Vercel (opcional):
   ```bash
   npm install -g vercel
   ```
3. Faça login no Vercel:
   ```bash
   vercel login
   ```
4. Navegue até o diretório do projeto:
   ```bash
   cd city-girl-pop-player
   ```
5. Implante o projeto:
   ```bash
   vercel
   ```
6. Siga as instruções na tela para concluir a implantação

### Implantação Automática

O Vercel oferece implantação automática quando você conecta seu repositório GitHub:

1. Crie uma conta no [Vercel](https://vercel.com/)
2. Clique em "New Project"
3. Importe seu repositório GitHub
4. Configure as opções de implantação
5. Clique em "Deploy"

## 🌐 Implantação no Netlify

O Netlify é outra plataforma popular para implantar aplicações web.

### Passos para Implantação no Netlify

1. Crie uma conta no [Netlify](https://www.netlify.com/)
2. Instale a CLI do Netlify (opcional):
   ```bash
   npm install -g netlify-cli
   ```
3. Faça login no Netlify:
   ```bash
   netlify login
   ```
4. Navegue até o diretório do projeto:
   ```bash
   cd city-girl-pop-player
   ```
5. Construa o projeto:
   ```bash
   npm run build
   ```
6. Implante o projeto:
   ```bash
   netlify deploy
   ```
7. Siga as instruções na tela para concluir a implantação

### Implantação Automática

O Netlify também oferece implantação automática quando você conecta seu repositório GitHub:

1. Crie uma conta no [Netlify](https://www.netlify.com/)
2. Clique em "New site from Git"
3. Importe seu repositório GitHub
4. Configure as opções de implantação:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Clique em "Deploy site"

## 📦 Implantação no GitHub Pages

O GitHub Pages é uma opção gratuita para hospedar sites estáticos.

### Passos para Implantação no GitHub Pages

1. Adicione o seguinte script ao seu `package.json`:
   ```json
   "scripts": {
     "deploy": "next build && next export && touch out/.nojekyll && gh-pages -d out"
   }
   ```
2. Instale a dependência `gh-pages`:
   ```bash
   npm install --save-dev gh-pages
   ```
3. Adicione a seguinte configuração ao seu `next.config.ts`:
   ```ts
   module.exports = {
     basePath: process.env.NODE_ENV === 'production' ? '/city-girl-pop-player' : '',
     images: {
       unoptimized: true,
     },
   }
   ```
4. Implante o projeto:
   ```bash
   npm run deploy
   ```
5. Configure o GitHub Pages nas configurações do seu repositório:
   - Vá para "Settings" > "Pages"
   - Selecione a branch `gh-pages` como fonte
   - Clique em "Save"

## 🖥️ Implantação em Servidor Tradicional

Para implantar em um servidor tradicional (como Apache ou Nginx), siga estes passos:

1. Construa o projeto:
   ```bash
   npm run build
   ```
2. Copie os arquivos construídos para o servidor:
   ```bash
   scp -r .next user@your-server:/path/to/your/app
   ```
3. Configure o servidor web para servir a aplicação:
   - Para Apache, crie um arquivo `.htaccess` na raiz do projeto:
     ```
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteCond %{REQUEST_FILENAME} !-l
     RewriteRule . /index.html [L]
     ```
   - Para Nginx, configure o servidor:
     ```
     server {
       listen 80;
       server_name your-domain.com;
       root /path/to/your/app;
       index index.html;
       location / {
         try_files $uri $uri/ /index.html;
       }
     }
     ```

## 🔧 Configuração de Domínio Personalizado

Para configurar um domínio personalizado, siga estas etapas:

1. Compre um domínio de um provedor de domínio (como GoDaddy, Namecheap, etc.)
2. Configure os registros DNS para apontar para o seu servidor:
   - Para um registro A, aponte para o IP do seu servidor
   - Para um registro CNAME, aponte para o domínio fornecido pela plataforma de hospedagem
3. Configure o domínio na plataforma de hospedagem:
   - Para Vercel: Vá para "Settings" > "Domains" e adicione seu domínio
   - Para Netlify: Vá para "Domain settings" e adicione seu domínio
   - Para GitHub Pages: Vá para "Settings" > "Pages" e configure seu domínio personalizado

## 🔒 Configuração de HTTPS

A maioria das plataformas de hospedagem oferece HTTPS gratuito através do Let's Encrypt. Para configurar HTTPS manualmente:

1. Obtenha um certificado SSL (gratuito através do Let's Encrypt):
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```
2. Configure o servidor web para usar HTTPS:
   - Para Apache, adicione ao arquivo `.htaccess`:
     ```
     RewriteEngine On
     RewriteCond %{HTTPS} off
     RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
     ```
   - Para Nginx, configure o servidor:
     ```
     server {
       listen 443 ssl;
       server_name your-domain.com;
       ssl_certificate /path/to/cert.pem;
       ssl_certificate_key /path/to/key.pem;
       root /path/to/your/app;
       index index.html;
       location / {
         try_files $uri $uri/ /index.html;
       }
     }
     ```

## 🔍 Monitoramento e Análise

Após a implantação, é importante monitorar o desempenho da aplicação:

1. **Vercel Analytics**: O Vercel oferece análises integradas para monitorar o desempenho da aplicação.
2. **Google Analytics**: Adicione o Google Analytics para monitorar o tráfego e o comportamento dos usuários.
3. **Sentry**: Use o Sentry para monitorar erros e exceções.

## 🚀 Otimização de Desempenho

Para otimizar o desempenho da aplicação após a implantação:

1. **CDN**: Use uma CDN para entregar conteúdo estático mais rapidamente.
2. **Cache**: Configure o cache para reduzir o tempo de carregamento.
3. **Compressão**: Habilite a compressão GZIP para reduzir o tamanho dos arquivos.
4. **Otimização de Imagens**: Otimize as imagens para reduzir o tempo de carregamento.

## 🔧 Solução de Problemas

Se você encontrar problemas durante a implantação, aqui estão algumas soluções comuns:

1. **Erro de Build**: Verifique os logs de build para identificar o problema.
2. **Erro 404**: Verifique se as rotas estão configuradas corretamente.
3. **Erro de CORS**: Configure os cabeçalhos CORS corretamente.
4. **Erro de DNS**: Verifique se os registros DNS estão configurados corretamente.

---

Este documento fornece uma visão geral de como implantar o City Pop Girl Player em diferentes plataformas. Para mais detalhes, consulte a documentação oficial das plataformas de hospedagem. 