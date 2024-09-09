import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  ToastAndroid,
} from 'react-native';
import {supabase} from '../../lib/supabase';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);

    const response = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    const {error} = response;

    if (error) ToastAndroid.show(error.message, ToastAndroid.SHORT);
    setLoading(false);
  }

  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <ImageBackground
        source={require('../../assets/baground.png')}
        style={styles.container}
        resizeMode="cover">
        {/* <Image
          source={require('../../assets/image01.png')}
          style={styles.logo}
        /> */}
        <Text style={styles.title}>Welcome to Music Player</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={signInWithEmail}
          disabled={loading}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          disabled={loading}>
          <Text style={styles.registerText}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#fff',
    marginTop: 100,
  },
  input: {
    width: '100%',
    padding: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4E9CA8',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#4E9CA8',
    fontSize: 16,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    overflow: 'hidden',
    height: 70,
    width: 70,
    borderWidth: 1,
    borderColor: '#4E9CA8',
    borderRadius: 99,
    marginTop: 120,
  },
});

export default LoginScreen;
