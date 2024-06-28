import { StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";

import HomePage from "./pages/HomePage";
import StackNavigater from "./StackNavigater";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StackNavigater />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
