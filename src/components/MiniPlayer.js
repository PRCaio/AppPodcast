import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useAudio } from './../context/AudioProvider'
import { pauseSound, playSound } from '../misc/audioController'

export default props => {
	const {
		audioBooks,
		setAudioBooks,
		state,
		setState,
		idPlay,
		setIdPlay,
		sound,
		setSound
	} = useAudio();

	const audioSound =

		audioBooks.find(obj => {
			return obj.id === idPlay.id
	})

	return (
		<View style={{
			flexDirection: 'row',
			borderRadius: 0,
			width: '100%',
			backgroundColor: '#121212',
			opacity: 0.95,
			height: idPlay.id == null ? '0%' : '7%'
			}}>
			<View style={{ justifyContent: 'center', flex: 1, marginLeft: 25 }}>
				{state.isPlaying ? (
					<TouchableOpacity onPress={
						() => idPlay.id == null ? null : pauseSound(sound, setState, setAudioBooks, audioBooks, idPlay)}>
						<AntDesign name="pausecircleo" size={35} color="#faf0e6" />
					</TouchableOpacity>
				) : (
					<TouchableOpacity style={{ opacity: 0.99 }} onPress={
						() => idPlay.id == null ? null : playSound(idPlay, sound, setState, setAudioBooks, audioBooks, audioSound, setSound, setIdPlay)}>
						<AntDesign name="play" size={35} color="#faf0e6" />
					</TouchableOpacity>
				)}
			</View>
			<View style={{ justifyContent: 'center', flex: 4, marginLeft: 15 }}>
				<TouchableOpacity >
					<Text style={styles.largeText}>{idPlay.id == null ? '---' : audioSound.title} </Text>
					<Text style={styles.smallText}>{idPlay.id == null ? '---' : audioSound.source} </Text>
				</TouchableOpacity>
			</View>
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

})
