import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import firebase from "../firebaseConfig";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSignUp() {
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const { uid } = response.user;

      await firebase.database().ref("users").child(uid).set({
        uid,
        name,
        email,
      });

      setName("");
      setEmail("");
      setPassword("");
      alert("Usuário criado com sucesso");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="name"
        value={name}
        onChangeText={(value) => setName(value)}
        autoCapitalize="none"
      />

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

      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
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
