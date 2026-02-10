# City Pop Girl Player 🎵

Um rádio web e estilizado para fãs de City Pop Girl.

![City Pop Girl Player](https://imgur.com/vtTiJEK.png)

## 📋 Índice

- [City Pop Girl Player 🎵](#city-pop-girl-player-)
  - [📋 Índice](#-índice)
  - [🎯 Visão Geral](#-visão-geral)
  - [✨ Funcionalidades](#-funcionalidades)
  - [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
  - [📁 Estrutura do Projeto](#-estrutura-do-projeto)
  - [🚀 Instalação](#-instalação)
    - [Pré-requisitos](#pré-requisitos)
    - [Passos para Instalação](#passos-para-instalação)
  - [💻 Uso](#-uso)
    - [Reprodução de Vídeos](#reprodução-de-vídeos)
    - [Controle de Volume](#controle-de-volume)
  - [🤝 Contribuição](#-contribuição)
  - [📄 Licença](#-licença)

## 🎯 Visão Geral

City Pop Girl Player é uma aplicação web que reproduz uma playlist de músicas City Pop Girl em um player de vídeo estilizado. A aplicação sincroniza automaticamente o tempo de reprodução com um timestamp de referência, garantindo que todos os usuários estejam ouvindo a mesma parte da música ao mesmo tempo.

## ✨ Funcionalidades

- **Reprodução Sincronizada (Ao vivo)**: Todos os usuários ouvem a mesma parte da música ao mesmo tempo
- **Modo Livre**: Um botão alterna para controle manual (troca de faixa) e permite voltar ao ao vivo
- **Interface Estilizada**: Design moderno com efeitos visuais neon que mudam de acordo com a música
- **Controle de Volume**: Ajuste de volume com indicador visual
- **Links Sociais**: Acesso rápido às redes sociais do City Pop Girl

## 🛠️ Tecnologias Utilizadas

- **Framework**: [Next.js](https://nextjs.org/) (v15.3.0)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Reprodução de Vídeo**: [React Player](https://github.com/cookpete/react-player)
- **Ícones**: [Phosphor Icons](https://phosphoricons.com/)
- **Fontes**: [Geist](https://vercel.com/font)

## 📁 Estrutura do Projeto

```
city-girl-pop-player/
├── public/                  # Arquivos estáticos
├── src/
│   ├── app/                 # Páginas e layouts da aplicação
│   │   ├── layout.tsx       # Layout principal
│   │   ├── page.tsx         # Página inicial
│   │   └── globals.css      # Estilos globais
│   ├── components/          # Componentes React
│   │   ├── common/          # Componentes comuns
│   │   │   ├── Footer.tsx   # Rodapé da aplicação
│   │   │   └── SocialLinks.tsx # Links para redes sociais
│   │   ├── player/          # Componentes do player
│   │   │   ├── BackgroundVideo.tsx # Vídeo de fundo
│   │   │   ├── MainPlayer.tsx # Player principal
│   │   │   ├── MutedNotice.tsx # Aviso de mudo
│   │   │   ├── VideoTitle.tsx # Título do vídeo
│   │   │   └── VolumeControl.tsx # Controle de volume
│   │   └── VideoPlayer.tsx  # Componente principal do player
│   ├── constants/           # Constantes da aplicação
│   │   └── videos.ts        # Lista de vídeos
│   ├── hooks/               # Hooks personalizados
│   │   ├── useServerTimeOffset.ts # Sincroniza relógio com o servidor
│   │   ├── usePlayerSync.ts # Correção de drift/seek no player
│   │   └── useVolume.ts     # Hook para gerenciar o volume
│   └── utils/               # Funções utilitárias
├── .gitignore               # Arquivos ignorados pelo Git
├── next.config.ts           # Configuração do Next.js
├── package.json             # Dependências e scripts
├── postcss.config.mjs       # Configuração do PostCSS
├── tailwind.config.ts       # Configuração do Tailwind CSS
└── tsconfig.json            # Configuração do TypeScript
```

## 🚀 Instalação

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn

### Passos para Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/city-girl-pop-player.git
   cd city-girl-pop-player
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Acesse a aplicação em `http://localhost:3000`

## 💻 Uso

### Reprodução de Vídeos

A aplicação reproduz automaticamente uma playlist de vídeos City Pop Girl. No modo **Ao vivo**, o tempo de reprodução é sincronizado via horário do servidor (Vercel) + um timestamp de referência, garantindo que todos os usuários estejam ouvindo a mesma parte da música ao mesmo tempo. No **Modo Livre**, você pode trocar de faixa manualmente e voltar ao **Ao vivo** quando quiser.

### Configuração do modo Ao vivo

- `NEXT_PUBLIC_STATION_EPOCH_MS`: timestamp (em ms) que define o “início” do ciclo da playlist. Se não definido, o app usa um valor padrão.

### Controle de Volume

- Use o controle deslizante para ajustar o volume
- Clique no ícone de alto-falante para alternar entre mudo e volume padrão
- O volume padrão é definido como 60% quando ativado

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença GNU 3.0 - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

Desenvolvido com 🩵 por [Maysu](https://maysu.xyz/)
