import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
  ImageBackground,
  StatusBar,
} from 'react-native';
// import {FontAwesome5} from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import {decode} from 'base64-arraybuffer';
import {AuthContext} from '../context/AuthProvider';
// import {supabase} from '../../lib/supabase';
// import {Feather} from '@expo/vector-icons';

const ProfileScreen = () => {
  const {session} = useContext(AuthContext);

  const [userData, setUserData] = useState();

  useEffect(() => {
    // getUserData();
  }, []);

  // const getUserData = async () => {
  //   let { data: User, error } = await supabase
  //     .from("User")
  //     .select("*")
  //     .eq("email", session?.user?.user_metadata?.email);

  //   setUserData(...User);
  //   if (error) ToastAndroid.show(error.message, ToastAndroid.SHORT);
  // };

  // const GetImage = async () => {
  //   let response = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     base64: true,
  //   });

  //   if (!response.canceled) {
  //     console.log('image url ', response);

  //     const {data, error} = await supabase.storage
  //       .from('test')
  //       .upload(
  //         `profileImage/${response.assets[0].fileName}`,
  //         decode(response.assets[0].base64),
  //         {
  //           contentType: response.assets[0].mimeType,
  //         },
  //       );
  //     if (error) ToastAndroid.show(error.message, ToastAndroid.SHORT);

  //     const {data: uploadData, error: uploadDError} = await supabase
  //       .from('User')
  //       .update({
  //         profileImage: `https://jyqnpymjcbsjnrnvpfdw.supabase.co/storage/v1/object/public/${data.fullPath}`,
  //       })
  //       .eq('email', session?.user?.user_metadata?.email);

  //     if (!uploadDError) {
  //       setUserData({
  //         ...userData,
  //         profileImage: `https://jyqnpymjcbsjnrnvpfdw.supabase.co/storage/v1/object/public/${data.fullPath}`,
  //       });
  //     }
  //     if (uploadDError)
  //       ToastAndroid.show(uploadDError.message, ToastAndroid.SHORT);
  //   }
  // };

  const signOut = async () => {
    // const {error} = await supabase.auth.signOut();
    // if (error) ToastAndroid.show(error.message, ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      {/* haeder */}
      <View style={styles.header_container}>
        <Image
          source={require('../../assets/image01.png')}
          style={styles.logo}
        />

        <Text style={styles.header_txt}>Profile</Text>
      </View>

      {/* body  */}

      {/* User image container */}
      <View
        style={{
          justifyContent: 'center',
          marginTop: 50,
          flexDirection: 'row',
          alignItems: 'flex-end',
          marginLeft: 15,
        }}>
        {/* {userData?.profileImage ? (

        ) : ( */}
        <View
          style={[
            styles.profilePhoto,
            {
              backgroundColor: 'lightgray',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          {userData?.profileImage ? (
            <Image
              source={{uri: userData?.profileImage}}
              style={styles.profilePhoto}
            />
          ) : (
            // <Feather name="user" size={30} color="black" />
            <></>
          )}
        </View>
        {/* )} */}
        {/* {!userData?.profileImage && (
          <TouchableOpacity style={styles.changePhotoButton} onPress={GetImage}>
            <FontAwesome5 name="edit" size={15} color="black" />
          </TouchableOpacity>
        )} */}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.user_txt}>{userData?.name}</Text>
        <Text style={styles.email_txt}>{userData?.email}</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
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
  header_txt: {
    color: '#4E9CA8',
    fontSize: 22,
    fontWeight: 'bold',
  },

  profilePhoto: {
    width: 70,
    height: 70,
    borderRadius: 99,
  },
  textContainer: {
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  user_txt: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email_txt: {
    fontSize: 14,
    color: 'gray',
  },
  changePhotoButton: {
    marginTop: 10,
  },

  button: {
    padding: 10,
    marginHorizontal: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 60,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
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

export default ProfileScreen;
