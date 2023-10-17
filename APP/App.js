import { StyleSheet, Text, View, Button } from "react-native";
import { FIRESTORE_DB } from "./firebaseConfig.js";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Pedometer } from "expo-sensors";

export default function App() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const addSteps = async () => {
    const doc = addDoc(collection(FIRESTORE_DB, "StepCount"), {
      steps: {currentStepCount},
      date: Date.now.toString(),
      user: "user name",
    });
  };

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      return Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps);
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Button onPress={() => addSteps()} title="Add Steps" />
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <Text>Steps Registered</Text>
      <Text style={styles.value}>{currentStepCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
