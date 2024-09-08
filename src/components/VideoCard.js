import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';

const VideoCard = ({item, onSubmit}) => {
  return (
    <TouchableOpacity onPress={onSubmit} style={{paddingHorizontal: 15}}>
      <View style={styles.videoItem}>
        <Image source={item.thumbnail_url} style={styles.thumbnail} />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          {item.description && (
            <Text style={styles.description}>{item.description}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  videoItem: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    padding: 10,
  },
  thumbnail: {
    width: '100%',
    height: 220,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
});
