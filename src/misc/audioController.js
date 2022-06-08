import { Audio } from "expo-av";
export const playSound = async (idPlay, sound, setState, setAudioBooks, audioBooks, a, setSound, setIdPlay) => {
    if (idPlay.id === a.id) {
        sound.playAsync()
        setState({ isPlaying: true })
        setAudioBooks(
            audioBooks.map((audios) =>
                audios.id == a.id
                    ? {
                        ...audios,
                        isPlaying: true,
                    }
                    : {
                        ...audios,
                    }
            )
        );
    } else {
        playPause(a, setSound, idPlay, setAudioBooks, audioBooks, setIdPlay, setState)
    };
};

export const playPause = async (i, setSound, idPlay, setAudioBooks, audioBooks, setIdPlay, setState) => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({
        uri: i.uri
    }
    );
    const audioSound =
        audioBooks.find(obj => {
            return obj.id === i.id
    })
    setSound(sound);
    sound.playAsync();
    setAudioBooks(
        audioBooks.map((audios) =>
            audios.id == i.id
                ? {
                    ...audios,
                    isPlaying: !audioSound.isPlaying,
                }
                : {
                    ...audios,
                    isPlaying: false,
                }
        )
    );
    setState({ isPlaying: true });
    setIdPlay({ id: i.id });
};

export const pauseSound = (sound, setState, setAudioBooks, audioBooks, e) => {
    sound.pauseAsync()
    setState({ isPlaying: false })
    setAudioBooks(
        audioBooks.map((audios) =>
            audios.id == e.id
                ? {
                    ...audios,
                    isPlaying: false,
                }
                : {
                    ...audios,
                }
        )
    );
};