import React, { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios';
import url from './url';

const initialState = {
	isPlaying: false,
	id: null
	};

const AudioContext = createContext();

export default function AudioProvider({ children }) {  
  const [count, setCount] = useState(false);
  const [audioBooks, setAudioBooks] = useState([]);
  const [state, setState] = useState(initialState);
  const [idPlay, setIdPlay] = useState({id: null});
  const [sound, setSound] = React.useState();
  const [position, setPosition] = useState(1);
  const [playbackDuration, setPlaybackDuration] = useState(1);
  const [positionMillis, setPositionMillis] = useState(null);
  const [playerVisible, setPlayerVisible] = useState({playerVisible: false});
  const [playList, setPlayList] = useState([]);

  async function getPlayList() {
    
    if(count == false ){
      await axios.get(url)
      .then(response => {
        setAudioBooks(response.data.playList)
      })
      .catch(error => console.log(error))        
    }
    setCount(true)
  };  

  React.useEffect(() => {
    return sound
    ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();        
      }        
    : undefined;
    }, [sound]);

  useEffect(()=>{
    getPlayList()
  }
  );  
   
  return (
    <AudioContext.Provider
      value={{
        count,
        audioBooks,
        state,
        idPlay, 
        sound,
        position,
        playbackDuration,
        positionMillis,
        playerVisible, 
        playList, 
        setPlayList,
        setPlayerVisible, 
        setPositionMillis,
        setPlaybackDuration, 
        setPosition, 
        setSound,
        setIdPlay,
        setState,
        setAudioBooks,
        setCount
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useCount must be used within a CountProvider");
  const { count, setCount, audioBooks, setAudioBooks, state, setState, idPlay, setIdPlay, sound, setSound, position, setPosition, playbackDuration, setPlaybackDuration, positionMillis, setPositionMillis, playerVisible, setPlayerVisible, playList, setPlayList } = context;
  return { count, setCount, audioBooks, setAudioBooks, state, setState, idPlay, setIdPlay, sound, setSound, position, setPosition, playbackDuration, setPlaybackDuration, positionMillis, setPositionMillis, playerVisible, setPlayerVisible, playList, setPlayList };
};