# Sistema de Sincronização de Tempo

Este documento explica em detalhes o sistema de sincronização de tempo implementado no City Pop Girl Player, que garante que todos os usuários estejam ouvindo a mesma parte da música ao mesmo tempo.

## 📊 Visão Geral

O sistema de sincronização de tempo do City Pop Girl Player utiliza um timestamp de referência fixo para calcular o tempo atual de reprodução. Isso garante que todos os usuários, independentemente de quando acessaram a aplicação, estejam ouvindo a mesma parte da música ao mesmo tempo.

## 🔢 Cálculo do Tempo

O cálculo do tempo é realizado no hook `useVideoTime`, que utiliza a seguinte lógica:

1. Define um timestamp de referência fixo (1º de janeiro de 2025, 00:00:00 UTC)
2. Calcula o tempo decorrido desde o timestamp de referência até o momento atual
3. Calcula o tempo total da playlist somando a duração de todos os vídeos
4. Calcula o tempo atual dentro do ciclo da playlist usando o operador módulo
5. Determina qual vídeo está sendo reproduzido e o tempo de início dentro desse vídeo

```tsx
const REFERENCE_TIMESTAMP = new Date("2025-01-01T00:00:00Z").getTime();

const calculateVideoTime = (): VideoTimeState => {
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - REFERENCE_TIMESTAMP) / 1000);

    const totalDuration = playlist.reduce((acc, vid) => acc + vid.duration, 0);
    let time = elapsedSeconds % totalDuration;

    // Find the current video based on elapsed time
    let index = 0;
    for (let i = 0; i < playlist.length; i++) {
        if (time < playlist[i].duration) {
            index = i;
            break;
        }
        time -= playlist[i].duration;
    }

    return { currentVideoIndex: index, startTimeInVideo: time };
};
```

## 🔄 Atualização do Tempo

O tempo é atualizado a cada segundo usando um intervalo:

```tsx
export const useVideoTime = (): VideoTimeState => {
    const [state, setState] = useState<VideoTimeState>(calculateVideoTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setState(calculateVideoTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return state;
};
```

## 🎬 Aplicação do Tempo

O tempo calculado é aplicado ao player de vídeo através da propriedade `start` do `ReactPlayer`:

```tsx
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
```

## ⏱️ Considerações sobre Precisão

O sistema de sincronização de tempo tem algumas considerações importantes:

1. **Precisão do Relógio do Cliente**: O sistema depende do relógio do cliente para calcular o tempo atual. Se o relógio do cliente estiver incorreto, a sincronização será afetada.

2. **Latência de Rede**: A latência de rede pode afetar a sincronização, especialmente em conexões lentas ou instáveis.

3. **Intervalo de Atualização**: O tempo é atualizado a cada segundo, o que pode resultar em um pequeno atraso na sincronização.

## 🔄 Transição entre Vídeos

Quando um vídeo termina, o sistema automaticamente avança para o próximo vídeo na playlist. Isso é garantido pelo cálculo do tempo, que determina qual vídeo deve ser reproduzido com base no tempo decorrido desde o timestamp de referência.

## 🧮 Exemplo de Cálculo

Vamos considerar um exemplo para ilustrar como o sistema funciona:

1. Timestamp de referência: 1º de janeiro de 2025, 00:00:00 UTC
2. Tempo atual: 1º de janeiro de 2025, 01:30:00 UTC
3. Tempo decorrido: 5400 segundos (1 hora e 30 minutos)
4. Duração total da playlist: 30000 segundos (aproximadamente 8 horas e 20 minutos)
5. Tempo atual dentro do ciclo: 5400 % 30000 = 5400 segundos
6. Vídeo atual: O primeiro vídeo (índice 0)
7. Tempo de início dentro do vídeo: 5400 segundos

## 🔧 Personalização

O sistema de sincronização de tempo pode ser personalizado alterando o timestamp de referência ou a duração dos vídeos na playlist. Isso permite ajustar o ciclo de reprodução conforme necessário.

## 🚀 Limitações e Melhorias Futuras

O sistema atual tem algumas limitações que podem ser melhoradas em versões futuras:

1. **Sincronização com Servidor**: Implementar uma sincronização com um servidor para garantir maior precisão.
2. **Compensação de Latência**: Adicionar mecanismos para compensar a latência de rede.
3. **Intervalo de Atualização Variável**: Ajustar o intervalo de atualização com base na latência de rede.
4. **Detecção de Desincronização**: Implementar mecanismos para detectar e corrigir desincronizações.

---

Este documento fornece uma visão geral do sistema de sincronização de tempo implementado no City Pop Girl Player. Para mais detalhes, consulte o código-fonte e os comentários nos arquivos. 