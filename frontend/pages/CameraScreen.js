import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useState } from "react";
import ImagePickerScreen from "../components/ImagePicker";
import LottieView from "lottie-react-native";

// Import an image for the background
const backgroundImage = require("../assets/pexels-albinberlin-919073.jpg");

export default function CameraScreen() {
  const [image, setImage] = useState(null);
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <LottieView
        source={require("../assets/camera.json")}
        style={styles.thumbView}
        autoPlay
        loop={true}
        speed={0.6}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Capture Your Bill</Text>
        <ImagePickerScreen image={image} setImage={setImage} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    //backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent overlay
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  thumbView: {
    height: 150,
    width: 150,
    alignSelf: "center",
    marginTop: 40,
    justifyContent: "center",
  },
});
