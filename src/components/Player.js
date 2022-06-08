import React, { useState, useEffect } from 'react'
import { StyleSheet, Dimensions, TouchableOpacity, View, Image, Text } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useAudio } from './../context/AudioProvider'
import { pauseSound, playSound } from '../misc/audioController'
import Slider from '@react-native-community/slider'
import Svg, { G, Circle } from 'react-native-svg'

export default props => {
  const {
    audioBooks,
    setAudioBooks,
    state,
    setState,
    idPlay,
    setIdPlay,
    sound,
    setSound,
    playbackDuration,
    setPlayerVisible,
    playList,
    setPlayList
  } = useAudio();
  const size = 70;
  const circleSizes = [{ strokeWidth: 4, center: size / 2, radius: size / 2 - 2, circunference: 2 * Math.PI * size / 2 - 2 }]
  const [one, setOne] = useState(false)
  const [positionBar, setPositionBar] = useState(1)
  const [durationAudio, setdurationAudio] = useState(1)
  const [som, setSom] = useState({ switchValue: props.downloadDone, uri: null })


  // const toggleSwitch = async () => {
  //   setSom({ switchValue: !som.switchValue }) 
  //   const result =
  //     playList.find(obj => {
  //       return obj.id === props.id
  //     })

  //   if (result.file === null) {
  //     const { sound } = await Audio.Sound.createAsync({
  //       uri: result.uri
  //     }
  //     );
  //     setPlayList(
  //       playList.map((audios) =>
  //         audios.id == props.id
  //           ? {
  //             ...audios,
  //             file: sound,
  //             downloadDone: true
  //           }
  //           : {
  //             ...audios,
  //           }
  //       )
  //     );

  //   }else{
  //     result.file.pauseAsync()
  //     setPlayList(
  //       playList.map((audios) =>
  //         audios.id == props.id
  //           ? {
  //             ...audios,
  //             file: null,
  //             downloadDone: false
  //           }
  //           : {
  //             ...audios,
  //           }
  //       )
  //     )
  //   }
  // };

  const mayPlay = async () => {
    const played = await sound.getStatusAsync()
    setPositionBar(played["positionMillis"])
    if (one === false) {
      setdurationAudio(played["durationMillis"])
      setOne(true)
    }
  }

  const playNow = async (a) => {
    if (a.id === props.id) {
      mayPlay()
    }
  };

  useEffect(() =>
    playNow(idPlay)
  )

  const onStart = () => {
    sound.pauseAsync()
  }

  const duration = (a) => {
    sound.setPositionAsync(a * durationAudio)
    playSound(idPlay, sound, setState, setAudioBooks, audioBooks, audioSound, setSound, setIdPlay)
    setTimeout(() => playNow(idPlay), 1000)
  }
  const renderCurrentTime = () => {
    return positionBar / durationAudio
  };

  const seconds = (position) => {
    const result = Math.floor(position % 60000 / 1000)
    return String(result).padStart(2, '0')
  }
  // const seconds = (position) => {
  //   if (parseInt(position / 1000) - parseInt(position / 60000) * 60 < 10) {
  //     return `0${parseInt(position / 1000) - parseInt(position / 60000) * 60}`
  //   } else {
  //     return parseInt(position / 1000) - parseInt(position / 60000) * 60
  //   }
  // }
  const reset = () => {
    props.resetData()
    setPlayerVisible({ playerVisible: false })
  }

  const audioSound = audioBooks.find(obj => {
    return obj.id === props.id
  })
  return (
    <View style={{
      width: '100%',
      backgroundColor: '#1b1c42',
      alignItems: 'center',
    }}>
      <View style={{
        width: '100%',
        height: 60,
        backgroundColor: '#1b1c42',
        alignItems: 'flex-start',
        padding: 5,
        justifyContent: 'center'
      }}>
        <TouchableOpacity style={{ alignItems: 'flex-start', borderStartWidth: 20, borderColor: 'transparent', width: 60, height: 60, justifyContent: 'center' }} onPress={
          () => reset()}>
          <AntDesign name="left" size={24} color="#FFFF" />
        </TouchableOpacity>
      </View>
      <View style={{
        width: '100%',
        backgroundColor: '#1b1c42',
        alignItems: 'center',
        height: 10

      }}></View>
      <View style={styles.imageBox}>
        <Image style={styles.image} source={{ uri: props.imageSource }}></Image>
      </View>
      {/* <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ alignItems: 'flex-end', width: Dimensions.get("screen").width * 0.50, justifyContent: 'center' }}>
          {som.switchValue ? (<Text style={styles.smallText}>Baixados</Text>) : <Text style={styles.smallText}>Baixar </Text>}

        </View>
        <View style={{ alignItems: 'flex-start', width: Dimensions.get("screen").width * 0.50, justifyContent: 'center' }}>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={som.switchValue ? '#004dcf' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch()}
            value={som.switchValue}
          />
        </View>

      </View> */}
      <View>
        <Slider
          style={{ width: Dimensions.get("screen").width * 0.7, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          thumbTintColor="#FFFFFF"
          value={renderCurrentTime()}
          onSlidingStart={() => onStart()}
          onSlidingComplete={value => duration(value)}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ alignItems: 'flex-start', width: Dimensions.get("screen").width * 0.32 }}>
          <Text style={styles.smallText}> {parseInt(positionBar / 60000)}:{seconds(positionBar)}</Text>
        </View>
        <View style={{ alignItems: 'flex-end', width: Dimensions.get("screen").width * 0.32 }}>
          <Text style={styles.smallText}> {parseInt(durationAudio / 60000)}:{seconds(durationAudio)}</Text>
        </View>
      </View>
      <View style={{
        width: '100%',
        backgroundColor: '#1b1c42',
        alignItems: 'center',
        height: 60
      }}>
        <Svg width={size} height={size}>
          <G rotation="-90" origin={circleSizes[0].center}>
            <Circle stroke="#004dcf" cx={circleSizes[0].center} cy={circleSizes[0].center} r={circleSizes[0].radius} strokeWidth={circleSizes[0].strokeWidth} />
            <Circle
              stroke="#FFFF"
              cx={circleSizes[0].center}
              cy={circleSizes[0].center}
              r={circleSizes[0].radius}
              strokeWidth={circleSizes[0].strokeWidth}
              strokeDasharray={circleSizes[0].circunference}
              strokeDashoffset={circleSizes[0].circunference - (circleSizes[0].circunference * positionBar) / durationAudio}
            />
          </G>
        </Svg>
        {state.isPlaying & props.id === idPlay.id ? (
          <TouchableOpacity style={styles.button} onPress={
            () => pauseSound(sound, setState, setAudioBooks, audioBooks, idPlay)}>
            <Ionicons name="pause-outline" size={55} color="#faf0e6" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={
            () => playSound(idPlay, sound, setState, setAudioBooks, audioBooks, audioSound, setSound, setIdPlay)}>
            <AntDesign name="play" size={55} color="#faf0e6" />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={styles.largeText}>{props.title} </Text>
        <Text style={styles.smallText}>{props.source} </Text>
        <Text style={styles.smallText}> </Text>
      </View>
      <View style={{
        width: '100%',
        backgroundColor: '#1b1c42',
        alignItems: 'center',
        height: 300
      }}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  largeText: {
    fontSize: 20,
    color: 'white',
    shadowColor: 'black'
  },
  smallText: {
    fontSize: 16,
    color: '#a9a9a9'
  },
  image: {
    alignItems: 'center',
    width: '100%',
    height: Dimensions.get("screen").width * 0.7,
    borderRadius: 0,
    shadowColor: 'black',
    borderWidth: 0,
    borderColor: 'black'
  },
  imageBox: {
    width: '70%',
    height: Dimensions.get('screen').width * 0.8

  },
  button: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderRadius: 70,
    padding: 7
  }

})
