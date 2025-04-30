# Guia de Contribuição para City Pop Girl Player

Este documento fornece informações técnicas detalhadas sobre o projeto City Pop Girl Player para desenvolvedores que desejam contribuir ou entender melhor o funcionamento interno da aplicação.

## 📚 Arquitetura Técnica

### Visão Geral

City Pop Girl Player é uma aplicação Next.js que utiliza React para criar uma interface de usuário interativa para reprodução de vídeos. A aplicação é construída com TypeScript para garantir tipagem estática e utiliza Tailwind CSS para estilização.

### Fluxo de Dados
1. **Gerenciamento de Estado**: O estado da aplicação é gerenciado através de hooks React personalizados.
2. **Reprodução de Vídeo**: O componente `ReactPlayer` é utilizado para reproduzir vídeos do YouTube.

## 🔧 Componentes Principais

### VideoPlayer

O componente principal que orquestra todos os outros componentes do player. Ele utiliza os hooks `useVolume` para gerenciar o estado da aplicação.

```tsx
export default function VideoPlayer() {
    const { volume, showMutedNotice, toggleMute, setVolume, setShowMutedNotice } = useVolume();
    const currentColor = playlist[currentVideoIndex].themeColor;

    return (
        <div className="flex flex-col h-screen">
            {/* Componentes do player */}
        </div>
    );
}
```

### MainPlayer e BackgroundVideo

Estes componentes utilizam o `ReactPlayer` para reproduzir o vídeo. O `MainPlayer` é o player principal com controles visíveis, enquanto o `BackgroundVideo` é um player de fundo desfocado.

```tsx
// Exemplo de MainPlayer
export const MainPlayer = ({
    currentVideoIndex,
    startTimeInVideo,
    volume,
    currentColor,
}: MainPlayerProps) => {
    const playerRef = useRef<ReactPlayer>(null);

    return (
        <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div
                className={`w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border-4`}
                style={{
                    borderColor: currentColor,
                    boxShadow: `0 0 15px 4px ${currentColor}, 0 0 30px 8px ${currentColor}33`,
                }}
            >
                <ReactPlayer
                    ref={playerRef}
                    url={playlist[currentVideoIndex].url}
                    playing
                    volume={volume}
                    controls={false}
                    loop
                    width="100%"
                    height="100%"
                    config={{
                        playerVars: {
                            start: startTimeInVideo,
                            modestbranding: 1,
                            rel: 0,
                        },
                    }}
                />
            </div>
        </div>
    );
};
```

## 🧩 Hooks Personalizados

### useVolume

Este hook gerencia o estado do volume e fornece funções para controlá-lo.

```tsx
export const useVolume = (): VolumeState => {
    const [volume, setVolume] = useState(0);
    const [showMutedNotice, setShowMutedNotice] = useState(true);

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(0.6);
        } else {
            setVolume(0);
        }
        setShowMutedNotice(false);
    };

    return {
        volume,
        showMutedNotice,
        toggleMute,
        setVolume,
        setShowMutedNotice,
    };
};
```

## 📊 Estrutura de Dados

### Playlist

A playlist é definida no arquivo `src/constants/videos.ts` e contém informações sobre cada vídeo, incluindo URL, duração, cor do tema e título.

```tsx
export const playlist = [
    {
        url: "https://www.youtube.com/watch?v=g9D5ECoAl_8",
        duration: 3640,
        themeColor: "#ff00cc", // pink neon
        title: "City Pop Girl Mix - Groovy Drive"
    },
    // ... outros vídeos
];
```

## 🔍 Padrões de Código

### Convenções de Nomenclatura

- **Componentes**: PascalCase (ex: `VideoPlayer`, `MainPlayer`)
- **Hooks**: camelCase com prefixo "use" (ex: `useVideoPlayer`, `useVolume`)
- **Funções**: camelCase (ex: `calculateVideoTime`, `toggleMute`)
- **Variáveis**: camelCase (ex: `currentVideoIndex`, `startTimeInVideo`)
- **Interfaces**: PascalCase (ex: `VideoTimeState`, `VolumeState`)

### Estrutura de Componentes

Os componentes seguem uma estrutura consistente:

1. Importações
2. Definição de interfaces
3. Definição do componente
4. Exportação

### Estilização

A aplicação utiliza Tailwind CSS para estilização. As classes são organizadas em ordem lógica:

1. Layout (flex, grid, position)
2. Dimensões (width, height)
3. Espaçamento (margin, padding)
4. Visual (background, border, shadow)
5. Tipografia (font, text)
6. Interatividade (hover, focus)

## 🚀 Processo de Desenvolvimento

### Configuração do Ambiente

1. Clone o repositório
2. Instale as dependências com `npm install` ou `yarn install`
3. Inicie o servidor de desenvolvimento com `npm run dev` ou `yarn dev`

### Fluxo de Trabalho Git

1. Crie uma branch a partir da `main` para sua feature ou correção
2. Faça commits frequentes com mensagens descritivas
3. Envie um Pull Request para a `main` quando estiver pronto

### Testes

Embora o projeto não tenha testes automatizados no momento, é recomendável adicionar testes para garantir a qualidade do código. Considere implementar:

- Testes unitários para hooks e funções utilitárias
- Testes de componentes para verificar a renderização e interações
- Testes de integração para verificar o fluxo completo da aplicação

## 🔧 Ferramentas Recomendadas

- **Editor**: VS Code com extensões para React, TypeScript e Tailwind CSS
- **DevTools**: React Developer Tools para depuração de componentes
- **Linting**: ESLint para garantir a qualidade do código
- **Formatação**: Prettier para formatação consistente do código

## 📝 Diretrizes para Pull Requests

1. **Escopo**: Cada PR deve focar em uma única funcionalidade ou correção
2. **Descrição**: Inclua uma descrição clara das alterações e o motivo
3. **Testes**: Verifique se as alterações funcionam conforme esperado
4. **Revisão**: Solicite revisão de pelo menos um outro desenvolvedor

## 🤝 Comunidade

- **Issues**: Use issues para reportar bugs ou sugerir melhorias
- **Discussões**: Participe de discussões para compartilhar ideias e obter ajuda
- **Contribuições**: Todas as contribuições são bem-vindas, desde pequenas correções até grandes melhorias

---

Obrigado por contribuir com o City Pop Girl Player! 🎵 