import React, { useState } from 'react';
import { Modal, Text, View, Button, TouchableOpacity, TouchableHighlight, Linking, FlatList, StyleSheet, Web, Dimensions, StatusBar, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import AudioProvider from './context/AudioProvider';
import FlatPodCast from './podcast/FlatPodcast';
import { useAudio } from './../src/context/AudioProvider';
import { pauseSound, playSound } from './misc/audioController';
import WebView from 'react-native-webview';
import MiniPlayer from './components/MiniPlayer';
import Player from './components/Player';

function Feed() {
    const {
        audioBooks,
        setAudioBooks,
        setState,
        idPlay,
        setIdPlay,
        sound,
        setSound,
        playerVisible,
        setPlayerVisible,
        playList,
        setPlayList
    } = useAudio();

    const [dataPlayer, setDataPlayer] = useState(null);

    const playSound1 = (a) => {

        setPlayList(
            playList.map((audios) =>
                audios.id == a.id
                    ? {
                        ...audios,
                        isPlaying: false,
                    }
                    : {
                        ...audios,
                        isPlaying: false,
                    }
            )
        );

        const objectIsPlaying =
            playList.find(obj => {
                return obj.isPlaying === true
            })

        if (objectIsPlaying != undefined) {
            objectIsPlaying.file.pauseAsync()
        }
        playSound(idPlay, sound, setState, setAudioBooks, audioBooks, a, setSound, setIdPlay)
        //const status = await sound.getStatusAsync()
        //console.log(status["durationMillis"])
        //console.log(status["positionMillis"])
    };

    const seePlayer = (a) => {
        const object =
            playList.find(obj => {
                return obj.id === a.id
            })

        const playListDownload = {
            id: a.id,
            author: a.author,
            imageSource: a.imageSource,
            isPlaying: false,
            source: a.source,
            title: a.title,
            uri: a.uri,
            downloadDone: false,
            file: null
        }
        if (object === undefined) {
            playList.push(playListDownload)
            console.log(object)
        }
        const result =
            playList.find(obj => {
                return obj.id === a.id
            })
        setDataPlayer(result)
        setPlayerVisible({ playerVisible: true })
    };


    return (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <View 
            style={{
                alignItems: 'center',
                width: Dimensions.get("screen").width,
                height: 60,
                borderRadius: 0,
                shadowColor: 'black',
                borderWidth: 0,
                borderColor: 'black',
                backgroundColor: '#121212',
                justifyContent: 'center'
                
            }} 
            >
           <Text style={{color: 'white', fontSize: 30, fontWeight: "bold"}}> #RELOADING </Text>
            </View>
            <View style={{ width: '100%', flex: 9 }}>
                <FlatList data={audioBooks}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <FlatPodCast
                            {...item}
                            setting={() => seePlayer(item)
                                /* () => navigation.navigate("Settings", item) */
                            }
                            play={() => playSound1(item)}
                            pause={() => pauseSound(sound, setState, setAudioBooks, audioBooks, idPlay)}
                        />
                    }>
                </FlatList>
            </View>
            <MiniPlayer />
            <Modal visible={playerVisible.playerVisible} animationType="slide" transparent={false}>
                <Player resetData={() => setDataPlayer(null)} {...dataPlayer}></Player>
            </Modal>
        </View>
    );
}


function Profile() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 7, justifyContent:'space-between', alignItems: 'center' }}>
                <View style={{ padding: 80}}>
                <TouchableHighlight onPress={()=> Linking.openURL('https://www.padrim.com.br/reloading')} style={{ width: Dimensions.get("screen").width * 0.95, alignItems: 'center' }}>
                    <Image style={{
                        alignItems: 'center',
                        width: Dimensions.get("screen").width * 0.70,
                        height: Dimensions.get("screen").height * 0.12,
                        borderRadius: 0,
                        shadowColor: 'black',
                        borderWidth: 0,
                        borderColor: 'black'
                    }} source={{ uri: 'http://reloading.com.br/wp-content/uploads/2018/11/Logotipo_colorido_horizontal.png'}}/>
                </TouchableHighlight>               
                </View>
                <View >
                <TouchableHighlight onPress={()=> Linking.openURL('https://app.picpay.com/user/reloading')} style={{ padding: 30, width: Dimensions.get("screen").width * 0.95, alignItems: 'center' }}>
                    <Image style={{
                        alignItems: 'center',
                        width: Dimensions.get("screen").width * 0.70,
                        height: Dimensions.get("screen").height * 0.10,
                        borderRadius: 0,
                        shadowColor: 'black',
                        borderWidth: 0,
                        borderColor: 'black',
                        
                    }} source={{ uri: 'http://reloading.com.br/wp-content/uploads/2018/12/PicPay-ReloadingBR-Podcast-300x100.png'}}/>
                </TouchableHighlight>               
                </View>
                <View style={{ padding: 50, justifyContent: 'center'}}>
                <TouchableHighlight onPress={()=> Linking.openURL('https://www.patreon.com/reloadingbr')} style={{justifyContent: 'center',height: Dimensions.get("screen").height * 0.2, width: Dimensions.get("screen").width * 0.95, alignItems: 'center' }}>
                    <Image style={{
                        alignItems: 'center',
                        width: Dimensions.get("screen").width * 0.68,
                        height: 60,
                        borderRadius: 0,
                        shadowColor: 'black',
                        borderWidth: 0,
                        borderColor: 'black',
                        
                    }} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Patreon_logo_with_wordmark.svg/1280px-Patreon_logo_with_wordmark.svg.png'}}/>
                </TouchableHighlight>               
                </View>

            </View>
            <MiniPlayer />
        </View>
    );
};

function WebScreen() {
    return (
        <WebView
            source={{
                uri: 'http://reloading.com.br/category/news/'
            }}
        />
    );
};
function Notifications() {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 7 }}>
                <WebScreen />
            </View>
            <MiniPlayer />
        </View>
    );
};

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Feed"
            activeColor="white"
            labelStyle={{ fontSize: 12 }}
            style={{ backgroundColor: 'tomato' }}
            barStyle={{ backgroundColor: '#121212' }}
        >
            <Tab.Screen
                name="Feed"
                component={Feed}
                options={{
                    tabBarLabel: 'PlayList',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="playlist-play" size={26} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    tabBarLabel: 'Notícias',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="newspaper-o" size={26} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Apoie',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="attach-money" size={26} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default function App() {
    return (
        <AudioProvider>
            <NavigationContainer>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    backgraundColor="#121212"
                />
                <MyTabs />
            </NavigationContainer>
        </AudioProvider>
    );
};