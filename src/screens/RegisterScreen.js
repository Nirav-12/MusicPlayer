import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  View,
  ToastAndroid,
} from "react-native";
import { Image } from "react-native";
import { supabase } from "../../lib/supabase";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    if (name) {
      setLoading(true);
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name,
            table_created: false,
          },
        },
      });
      if (!session) {
      }
      {
        error && ToastAndroid.show(error?.message, ToastAndroid.SHORT);
      }

      setLoading(false);
    }
  }

  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <ImageBackground
        source={require("../../assets/baground.png")}
        style={styles.container}
        resizeMode="cover"
      >
        <Image
          source={require("../../assets/image01.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
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
          onPress={signUpWithEmail}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          disabled={loading}
        >
          <Text style={styles.loginText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#fff",
    marginTop: 60,
  },
  input: {
    width: "100%",
    padding: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "transparent",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#4E9CA8",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    color: "#4E9CA8",
    fontSize: 16,
  },
  logo: {
    overflow: "hidden",
    height: 70,
    width: 70,
    borderWidth: 1,
    borderColor: "#4E9CA8",
    borderRadius: 99,
    marginTop: 120,
  },
});
