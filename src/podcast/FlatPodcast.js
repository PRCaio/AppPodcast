import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default props => {
	return (
		<View style={{backgroundColor: '#1b1c42'}}>
			<ImageBackground style={styles.albumCover} source={{ uri: props.imageSource }}>
				<View style={styles.controls}>
					<LinearGradient colors={['transparent', 'black']} style={styles.linearGradient}>
						<View style={{ justifyContent: 'center' }}>
							{props.isPlaying ? (
								<TouchableOpacity style={styles.control} onPress={() => props.pause()}>
									<AntDesign name="pausecircleo" size={35} color="#faf0e6" />
								</TouchableOpacity>
							) : (
								<TouchableOpacity style={styles.control} onPress={() => props.play()}>
									<AntDesign name="play" size={35} color="#faf0e6" />
								</TouchableOpacity>
							)}
						</View>
						<View style={{ justifyContent: 'center', margin: 15 }}>
							<TouchableOpacity onPress={() => props.setting()}>
								<Text style={styles.largeText}>{props.title}</Text>
								<Text style={styles.smallText}>{props.source} </Text>
							</TouchableOpacity>
						</View>
					</LinearGradient>
				</View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	albumCover: {
		width: '100%',
		height: 120,
		justifyContent: 'flex-end',
	},
	largeText: {
		fontSize: 20,
		color: 'white',
		shadowColor: 'black'
	},
	smallText: {
		fontSize: 16,
		color: '#a9a9a9'
	},
	control: {
		margin: 25,
		opacity: 0.99,
	},
	controls: {
		flexDirection: 'row'
	},
	linearGradient: {
		alignContent: 'flex-end',
		flexDirection: 'row',
		borderRadius: 0,
		height: 95,
		width: '100%'
	}
});
