import React from "react";
import {
  View,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";

export default function () {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("../../assets/baground.png")}
        style={styles.container}
        resizeMode="cover"
      >
        <Image
          source={require("../../assets/image01.png")}
          style={styles.logo}
        />
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
    justifyContent: "center",
  },
  logo: {
    overflow: "hidden",
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: "#4E9CA8",
    borderRadius: 99,
  },
});
