# Documentação de Componentes

Este documento fornece uma descrição detalhada dos componentes principais do City Pop Girl Player, incluindo suas props, comportamento e exemplos de uso.

## 📺 VideoPlayer

O componente principal que orquestra todos os outros componentes do player.

### Props

Não possui props, pois é o componente raiz.

### Comportamento

- Utiliza os hooks `useVideoTime` e `useVolume` para gerenciar o estado da aplicação
- Renderiza todos os componentes do player em uma estrutura hierárquica
- Aplica a cor do tema atual aos componentes que precisam dela

### Exemplo de Uso

```tsx
import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  return (
    <main>
      <VideoPlayer />
    </main>
  );
}
```

## 🎬 MainPlayer

O componente que renderiza o player de vídeo principal.

### Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `currentVideoIndex` | `number` | Índice do vídeo atual na playlist |
| `startTimeInVideo` | `number` | Tempo de início dentro do vídeo atual (em segundos) |
| `volume` | `number` | Volume atual (0-1) |
| `currentColor` | `string` | Cor do tema atual |

### Comportamento

- Renderiza o player de vídeo principal com controles visíveis
- Aplica a cor do tema atual à borda e ao efeito de brilho
- Utiliza o `ReactPlayer` para reproduzir o vídeo do YouTube

### Exemplo de Uso

```tsx
<MainPlayer
  currentVideoIndex={currentVideoIndex}
  startTimeInVideo={startTimeInVideo}
  volume={volume}
  currentColor={currentColor}
/>
```

## 🎥 BackgroundVideo

O componente que renderiza o vídeo de fundo desfocado.

### Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `currentVideoIndex` | `number` | Índice do vídeo atual na playlist |
| `startTimeInVideo` | `number` | Tempo de início dentro do vídeo atual (em segundos) |

### Comportamento

- Renderiza um player de vídeo desfocado como plano de fundo
- O vídeo é sempre reproduzido sem som
- Aplica efeitos de escala e desfoque para criar um efeito visual

### Exemplo de Uso

```tsx
<BackgroundVideo
  currentVideoIndex={currentVideoIndex}
  startTimeInVideo={startTimeInVideo}
/>
```

## 🔊 VolumeControl

O componente que renderiza o controle de volume.

### Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `volume` | `number` | Volume atual (0-1) |
| `currentColor` | `string` | Cor do tema atual |
| `onVolumeChange` | `(volume: number) => void` | Função chamada quando o volume é alterado |
| `onToggleMute` | `() => void` | Função chamada quando o mudo é alternado |

### Comportamento

- Renderiza um controle deslizante para ajustar o volume
- Exibe um ícone que muda de acordo com o nível de volume
- Aplica a cor do tema atual ao controle deslizante

### Exemplo de Uso

```tsx
<VolumeControl
  volume={volume}
  currentColor={currentColor}
  onVolumeChange={setVolume}
  onToggleMute={toggleMute}
/>
```

## 🔇 MutedNotice

O componente que renderiza o aviso de mudo.

### Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `show` | `boolean` | Indica se o aviso deve ser exibido |
| `volume` | `number` | Volume atual (0-1) |
| `onToggleMute` | `() => void` | Função chamada quando o aviso é clicado |

### Comportamento

- Renderiza um aviso quando o volume está zerado
- O aviso desaparece quando o volume é aumentado ou quando o usuário clica nele
- Aplica uma animação de "bounce" para chamar a atenção do usuário

### Exemplo de Uso

```tsx
<MutedNotice
  show={showMutedNotice}
  volume={volume}
  onToggleMute={toggleMute}
/>
```

## 📝 VideoTitle

O componente que renderiza o título do vídeo atual.

### Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `currentVideoIndex` | `number` | Índice do vídeo atual na playlist |

### Comportamento

- Renderiza o título do vídeo atual
- Aplica a cor do tema atual ao efeito de brilho do texto
- Aplica uma animação de "pulse" para destacar o título

### Exemplo de Uso

```tsx
<VideoTitle currentVideoIndex={currentVideoIndex} />
```

## 🔗 SocialLinks

O componente que renderiza os links para as redes sociais.

### Props

Não possui props.

### Comportamento

- Renderiza links para as redes sociais do City Pop Girl
- Os links são posicionados no canto superior direito da tela
- Aplica efeitos de hover para melhorar a interatividade

### Exemplo de Uso

```tsx
<SocialLinks />
```

## 👣 Footer

O componente que renderiza o rodapé da aplicação.

### Props

Não possui props.

### Comportamento

- Renderiza o rodapé da aplicação com informações de copyright e créditos
- Aplica um efeito de blur para melhorar a legibilidade
- Exibe o ano atual dinamicamente

### Exemplo de Uso

```tsx
<Footer />
```

## 🧩 Hooks Personalizados

### useVideoTime

Hook para gerenciar o tempo de reprodução do vídeo.

#### Retorno

| Prop | Tipo | Descrição |
|------|------|-----------|
| `currentVideoIndex` | `number` | Índice do vídeo atual na playlist |
| `startTimeInVideo` | `number` | Tempo de início dentro do vídeo atual (em segundos) |

#### Exemplo de Uso

```tsx
const { currentVideoIndex, startTimeInVideo } = useVideoTime();
```

### useVolume

Hook para gerenciar o volume do player.

#### Retorno

| Prop | Tipo | Descrição |
|------|------|-----------|
| `volume` | `number` | Volume atual (0-1) |
| `showMutedNotice` | `boolean` | Indica se o aviso de mudo deve ser exibido |
| `toggleMute` | `() => void` | Função para alternar o mudo |
| `setVolume` | `(volume: number) => void` | Função para definir o volume |
| `setShowMutedNotice` | `(show: boolean) => void` | Função para controlar a visibilidade do aviso de mudo |

#### Exemplo de Uso

```tsx
const { volume, showMutedNotice, toggleMute, setVolume, setShowMutedNotice } = useVolume();
```

---

Esta documentação fornece uma visão geral dos componentes principais do City Pop Girl Player. Para mais detalhes, consulte o código-fonte e os comentários nos arquivos. 