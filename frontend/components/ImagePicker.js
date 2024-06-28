import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Ionicons";

export default function ImagePickerScreen({ image, setImage }) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    console.log("result _ image URI : ", result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    setModalVisible(false);
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("result _ image uploading : ", result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Get an Image" onPress={() => setModalVisible(true)} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Choose an option</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={takePhoto}>
                <Icon name="camera" size={30} color="white" />
                <Text style={styles.textStyle}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Icon name="images" size={30} color="white" />
                <Text style={styles.textStyle}>Gallery</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f5f5f5", // Light gray background
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10, // Rounded corners for the image
    marginVertical: 20, // Vertical margin around the image
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
    alignItems: "center", // Center align icons and text
    backgroundColor: "#2196F3", // Blue background color
    flexDirection: "column", // Arrange icons and text in a column
  },
  buttonClose: {
    backgroundColor: "#ff5252", // Red background color for cancel button
    marginTop: 20, // Margin at the top of the cancel button
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5, // Margin at the top of the text to separate it from the icon
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18, // Larger font size for the modal text
    fontWeight: "bold", // Bold font weight for the modal text
  },
});
