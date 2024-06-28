// components/HomePage.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to BillsApp</Text>
      <Text style={styles.subText}>
        Your Predict sparepart lifetime from bill
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Capture")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  subText: {
    fontSize: 16,
    color: "#666",
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
