import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
  RefreshControl,
  StatusBar,
} from 'react-native';
import PlayVideo from './PlayVideo';
// import {FontAwesome} from '@expo/vector-icons';
import {AuthContext} from '../context/AuthProvider';
// import {supabase} from '../../lib/supabase';
import VideoCard from '../components/VideoCard';
import {songList} from '../assets/Audio';

const HomeScreen = ({navigation}) => {
  const {session} = useContext(AuthContext);
  const [videoList, setVideoList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setVideoList(songList);
  }, []);

  // useEffect(() => {
  // getVideoList();
  // if (!session?.user?.user_metadata?.table_created) {
  //   addData();
  // }
  // }, []);

  // const getVideoList = async () => {
  //   let {data: Videos, error} = await supabase
  //     .from('Videos')
  //     .select('*')
  //     .range(videoList.length, videoList.length + 2);

  //   if (error) ToastAndroid.show(error?.message, ToastAndroid.SHORT);

  //   setVideoList(videoList => [...videoList, ...Videos]);
  // };

  // const addData = async () => {
  //   const {error} = await supabase.from('User').insert({
  //     name: session?.user?.user_metadata?.name,
  //     email: session?.user?.user_metadata?.email,
  //   });
  //   if (error) {
  //     const {data} = await supabase.auth.updateUser({
  //       data: {table_created: true},
  //     });
  //   }

  //   if (error) ToastAndroid.show(error?.message, ToastAndroid.SHORT);

  //   console.log('----->>>>>>>>error', error);
  // };
  // const onRefresh = React.useCallback(() => {
  // setRefreshing(true);
  // setVideoList([]);
  // getVideoList();
  // setRefreshing(false);
  // }, []);
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.header_container}>
        <View style={{alignItems: 'center', flexDirection: 'row', gap: 10}}>
          <Image
            source={require('../../assets/image01.png')}
            style={styles.logo}
          />

          <Text style={styles.header_txt}>ReoKids</Text>
        </View>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <FontAwesome name="search" size={24} color="white" />
        </TouchableOpacity> */}
      </View>
      <FlatList
        data={videoList}
        // onEndReached={getVideoList}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        renderItem={({item, index}) => (
          <VideoCard
            item={item}
            onSubmit={() => PlayVideo.play(item)}
            key={index}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'White',
  },
  header_container: {
    backgroundColor: 'black',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header_txt: {
    color: '#4E9CA8',
    fontSize: 22,
    fontWeight: 'bold',
  },

  logo: {
    height: 25,
    width: 25,
    borderWidth: 1,
    borderColor: '#4E9CA8',
    borderRadius: 99,
  },
});

export default HomeScreen;
