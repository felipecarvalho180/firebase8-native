import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import firebase from "../firebaseConfig";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      alert("Bem vindo: " + response.user.email);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error);
    }
  }

  async function handleSignOut() {
    try {
      await firebase.auth().signOut();
      alert("Deslogado com sucesso");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={(value) => setEmail(value)}
        autoCapitalize="none"
      />

      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="password"
        secureTextEntry
        value={password}
        onChangeText={(value) => setPassword(value)}
      />

      <TouchableOpacity
        onPress={handleSignIn}
        style={[styles.button, { marginBottom: 10 }]}
      >
        <Text style={styles.buttonText}>Logar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 17,
    marginBottom: 10,
  },
  input: {
    marginBottom: 20,
    borderColor: "#777777",
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "#cc7700",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 17,
    color: "#fff",
  },
});
