import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
// import {Video} from 'expo-av';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {Directions} from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

// import * as ScreenOrientation from "expo-screen-orientation";

const {width, height} = Dimensions.get('window');
const miniMizedWidth = 120;
const miniMizedHieght = 70;

const VideoPlayer = ({props, closePlayer}) => {
  console.log('----props', props);

  const {description, thumbnail_url, title, audio_url} = props;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isMinimized = useSharedValue(false); // State for tracking minimized state
  const videoRef = useRef(null);
  const [mini, setMini] = useState(false);
  const [status, setStatus] = useState({});
  const [inFullscreen, setInFullsreen] = useState(false);
  const playbackstate = usePlaybackState();
  console.log('playbackstateplaybackstate1', playbackstate);

  const setUpPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add([
        {
          url: audio_url,
          title: 'Test',
          artist: 'description',
        },
      ]);
    } catch (error) {
      console.log('this is setup error', error);
    }
    await TrackPlayer.play();
    const state = await TrackPlayer.getState();
    console.log('The player is playing', state);

    console.log('playbackstateplaybackstate', playbackstate);
  };

  useEffect(() => {
    setUpPlayer();
  }, []);

  const togglePlayBack = async playbackState => {
    const currentTrack = await TrackPlayer.getActiveTrackIndex();
    console.log('currentTrack', currentTrack, currentTrack);

    if (currentTrack !== null) {
      if (playbackState === State.Paused) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const showVideoInFullscreen = async () => {
    await videoRef.current.presentFullscreenPlayer();
  };

  const flingUpGesture = Gesture.Fling()
    .direction(Directions.UP)
    .onEnd(() => {
      // console.log("Fling Up");
      if (!isMinimized.value) {
        runOnJS(showVideoInFullscreen)();
      }
    });

  const flingDownGesture = Gesture.Fling()
    .direction(Directions.DOWN)
    .onEnd(() => {
      // console.log("Fling Down");
      // Snap to the bottom-right corner
      if (!isMinimized.value) {
        isMinimized.value = true; // Set to true to trigger minimized state
        translateX.value = withTiming(0); // 200 is the width of the minimized container
        translateY.value = withTiming(height - 120); // 70 is the height of the minimized container + 50 is height of bottom tab
        runOnJS(setMini)(true);
      }
    });

  const toggleMinimize = async () => {
    // Toggle minimized state
    if (isMinimized.value) {
      isMinimized.value = false;
      setMini(false);

      // Reset to initial position and size when maximizing
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
      width: withTiming(isMinimized.value ? miniMizedWidth : width),
      height: withTiming(isMinimized.value ? miniMizedHieght : height),
      backgroundColor: 'black',
    };
  });

  const composedGesture = Gesture.Race(flingUpGesture, flingDownGesture);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" hidden={true} />

      <Animated.View style={[styles.videoContainer, animatedStyle]}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            ...StyleSheet.absoluteFill,
            flexDirection: mini ? 'row' : 'column',
          }}
          onPress={toggleMinimize}
          disabled={!mini}>
          <GestureDetector gesture={composedGesture}>
            <View
              style={[
                styles.video,
                {height: !mini ? height : miniMizedHieght},
              ]}>
              {!mini ? (
                <View
                  style={[
                    {
                      backgroundColor: 'white',
                      flex: 1,
                      alignItems: 'center',
                    },
                  ]}>
                  <Image
                    source={thumbnail_url}
                    style={{
                      height: 250,
                      aspectRatio: 1,
                      borderRadius: 10,
                      marginTop: 150,
                    }}
                  />
                  <View
                    style={{
                      padding: 20,
                      alignItems: 'center',
                    }}>
                    <Text style={[styles.title, {fontSize: 25}]}>{title}</Text>
                    <Text style={[styles.description, {fontSize: 18}]}>
                      {description}
                    </Text>
                  </View>

                  <Slider
                    style={{height: 40, width: 350}}
                    value={10}
                    minimumValue={0}
                    maximumValue={100}
                    thumbTintColor="#FFD369"
                    minimumTrackTintColor="#FFD369"
                    maximumTrackTintColor="FFF"
                    onSlidingComplete={() => {}}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: 320,
                    }}>
                    <Text>0:00</Text>
                    <Text>3:00</Text>
                  </View>

                  <View>
                    <TouchableOpacity
                      style={styles.miniScreen_btn}
                      onPress={() => togglePlayBack(playbackstate)}>
                      <Feather
                        name={playbackstate == State.Playing ? 'pause' : 'play'}
                        size={30}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
            </View>
          </GestureDetector>
          {mini ? (
            <View style={styles.mini_txt_container}>
              <TouchableOpacity
                style={styles.mini_txt_btn}
                onPress={toggleMinimize} // Corrected onPress handler
              >
                <Text style={styles.title} numberOfLines={1}>
                  {title}
                </Text>
                <Text style={styles.description} numberOfLines={2}>
                  {description}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.miniScreen_btn}
                onPress={
                  () => {}
                  // status.isPlaying
                  //   ? videoRef.current.pauseAsync()
                  //   : videoRef.current.playAsync()
                }>
                <Feather
                  name={status.isPlaying ? 'pause' : 'play'}
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.miniScreen_btn}
                onPress={closePlayer}>
                <Ionicons name="close-circle" size={30} color="black" />
              </TouchableOpacity>
            </View>
          ) : null}
        </TouchableOpacity>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
  },
  video: {
    width: '100%',
    zIndex: 2,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 11,
    color: 'gray',
  },
  miniScreen_btn: {
    justifyContent: 'center',
    padding: 15,
  },
  mini_txt_btn: {
    backgroundColor: 'white',
    flex: 1,
    padding: 5,
    gap: 3,
  },
  mini_txt_container: {
    width: width - miniMizedWidth,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});

export default VideoPlayer;
