import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import ImagePickerScreen from "../components/ImagePicker";
import LottieView from "lottie-react-native";
import * as FileSystem from "expo-file-system";
import axios from "axios";

// Import an image for the background
const backgroundImage = require("../assets/pexels-albinberlin-919073.jpg");

export default function CameraScreen() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Add image to post method   ------------------------
  const submitImage = async () => {
    console.log("submitImage ----------------------  ");
    // if (!image) return;
    // setLoading(true);

    // const file = await FileSystem.readAsStringAsync(image, {
    //   encoding: FileSystem.EncodingType.Base64,
    // });

    // console.log("fileBuffer ------- ", file);
    // console.log("File created success --------------------- ");

    // const formData = new FormData();
    // formData.append("image", {
    //   uri: image,
    //   name: "photo.jpg",
    //   type: "image/jpeg",
    //   data: file,
    // });

    // const response = await axios.post(
    //   "http://127.0.0.1:8000/upload",
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }
    // );
    const response = await axios.get("http://192.168.1.15:8000/");
    console.log("response ---------------------- ");
    console.log(response);
    console.log(response.data);
    alert("Image uploaded successfully!");
  };
  console.log("image -------------- ", image);
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
      {image && (
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitImage}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textStyle}>Submit</Text>
          )}
        </TouchableOpacity>
      )}
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
    height: 50,
    width: 50,
    alignSelf: "center",
    marginTop: 40,
    justifyContent: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
});
