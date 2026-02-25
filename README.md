# City Pop Girl Player

Aplicação web de rádio para fãs de City Pop Girl, com reprodução sincronizada em tempo real e modo livre para navegação manual da playlist.

![City Pop Girl Player](https://imgur.com/vtTiJEK.png)

## Visão Geral

O City Pop Girl Player reproduz uma playlist de mixes do YouTube com duas experiências de uso:

- `Live`: todos os usuários escutam o mesmo ponto da programação ao mesmo tempo.
- `Free`: o usuário pode navegar manualmente entre as faixas e voltar para o modo ao vivo quando quiser.

A sincronização do modo ao vivo combina:

- horário do cliente;
- ajuste de offset com o horário do servidor (`/api/time`);
- um timestamp de referência configurável por ambiente (`NEXT_PUBLIC_STATION_EPOCH_MS`).

## Funcionalidades

- Reprodução sincronizada em modo ao vivo.
- Modo livre com troca manual de faixa.
- Retorno instantâneo do modo livre para o modo ao vivo.
- Correção periódica de drift no player para manter sincronização.
- Tema visual dinâmico por faixa (cor, brilho e transições).
- Vídeo de fundo sincronizado com o player principal.
- Controle de volume com botão de mute/unmute.
- Links sociais para canais oficiais.

## Tecnologias

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- React Player
- Phosphor Icons

## Estrutura do Projeto

```text
city-girl-pop-player/
├── docs/
│   ├── ADDING_VIDEOS.md
│   └── THEME_SYSTEM.md
├── public/
├── src/
│   ├── app/
│   │   ├── api/time/route.ts
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── common/
│   │   └── player/
│   ├── constants/
│   │   └── videos.ts
│   ├── contexts/
│   │   └── VideoContext.tsx
│   └── hooks/
│       ├── usePlayerSync.ts
│       ├── useServerTimeOffset.ts
│       └── useVolume.ts
├── CONTRIBUTING.md
├── LICENSE
├── README.md
└── package.json
```

## Configuração

Variáveis de ambiente opcionais:

- `NEXT_PUBLIC_STATION_EPOCH_MS`: timestamp em milissegundos que define o início do ciclo da estação.

Se não for definida, o projeto usa um valor padrão interno.

## Instalação

Pré-requisitos:

- Node.js 18+
- npm

Passos:

1. Clone o repositório.
2. Instale dependências.
3. Rode o ambiente de desenvolvimento.

```bash
git clone https://github.com/seu-usuario/city-girl-pop-player.git
cd city-girl-pop-player
npm install
npm run dev
```

Aplicação disponível em `http://localhost:3000`.

## Uso

- Modo `Live`: sincronização automática da programação.
- Modo `Free`: habilita navegação manual com botões de próxima/anterior.
- Botão `Back to Live`: retorna para a transmissão sincronizada.
- Controle de volume no canto inferior direito.

## Documentação Complementar

- [Como adicionar vídeos](docs/ADDING_VIDEOS.md)
- [Sistema de temas](docs/THEME_SYSTEM.md)

## Contribuição

Consulte [CONTRIBUTING.md](CONTRIBUTING.md) para fluxo de contribuição.

## Licença

Este projeto está licenciado sob GNU GPL v3. Consulte [LICENSE](LICENSE).

Desenvolvido por [Maysu](https://maysu.xyz/)
