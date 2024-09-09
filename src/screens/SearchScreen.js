import React, {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import PlayVideo from './PlayVideo';
// import {supabase} from '../../lib/supabase';
import VideoCard from '../components/VideoCard';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState([]);

  const handleSearch = async () => {
    // if (searchQuery) {
    //   const { data, error } = await supabase
    //     .from("Videos")
    //     .select()
    //     .textSearch("title", searchQuery)
    //     .range(filteredVideos.length, filteredVideos.length + 1);
    //   console.log(error);
    //   if (error) ToastAndroid.show(error.message, ToastAndroid.SHORT);
    //   setFilteredVideos((videoList) => [...videoList, ...data]);
    // } else {
    //   setFilteredVideos([]);
    // }
  };

  const renderItem = ({item}) => (
    <VideoCard item={item} onSubmit={() => PlayVideo.play(item)} />
  );

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredVideos([]);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.header_container}>
        {/* <Image
          source={require('../../assets/image01.png')}
          style={styles.logo}
        /> */}
        <Text style={styles.header_txt}>Search</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Search Video"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      {filteredVideos.length > 0 && (
        <TouchableOpacity
          onPress={clearSearch}
          style={{
            alignItems: 'flex-end',
            marginBottom: 16,
            marginHorizontal: 50,
            marginTop: 10,
          }}>
          <Text style={{color: 'blue', fontSize: 16}}>Clear Filter</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={filteredVideos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyList}>No videos found</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header_container: {
    backgroundColor: 'black',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'lightgray',
    marginHorizontal: 50,
    marginTop: 40,
  },
  videoItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
  emptyList: {
    alignSelf: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'black',
  },
  logo: {
    height: 25,
    width: 25,
    borderWidth: 1,
    borderColor: '#4E9CA8',
    borderRadius: 99,
  },
  header_txt: {
    color: '#4E9CA8',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default SearchScreen;
