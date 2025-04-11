# Adicionando Novos Vídeos à Playlist

Este documento explica como adicionar novos vídeos à playlist do City Pop Girl Player, incluindo informações sobre o formato dos dados, como obter a duração do vídeo e como escolher uma cor de tema apropriada.

## 📊 Visão Geral

A playlist do City Pop Girl Player é definida no arquivo `src/constants/videos.ts`. Cada vídeo na playlist é representado por um objeto com as seguintes propriedades:

- `url`: URL do vídeo no YouTube
- `duration`: Duração do vídeo em segundos
- `themeColor`: Cor do tema associada ao vídeo
- `title`: Título do vídeo

## 📝 Formato dos Dados

O formato dos dados para um vídeo na playlist é o seguinte:

```tsx
{
    url: "https://www.youtube.com/watch?v=VIDEO_ID",
    duration: DURATION_IN_SECONDS,
    themeColor: "#HEX_COLOR", // cor do tema
    title: "Título do Vídeo"
}
```

## 🔍 Como Adicionar um Novo Vídeo

Para adicionar um novo vídeo à playlist, siga estas etapas:

1. Abra o arquivo `src/constants/videos.ts`
2. Adicione um novo objeto ao array `playlist` com as propriedades necessárias
3. Certifique-se de que o objeto siga o formato correto

Exemplo:

```tsx
export const playlist = [
    // ... vídeos existentes
    {
        url: "https://www.youtube.com/watch?v=NEW_VIDEO_ID",
        duration: 3600, // 1 hora em segundos
        themeColor: "#ff00ff", // magenta neon
        title: "City Pop Girl Mix - Novo Mix"
    },
];
```

## ⏱️ Como Obter a Duração do Vídeo

Para obter a duração exata de um vídeo do YouTube, você pode usar uma das seguintes métodos:

### Método 1: Usando a API do YouTube

1. Acesse a [API do YouTube Data](https://developers.google.com/youtube/v3/docs/videos/list)
2. Faça uma solicitação para obter informações sobre o vídeo usando o ID do vídeo
3. A duração do vídeo será retornada no formato ISO 8601 (ex: PT1H2M10S)
4. Converta a duração para segundos

### Método 2: Usando o Player do YouTube

1. Abra o vídeo no YouTube
2. Clique com o botão direito no player e selecione "Inspecionar"
3. Procure pelo elemento `<video>` ou pelo atributo `data-duration`
4. A duração será exibida em segundos

### Método 3: Usando Ferramentas Online

Existem várias ferramentas online que podem ajudar a obter a duração de um vídeo do YouTube, como:

- [YouTube Duration](https://ytduration.com/)
- [YouTube Video Info](https://ytvideodownloader.com/youtube-video-info)

## 🎨 Como Escolher uma Cor de Tema

A cor do tema deve ser escolhida com base nas seguintes considerações:

1. **Contraste**: A cor deve ter contraste suficiente com o texto branco
2. **Estética**: A cor deve combinar com o estilo visual do vídeo
3. **Consistência**: A cor deve ser consistente com as outras cores da playlist

### Paleta de Cores Atual

A playlist atual utiliza as seguintes cores:

- Rosa Neon: `#ff00cc`
- Roxo Neon: `#a066ff`
- Azul Claro Neon: `#0099ff`
- Ciano Neon: `#00ffff`
- Rosa Quente: `#ff6ec7`
- Verde Limão Neon: `#39ff14`
- Laranja Neon: `#ffaa00`

### Ferramentas para Escolher Cores

Existem várias ferramentas online que podem ajudar a escolher uma cor, como:

- [Color Picker](https://htmlcolorcodes.com/color-picker/)
- [Adobe Color](https://color.adobe.com/)
- [Coolors](https://coolors.co/)

## 🔄 Ordem dos Vídeos

A ordem dos vídeos na playlist determina a ordem em que eles serão reproduzidos. O sistema de sincronização de tempo calcula qual vídeo deve ser reproduzido com base no tempo decorrido desde o timestamp de referência.

Se você quiser alterar a ordem dos vídeos, basta reorganizar os objetos no array `playlist`.

## ⚠️ Considerações Importantes

### Direitos Autorais

Certifique-se de que você tem permissão para usar o vídeo na playlist. O uso de vídeos sem permissão pode resultar em problemas de direitos autorais.

### Limitações da API do YouTube

A API do YouTube tem limites de uso. Se você estiver adicionando muitos vídeos, considere usar um método alternativo para obter a duração dos vídeos.

### Tamanho da Playlist

O tamanho da playlist afeta o tempo de carregamento da aplicação. Se a playlist for muito grande, considere dividir os vídeos em várias playlists ou implementar um sistema de carregamento sob demanda.

## 🚀 Exemplo Completo

Aqui está um exemplo completo de como adicionar um novo vídeo à playlist:

```tsx
export const playlist = [
    {
        url: "https://www.youtube.com/watch?v=g9D5ECoAl_8",
        duration: 3640,
        themeColor: "#ff00cc", // pink neon
        title: "City Pop Girl Mix - Groovy Drive"
    },
    // ... outros vídeos
    {
        url: "https://www.youtube.com/watch?v=NEW_VIDEO_ID",
        duration: 3600, // 1 hora em segundos
        themeColor: "#ff00ff", // magenta neon
        title: "City Pop Girl Mix - Novo Mix"
    },
];
```

## 🔧 Testando a Playlist

Após adicionar um novo vídeo à playlist, você deve testar a aplicação para garantir que o vídeo seja reproduzido corretamente. Verifique os seguintes aspectos:

1. O vídeo é carregado corretamente
2. A cor do tema é aplicada corretamente
3. O título do vídeo é exibido corretamente
4. A transição para o próximo vídeo ocorre corretamente

---

Este documento fornece uma visão geral de como adicionar novos vídeos à playlist do City Pop Girl Player. Para mais detalhes, consulte o código-fonte e os comentários nos arquivos. 