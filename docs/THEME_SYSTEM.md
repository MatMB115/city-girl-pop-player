# Sistema de Temas

Este documento explica em detalhes o sistema de temas implementado no City Pop Girl Player, que proporciona uma experiência visual dinâmica e imersiva.

## 📊 Visão Geral

O sistema de temas do City Pop Girl Player utiliza cores neon vibrantes que mudam de acordo com o vídeo atual. Cada vídeo na playlist possui uma cor de tema associada, que é aplicada a vários elementos da interface para criar uma experiência visual coesa e imersiva.

## 🎨 Definição dos Temas

Os temas são definidos no arquivo `src/constants/videos.ts`, onde cada vídeo na playlist possui uma propriedade `themeColor` que define a cor do tema:

```tsx
export const playlist = [
    {
        url: "https://www.youtube.com/watch?v=g9D5ECoAl_8",
        duration: 3640,
        themeColor: "#ff00cc", // pink neon
        title: "City Pop Girl Mix - Groovy Drive"
    },
    {
        url: "https://www.youtube.com/watch?v=AAJpz0iEkEI",
        duration: 3900,
        themeColor: "#a066ff", // purple neon
        title: "City Pop Girl Mix - Cosmos Patrol"
    },
    // ... outros vídeos
];
```

## 🔄 Aplicação dos Temas

O tema atual é obtido no componente `VideoPlayer` com base no índice do vídeo atual:

```tsx
const { currentVideoIndex, startTimeInVideo } = useVideoTime();
const currentColor = playlist[currentVideoIndex].themeColor;
```

Este valor é então passado para os componentes que precisam aplicar o tema:

```tsx
<MainPlayer
    currentVideoIndex={currentVideoIndex}
    startTimeInVideo={startTimeInVideo}
    volume={volume}
    currentColor={currentColor}
/>
```

## 🎯 Elementos que Utilizam o Tema

### MainPlayer

O componente `MainPlayer` aplica a cor do tema à borda e ao efeito de brilho do player:

```tsx
<div
    className={`w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border-4`}
    style={{
        borderColor: currentColor,
        boxShadow: `0 0 15px 4px ${currentColor}, 0 0 30px 8px ${currentColor}33`,
    }}
>
    {/* ... */}
</div>
```

### VideoTitle

O componente `VideoTitle` aplica a cor do tema ao efeito de brilho do texto:

```tsx
<h1
    className="text-xl sm:text-2xl md:text-3xl font-bold text-white animate-pulse"
    style={{
        textShadow: `0 0 10px ${currentVideo.themeColor}, 0 0 20px ${currentVideo.themeColor}, 0 0 30px ${currentVideo.themeColor}`
    }}
>
    {currentVideo.title}
</h1>
```

### VolumeControl

O componente `VolumeControl` aplica a cor do tema ao controle deslizante:

```tsx
<input
    type="range"
    min={0}
    max={1}
    step={0.01}
    value={volume}
    onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
    className="w-40"
    style={{ accentColor: currentColor }}
/>
```

## 🎭 Efeitos Visuais

O sistema de temas é complementado por vários efeitos visuais que melhoram a experiência do usuário:

### Efeito de Brilho (Glow)

O efeito de brilho é aplicado à borda do player e ao texto do título, criando um halo luminoso ao redor desses elementos:

```tsx
boxShadow: `0 0 15px 4px ${currentColor}, 0 0 30px 8px ${currentColor}33`
```

```tsx
textShadow: `0 0 10px ${currentVideo.themeColor}, 0 0 20px ${currentVideo.themeColor}, 0 0 30px ${currentVideo.themeColor}`
```

### Efeito de Pulsação (Pulse)

O efeito de pulsação é aplicado ao título do vídeo, fazendo com que ele "pulse" suavemente:

```tsx
className="text-xl sm:text-2xl md:text-3xl font-bold text-white animate-pulse"
```

### Efeito de Desfoque (Blur)

O efeito de desfoque é aplicado ao vídeo de fundo, criando um efeito visual interessante:

```tsx
className="absolute inset-0 z-0 scale-[3] sm:scale-[2] md:scale-[1.2] filter blur-[2px] md:blur-xs opacity-60"
```

## 🎨 Paleta de Cores

A paleta de cores utilizada no City Pop Girl Player é composta por cores neon vibrantes:

- Rosa Neon: `#ff00cc`
- Roxo Neon: `#a066ff`
- Azul Claro Neon: `#0099ff`
- Ciano Neon: `#00ffff`
- Rosa Quente: `#ff6ec7`
- Verde Limão Neon: `#39ff14`
- Laranja Neon: `#ffaa00`

## 🔄 Transição entre Temas

Quando o vídeo muda, o tema também muda automaticamente. Como a mudança de vídeo é controlada pelo sistema de sincronização de tempo, a transição entre temas é sincronizada para todos os usuários.

## 🎨 Personalização

O sistema de temas pode ser personalizado alterando as cores dos temas no arquivo `src/constants/videos.ts`. Isso permite ajustar a aparência visual da aplicação conforme necessário.

## 🚀 Limitações e Melhorias Futuras

O sistema atual de temas tem algumas limitações que podem ser melhoradas em versões futuras:

1. **Transição Suave**: Implementar uma transição suave entre temas para uma experiência visual mais agradável.
2. **Temas Personalizados**: Permitir que os usuários escolham seus próprios temas.
3. **Temas Dinâmicos**: Implementar temas que mudam com base em outros fatores, como hora do dia ou condições climáticas.
4. **Temas Acessíveis**: Garantir que os temas sejam acessíveis para usuários com deficiências visuais.

---

Este documento fornece uma visão geral do sistema de temas implementado no City Pop Girl Player. Para mais detalhes, consulte o código-fonte e os comentários nos arquivos. 