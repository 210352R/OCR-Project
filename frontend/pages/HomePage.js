// components/HomePage.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Import an image for the background
const backgroundImage = require("../assets/redcar.jpg");

const HomePage = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to BillsApp</Text>
        <Text style={styles.subText}>
          Your Predict sparepart lifetime from bill
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Camera")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 28,

    fontWeight: "900",
    color: "white",
    marginBottom: 20,
  },
  subText: {
    fontSize: 16,
    color: "#F5F5F5",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default HomePage;
